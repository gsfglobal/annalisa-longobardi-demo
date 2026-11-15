/**
 * build-studio.mjs — Ricostruzione procedurale (photo-referenced) degli ambienti dello studio.
 * Genera GLB reali in public/models/studio/: reception.glb, treatment.glb, consultation.glb
 * Riferimenti: docs/STUDIO_3D_REFERENCE.md. Misure STIMATE dalle fotografie, non rilevate.
 * Esecuzione: node scripts/build-studio.mjs
 */
import fs from "node:fs";
import path from "node:path";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import opentype from "opentype.js";
import { Document, NodeIO } from "@gltf-transform/core";
import {
  ALL_EXTENSIONS,
  KHRMaterialsClearcoat,
  KHRMaterialsEmissiveStrength,
  KHRMaterialsIOR,
  KHRMaterialsSheen,
  KHRMaterialsTransmission,
} from "@gltf-transform/extensions";
import { dedup, prune, weld } from "@gltf-transform/functions";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = process.env.STUDIO_OUT ? path.resolve(process.env.STUDIO_OUT) : path.join(ROOT, "public/models/studio");
fs.mkdirSync(OUT, { recursive: true });
const TEX = path.join(ROOT, "scripts/tex");
const FONTS = {
  sans: "/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf",
  serif: "/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyrepagella-regular.otf",
  script: "/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyrechorus-mediumitalic.otf",
};

/* ───────────── geometry helpers ───────────── */

function xf(g, { p = [0, 0, 0], r = [0, 0, 0], s = [1, 1, 1] } = {}) {
  g = g.index ? g.toNonIndexed() : g;
  g.scale(...s);
  g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(r[0], r[1], r[2], "XYZ")));
  g.translate(...p);
  if (!g.attributes.uv) {
    const n = g.attributes.position.count;
    g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  }
  g.deleteAttribute("uv1");
  g.deleteAttribute("uv2");
  return g;
}
const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const rbox = (w, h, d, r = 0.03, seg = 4) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 1e-3, h / 2 - 1e-3, d / 2 - 1e-3));
const cyl = (rt, rb, h, seg = 32, open = false, ts = 0, tl = Math.PI * 2) => new THREE.CylinderGeometry(rt, rb, h, seg, 1, open, ts, tl);
const torus = (R, r, arc = Math.PI * 2, rs = 10, ts = 64) => new THREE.TorusGeometry(R, r, rs, ts, arc);
const tube = (pts, r, seg = 48) => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))), seg, r, 10, false);
const plane = (w, h, uvScale = 1) => {
  const g = new THREE.PlaneGeometry(w, h);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * uvScale * (w / Math.max(w, h)), uv.getY(i) * uvScale * (h / Math.max(w, h)));
  return g;
};
/** Upholstered shell from a revolution profile, open toward +z (gap in rad). */
const shellLathe = (profile, gap, seg = 56) => new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), seg, gap / 2, Math.PI * 2 - gap);
/** Rounded edge along the top of the shell (same angles as the lathe). */
const shellRim = (r, y, gap, rr = 0.028) => {
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const phi = gap / 2 + ((Math.PI * 2 - gap) * i) / 40;
    pts.push([Math.sin(phi) * r, y, Math.cos(phi) * r]);
  }
  return tube(pts, rr, 80);
};
/** Ellipse extruded (desk top) */
const ellipseSlab = (w, d, t) => {
  const s = new THREE.Shape();
  s.absellipse(0, 0, w / 2, d / 2, 0, Math.PI * 2, false, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 2, curveSegments: 64 });
  g.rotateX(-Math.PI / 2);
  // planar UVs from x/z
  const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / w + 0.5, p.getZ(i) / d + 0.5);
  return g;
};
/** Arched panel (rectangle + semicircle) — studio niche */
const archPanel = (w, h, t) => {
  const s = new THREE.Shape();
  const r = w / 2;
  s.moveTo(-r, 0);
  s.lineTo(r, 0);
  s.lineTo(r, h - r);
  s.absarc(0, h - r, r, 0, Math.PI, false);
  s.lineTo(-r, 0);
  return new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 48 });
};

/* ───────────── text (neon) from real fonts ───────────── */
const fontCache = {};
function textGeom(fontKey, text, size, depth = 0.012, align = "center") {
  const font = (fontCache[fontKey] ??= opentype.parse(fs.readFileSync(FONTS[fontKey]).buffer));
  // glyph by glyph (avoids unsupported GSUB lookups in some fonts)
  const cmds = [];
  let x = 0;
  const scale = size / font.unitsPerEm;
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  glyphs.forEach((gl, i) => {
    cmds.push(...gl.getPath(x, 0, size).commands);
    x += gl.advanceWidth * scale;
    if (i < glyphs.length - 1) x += font.getKerningValue(gl, glyphs[i + 1]) * scale;
  });
  const sp = new THREE.ShapePath();
  for (const c of cmds) {
    if (c.type === "M") sp.moveTo(c.x, -c.y);
    else if (c.type === "L") sp.lineTo(c.x, -c.y);
    else if (c.type === "Q") sp.quadraticCurveTo(c.x1, -c.y1, c.x, -c.y);
    else if (c.type === "C") sp.bezierCurveTo(c.x1, -c.y1, c.x2, -c.y2, c.x, -c.y);
  }
  const shapes = sp.toShapes(fontKey === "sans");
  const g = new THREE.ExtrudeGeometry(shapes, { depth, bevelEnabled: false, curveSegments: 5 });
  g.computeBoundingBox();
  const bb = g.boundingBox;
  const dx = align === "center" ? -(bb.max.x + bb.min.x) / 2 : -bb.min.x;
  g.translate(dx, -(bb.max.y + bb.min.y) / 2, 0);
  return g;
}

/* ───────────── part = { material: [geometries] } ───────────── */
class Part {
  constructor() {
    this.m = new Map();
  }
  put(mat, g, t) {
    if (!this.m.has(mat)) this.m.set(mat, []);
    this.m.get(mat).push(xf(g, t));
    return this;
  }
  merge(other, t = {}) {
    const M = new THREE.Matrix4().compose(
      new THREE.Vector3(...(t.p ?? [0, 0, 0])),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...(t.r ?? [0, 0, 0]))),
      new THREE.Vector3(1, 1, 1)
    );
    for (const [mat, gs] of other.m) for (const g of gs) this.put(mat, g.clone().applyMatrix4(M));
    return this;
  }
}

/* ───────────── glTF document wrapper ───────────── */
class Room {
  constructor(name) {
    this.name = name;
    this.doc = new Document();
    this.buf = this.doc.createBuffer();
    this.scene = this.doc.createScene(name);
    this.ext = {
      em: this.doc.createExtension(KHRMaterialsEmissiveStrength),
      tr: this.doc.createExtension(KHRMaterialsTransmission),
      cc: this.doc.createExtension(KHRMaterialsClearcoat),
      sh: this.doc.createExtension(KHRMaterialsSheen),
      ior: this.doc.createExtension(KHRMaterialsIOR),
    };
    this.mats = {};
    this.texs = {};
  }
  tex(file) {
    return (this.texs[file] ??= this.doc.createTexture(file).setImage(new Uint8Array(fs.readFileSync(path.join(TEX, file)))).setMimeType("image/jpeg"));
  }
  defineMaterials(defs) {
    for (const [name, o] of Object.entries(defs)) {
      const c = new THREE.Color(o.color ?? "#ffffff");
      const m = this.doc
        .createMaterial(name)
        .setBaseColorFactor([c.r, c.g, c.b, o.opacity ?? 1])
        .setMetallicFactor(o.metal ?? 0)
        .setRoughnessFactor(o.rough ?? 0.5)
        .setDoubleSided(!!o.double);
      if (o.opacity !== undefined && o.opacity < 1) m.setAlphaMode("BLEND");
      if (o.map) m.setBaseColorTexture(this.tex(o.map));
      if (o.emissive) {
        const e = new THREE.Color(o.emissive);
        m.setEmissiveFactor([e.r, e.g, e.b]);
        if (o.strength) m.setExtension("KHR_materials_emissive_strength", this.ext.em.createEmissiveStrength().setEmissiveStrength(o.strength));
      }
      if (o.transmission) m.setExtension("KHR_materials_transmission", this.ext.tr.createTransmission().setTransmissionFactor(o.transmission));
      if (o.ior) m.setExtension("KHR_materials_ior", this.ext.ior.createIOR().setIOR(o.ior));
      if (o.clearcoat) m.setExtension("KHR_materials_clearcoat", this.ext.cc.createClearcoat().setClearcoatFactor(o.clearcoat).setClearcoatRoughnessFactor(o.ccRough ?? 0.05));
      if (o.sheen) {
        const sc = new THREE.Color(o.sheenColor ?? o.color);
        m.setExtension("KHR_materials_sheen", this.ext.sh.createSheen().setSheenColorFactor([sc.r, sc.g, sc.b]).setSheenRoughnessFactor(o.sheenRough ?? 0.6));
      }
      this.mats[name] = m;
    }
  }
  mesh(name, mat, geoms) {
    const g = mergeGeometries(geoms.map((x) => (x.index ? x.toNonIndexed() : x)), false);
    if (!g.attributes.normal) g.computeVertexNormals();
    const acc = (arr, type) => this.doc.createAccessor().setArray(arr).setType(type).setBuffer(this.buf);
    const prim = this.doc
      .createPrimitive()
      .setAttribute("POSITION", acc(new Float32Array(g.attributes.position.array), "VEC3"))
      .setAttribute("NORMAL", acc(new Float32Array(g.attributes.normal.array), "VEC3"))
      .setAttribute("TEXCOORD_0", acc(new Float32Array(g.attributes.uv.array), "VEC2"))
      .setMaterial(this.mats[mat]);
    if (!this.mats[mat]) throw new Error("material missing: " + mat);
    return this.doc.createMesh(name).addPrimitive(prim);
  }
  /** Place a part as a node (children per material) */
  place(name, part, { p = [0, 0, 0], ry = 0 } = {}) {
    const node = this.doc.createNode(name).setTranslation(p);
    const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ry);
    node.setRotation([q.x, q.y, q.z, q.w]);
    for (const [mat, gs] of part.m) node.addChild(this.doc.createNode(`${name}_${mat}`).setMesh(this.mesh(`${name}_${mat}`, mat, gs)));
    this.scene.addChild(node);
    return node;
  }
  async write(file) {
    this.doc.getRoot().getAsset().generator = "Dental Go · build-studio.mjs (procedural, photo-referenced)";
    this.doc.getRoot().setExtras({ room: this.name, note: "Ricostruzione digitale dimostrativa basata su fotografie. Misure stimate." });
    await this.doc.transform(dedup(), weld(), prune());
    const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
    await io.write(path.join(OUT, file), this.doc);
    const st = fs.statSync(path.join(OUT, file));
    console.log(`✓ ${file}  ${(st.size / 1024).toFixed(0)} KB`);
  }
}

/* ───────────── shared materials (from photo samples, see reference doc) ───────────── */
const MATS = {
  marble: { color: "#ffffff", map: "marble.jpg", rough: 0.12, clearcoat: 1, ccRough: 0.04 },
  wall: { color: "#F2EEEA", rough: 0.85 },
  ceiling: { color: "#F7F5F2", rough: 0.9 },
  skirting: { color: "#4A3426", metal: 0.6, rough: 0.35 },
  bronze: { color: "#6B4A33", metal: 0.85, rough: 0.28 },
  velvet: { color: "#D9B3AA", double: true, rough: 0.9, sheen: 1, sheenColor: "#F6DCD6", sheenRough: 0.45 },
  smoke: { color: "#4E4039", rough: 0.06, metal: 0.7, clearcoat: 1, ccRough: 0.03, double: true },
  bronzeGlass: { color: "#8C6E55", rough: 0.07, metal: 0.65, clearcoat: 1, ccRough: 0.03 },
  clearGlass: { color: "#F4F7F8", rough: 0.03, transmission: 0.95, ior: 1.5, opacity: 0.25 },
  daylight: { color: "#E9EEF1", emissive: "#E9EEF1", strength: 1.4, rough: 1 },
  mirror: { color: "#2A2421", metal: 1, rough: 0.04 },
  copper: { color: "#A86C47", metal: 1, rough: 0.08 },
  gold: { color: "#C9A45C", metal: 1, rough: 0.22 },
  cream: { color: "#EADCC6", rough: 0.45, clearcoat: 0.4, ccRough: 0.3 },
  white: { color: "#F3F2EF", rough: 0.35, clearcoat: 0.6, ccRough: 0.15 },
  darkMetal: { color: "#2B2522", metal: 0.8, rough: 0.35 },
  black: { color: "#0E0D0D", rough: 0.25, metal: 0.1 },
  screen: { color: "#0B0C10", emissive: "#2B3446", strength: 1.2, rough: 0.15 },
  neonWhite: { color: "#FFFFFF", emissive: "#FFFFFF", strength: 6, rough: 0.4 },
  neonLilac: { color: "#E9DDF7", emissive: "#E2D2F5", strength: 5, rough: 0.4 },
  neonPink: { color: "#F2A3C6", emissive: "#EC6FA6", strength: 5, rough: 0.4 },
  neonWarm: { color: "#FFF4DA", emissive: "#FFE9B8", strength: 5, rough: 0.4 },
  lightPanel: { color: "#FFFFFF", emissive: "#FFF8EE", strength: 3, rough: 0.6 },
  cove: { color: "#FFFFFF", emissive: "#FFF2DE", strength: 2.4, rough: 0.6 },
  plumSeat: { color: "#8E3B7C", rough: 0.32, clearcoat: 0.5, ccRough: 0.25 },
  greyFabric: { color: "#9A938B", rough: 0.95, sheen: 0.6, sheenColor: "#C8C2BA" },
  greyDark: { color: "#6E6B69", rough: 0.5 },
  onyx: { color: "#ffffff", map: "onyx.jpg", rough: 0.1, clearcoat: 1, ccRough: 0.04 },
  pouBlue: { color: "#9FB3C2", rough: 0.9, sheen: 0.6 },
  pouYellow: { color: "#E3B53A", rough: 0.9, sheen: 0.6 },
  pouGreen: { color: "#9FB27A", rough: 0.9, sheen: 0.6 },
  leather: { color: "#B5652E", rough: 0.55 },
  redSeat: { color: "#8E2A2E", rough: 0.6 },
  plant: { color: "#5D7E3E", rough: 0.8 },
  tulipRed: { color: "#C9324A", rough: 0.6 },
  tulipWhite: { color: "#F4EEE8", rough: 0.6 },
  wineGlass: { color: "#1A1414", rough: 0.05, metal: 0.3, emissive: "#3A1A1A", strength: 0.6 },
};

/* ───────────── furniture ───────────── */
function tubChair() {
  // pink velvet tub chair: bowl-shaped shell open at the front (MAT02847, left-hand row)
  const gap = 2.2;
  const p = new Part()
    .put("velvet", new THREE.CylinderGeometry(0.29, 0.27, 0.13, 48), { p: [0, 0.44, 0.02] })
    .put("velvet", shellLathe([[0.22, 0.4], [0.3, 0.44], [0.34, 0.56], [0.345, 0.7], [0.335, 0.78]], gap), {})
    .put("velvet", shellLathe([[0.3, 0.5], [0.31, 0.62], [0.305, 0.76]], gap), {})
    .put("velvet", shellRim(0.32, 0.78, gap, 0.03), {});
  for (const [x, z] of [[-0.2, 0.18], [0.2, 0.18], [-0.2, -0.2], [0.2, -0.2]])
    p.put("darkMetal", cyl(0.012, 0.009, 0.4, 8), { p: [x * 1.05, 0.19, z * 1.05], r: [z * 0.25, 0, -x * 0.25] });
  return p;
}
function loungeChair() {
  // swivel armchair with an enveloping shell (MAT02847, centre): taller, flared back, 4-spoke base
  const gap = 1.7;
  const p = new Part()
    .put("velvet", new THREE.CylinderGeometry(0.31, 0.29, 0.15, 48), { p: [0, 0.43, 0.03] })
    .put("velvet", shellLathe([[0.24, 0.38], [0.36, 0.42], [0.42, 0.55], [0.44, 0.75], [0.43, 0.92], [0.39, 1.0]], gap), {})
    .put("velvet", shellLathe([[0.33, 0.5], [0.37, 0.7], [0.36, 0.9]], gap), {})
    .put("velvet", shellRim(0.41, 0.98, gap, 0.035), {})
    .put("velvet", rbox(0.46, 0.34, 0.12, 0.05), { p: [0, 0.68, -0.26], r: [-0.15, 0, 0] })
    .put("darkMetal", cyl(0.03, 0.03, 0.26, 12), { p: [0, 0.22, 0] });
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + Math.PI / 4;
    p.put("darkMetal", box(0.36, 0.025, 0.04), { p: [Math.cos(a) * 0.17, 0.04, Math.sin(a) * 0.17], r: [0, -a, 0] });
  }
  return p;
}
function coffeeTable(r, h) {
  const p = new Part()
    .put("mirror", cyl(r, r, 0.012, 64), { p: [0, h, 0] })
    .put("bronze", torus(r, 0.018, Math.PI * 2, 10, 64), { p: [0, h - 0.01, 0], r: [Math.PI / 2, 0, 0] })
    .put("bronze", cyl(r + 0.01, r + 0.01, 0.05, 64, true), { p: [0, h - 0.025, 0] });
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    p.put("bronze", cyl(0.01, 0.008, h, 8), { p: [Math.cos(a) * r * 0.75, h / 2, Math.sin(a) * r * 0.75], r: [Math.sin(a) * 0.12, 0, -Math.cos(a) * 0.12] });
  }
  return p;
}
function pouf(mat) {
  return new Part().put(mat, cyl(0.21, 0.21, 0.4, 40), { p: [0, 0.2, 0] }).put("leather", cyl(0.212, 0.212, 0.05, 40, true), { p: [0, 0.22, 0] });
}
function frenchWindow(w, h) {
  const p = new Part();
  const t = 0.06;
  // frame
  p.put("white", box(w, t, 0.08), { p: [0, h - t / 2, 0] })
    .put("white", box(t, h, 0.08), { p: [-w / 2 + t / 2, h / 2, 0] })
    .put("white", box(t, h, 0.08), { p: [w / 2 - t / 2, h / 2, 0] })
    .put("white", box(t * 0.8, h, 0.08), { p: [0, h / 2, 0] })
    .put("white", box(w, 0.04, 0.1), { p: [0, 0.02, 0] });
  // glass + outside light
  p.put("clearGlass", box(w - t * 2, h - t * 1.6, 0.012), { p: [0, h / 2, 0] });
  p.put("daylight", plane(w - 0.05, h - 0.05), { p: [0, h / 2, -0.35] });
  // balcony railing (outside)
  for (let i = 0; i < 9; i++) p.put("darkMetal", cyl(0.008, 0.008, 0.95, 6), { p: [-w / 2 + 0.1 + (i * (w - 0.2)) / 8, 0.5, -0.2] });
  p.put("darkMetal", box(w, 0.03, 0.03), { p: [0, 1.0, -0.2] });
  return p;
}
function roomShell(w, d, h, opts = {}) {
  // floor, walls, ceiling, skirting. The front wall is drawn only if requested.
  const p = new Part();
  const floor = plane(w, d, Math.max(w, d) / 2.4);
  p.put("marble", floor, { r: [-Math.PI / 2, 0, 0] });
  p.put("wall", plane(w, h), { p: [0, h / 2, -d / 2] });
  p.put("wall", plane(d, h), { p: [-w / 2, h / 2, 0], r: [0, Math.PI / 2, 0] });
  p.put("wall", plane(d, h), { p: [w / 2, h / 2, 0], r: [0, -Math.PI / 2, 0] });
  if (opts.front !== false) p.put("wall", plane(w, h), { p: [0, h / 2, d / 2], r: [0, Math.PI, 0] });
  p.put("ceiling", plane(w, d), { p: [0, h, 0], r: [Math.PI / 2, 0, 0] });
  for (const [x, z, ry, len] of [[0, -d / 2 + 0.006, 0, w], [-w / 2 + 0.006, 0, Math.PI / 2, d], [w / 2 - 0.006, 0, -Math.PI / 2, d], [0, d / 2 - 0.006, Math.PI, w]])
    p.put("skirting", box(len, 0.08, 0.012), { p: [x, 0.04, z], r: [0, ry, 0] });
  return p;
}
function coveCeiling(w, d, h, inset = 0.55, drop = 0.18) {
  // perimeter drop ceiling + central recess with indirect light
  const p = new Part();
  const y = h - drop / 2;
  p.put("ceiling", box(w, drop, inset), { p: [0, y, -d / 2 + inset / 2] })
    .put("ceiling", box(w, drop, inset), { p: [0, y, d / 2 - inset / 2] })
    .put("ceiling", box(inset, drop, d - inset * 2), { p: [-w / 2 + inset / 2, y, 0] })
    .put("ceiling", box(inset, drop, d - inset * 2), { p: [w / 2 - inset / 2, y, 0] });
  const iw = w - inset * 2, id = d - inset * 2, cy = h - drop + 0.01;
  p.put("cove", box(iw, 0.02, 0.04), { p: [0, cy, -id / 2 + 0.03] })
    .put("cove", box(iw, 0.02, 0.04), { p: [0, cy, id / 2 - 0.03] })
    .put("cove", box(0.04, 0.02, id), { p: [-iw / 2 + 0.03, cy, 0] })
    .put("cove", box(0.04, 0.02, id), { p: [iw / 2 - 0.03, cy, 0] });
  return p;
}

/* ═════════════ ROOM A — RECEPTION & WAITING LOUNGE (MAT02847, MAT02867) ═════════════ */
async function buildReception() {
  const R = new Room("reception");
  R.defineMaterials(MATS);
  const W = 6.0, Dp = 4.6, H = 2.9;
  R.place("shell", roomShell(W, Dp, H));
  R.place("ceiling_cove", coveCeiling(W, Dp, H, 0.6, 0.2));

  // two interlaced LED rings (pendant)
  const rings = new Part()
    .put("neonWhite", torus(0.42, 0.016, Math.PI * 2, 8, 96), { p: [0, 0, 0], r: [Math.PI / 2 - 0.1, 0, 0.08] })
    .put("neonWhite", torus(0.34, 0.016, Math.PI * 2, 8, 96), { p: [0.28, 0.03, 0.05], r: [Math.PI / 2 + 0.08, 0.2, -0.06] })
    .put("darkMetal", cyl(0.003, 0.003, 0.1, 4), { p: [0, 0.06, 0] })
    .put("darkMetal", cyl(0.003, 0.003, 0.1, 4), { p: [0.34, 0.06, 0.05] });
  R.place("pendant_rings", rings, { p: [-0.2, 2.6, -0.3] });

  // neon wall (back): "Seguimi per un sorriso" + "PAZZESCO"
  const neon = new Part()
    .put("neonLilac", textGeom("script", "Seguimi per un sorriso", 0.16, 0.01), { p: [0, 0.2, 0] })
    .put("neonLilac", textGeom("sans", "PAZZESCO", 0.3, 0.014), { p: [0, -0.06, 0] })
    .put("neonWarm", torus(0.075, 0.009, Math.PI * 2, 6, 40), { p: [0.92, -0.06, 0.005] })
    .put("neonWhite", tube([[-0.85, -0.24, 0], [-0.2, -0.3, 0], [0.4, -0.25, 0], [0.82, -0.18, 0]], 0.005), {});
  R.place("neon_pazzesco", neon, { p: [-1.0, 1.85, -Dp / 2 + 0.03] });

  // back-right: beige door panel with backlit sign
  const door = new Part()
    .put("cream", box(1.0, 2.35, 0.04), { p: [0, 1.175, 0] })
    .put("darkMetal", box(0.01, 1.3, 0.005), { p: [-0.25, 1.2, 0.022] })
    .put("neonWarm", textGeom("script", "Pazzesco", 0.15, 0.008), { p: [0.05, 1.1, 0.025] })
    .put("neonWarm", textGeom("script", "Seguimi per un sorriso", 0.055, 0.005), { p: [0.05, 1.27, 0.025] });
  R.place("door_sign", door, { p: [1.05, 0, -Dp / 2 + 0.02] });

  // curved smoked-glass partition (corner toward the corridor)
  const curve = new Part()
    .put("smoke", cyl(0.75, 0.75, 2.55, 48, true, 0, Math.PI / 2), { p: [0, 1.32, 0] })
    .put("bronze", cyl(0.76, 0.76, 0.08, 48, true, 0, Math.PI / 2), { p: [0, 0.04, 0] })
    .put("bronze", cyl(0.76, 0.76, 0.04, 48, true, 0, Math.PI / 2), { p: [0, 2.62, 0] });
  R.place("glass_curve", curve, { p: [W / 2 - 0.85, 0, -Dp / 2 + 0.05], ry: Math.PI / 2 });

  // waiting chairs: row of 5 along the left wall + 2 swivel chairs
  for (let i = 0; i < 5; i++) R.place(`tub_chair_${i}`, tubChair(), { p: [-W / 2 + 0.45, 0, -1.55 + i * 0.78], ry: Math.PI / 2 });
  R.place("lounge_chair_a", loungeChair(), { p: [-0.55, 0, -Dp / 2 + 0.75], ry: 0.12 });
  R.place("lounge_chair_b", loungeChair(), { p: [0.35, 0, -Dp / 2 + 0.75], ry: -0.12 });

  // coffee tables
  R.place("coffee_table_a", coffeeTable(0.36, 0.46), { p: [-0.1, 0, -0.55] });
  R.place("coffee_table_b", coffeeTable(0.33, 0.4), { p: [-0.75, 0, -0.2] });

  // right wall: two French windows + cylindrical reception desk
  R.place("window_a", frenchWindow(1.05, 2.35), { p: [W / 2 - 0.01, 0, -0.55], ry: -Math.PI / 2 });
  R.place("window_b", frenchWindow(1.05, 2.35), { p: [W / 2 - 0.01, 0, 1.15], ry: -Math.PI / 2 });
  const desk = new Part()
    .put("cream", cyl(0.42, 0.42, 1.12, 48), { p: [0, 0.6, 0] })
    .put("bronze", cyl(0.425, 0.425, 0.07, 48), { p: [0, 0.035, 0] })
    .put("black", box(0.5, 0.32, 0.03), { p: [0, 1.5, -0.1], r: [0, 0, 0] })
    .put("screen", plane(0.46, 0.28), { p: [0, 1.5, -0.084] })
    .put("darkMetal", cyl(0.012, 0.012, 0.32, 8), { p: [0, 1.27, -0.12] });
  R.place("reception_desk", desk, { p: [W / 2 - 0.75, 0, 0.35], ry: -Math.PI / 2 });
  const stool = new Part()
    .put("gold", cyl(0.02, 0.02, 0.62, 12), { p: [0, 0.33, 0] })
    .put("gold", cyl(0.2, 0.22, 0.02, 32), { p: [0, 0.01, 0] })
    .put("redSeat", cyl(0.17, 0.15, 0.08, 32), { p: [0, 0.68, 0] });
  R.place("stool", stool, { p: [W / 2 - 0.35, 0, 1.9] });

  // front wall (behind the camera): TV unit + colourful poufs (MAT02867)
  const tv = new Part()
    .put("cream", box(1.25, 2.1, 0.06), { p: [0, 1.25, 0] })
    .put("black", box(1.05, 0.62, 0.03), { p: [0, 1.62, 0.045] })
    .put("screen", plane(1.0, 0.58), { p: [0, 1.62, 0.062] })
    .put("darkMetal", box(1.45, 0.035, 0.32), { p: [0, 0.82, 0.16] })
    .put("smoke", box(1.9, 2.5, 0.02), { p: [0, 1.3, -0.1] });
  R.place("tv_unit", tv, { p: [-0.6, 0, Dp / 2 - 0.15], ry: Math.PI });
  R.place("pouf_blue", pouf("pouBlue"), { p: [-1.05, 0, Dp / 2 - 0.65] });
  R.place("pouf_yellow", pouf("pouYellow"), { p: [-0.58, 0, Dp / 2 - 0.72] });
  R.place("pouf_green", pouf("pouGreen"), { p: [-0.12, 0, Dp / 2 - 0.65] });

  await R.write("reception.glb");
}

/* ═════════════ ROOM B — OPERATORY, PLUM CHAIR (MAT03026, MAT03011) ═════════════ */
function dentalChair() {
  const p = new Part();
  // white base and column
  p.put("white", rbox(0.5, 0.18, 0.95, 0.06), { p: [0, 0.09, 0.05] })
    .put("white", rbox(0.3, 0.32, 0.36, 0.05), { p: [0, 0.34, -0.05] })
    .put("white", rbox(0.62, 0.07, 1.1, 0.03), { p: [0, 0.52, 0.1] });
  // plum upholstery: seat, backrest, headrest, leg rest
  p.put("plumSeat", rbox(0.56, 0.12, 0.55, 0.05), { p: [0, 0.62, 0.05] })
    .put("plumSeat", rbox(0.54, 0.11, 0.72, 0.05), { p: [0, 0.86, -0.43], r: [-1.02, 0, 0] })
    .put("plumSeat", rbox(0.3, 0.09, 0.24, 0.04), { p: [0, 1.18, -0.73], r: [-1.25, 0, 0] })
    .put("plumSeat", rbox(0.5, 0.1, 0.7, 0.05), { p: [0, 0.5, 0.62], r: [0.38, 0, 0] });
  // white armrests
  p.put("white", rbox(0.06, 0.05, 0.42, 0.02), { p: [0.33, 0.78, -0.05] }).put("white", cyl(0.02, 0.02, 0.18, 10), { p: [0.33, 0.68, 0.1] });
  return p;
}
function dentalUnit() {
  const p = new Part();
  // assistant-side post + arm to the operating light
  p.put("white", cyl(0.06, 0.07, 1.95, 24), { p: [0, 0.98, 0] })
    .put("white", tube([[0, 1.95, 0], [0, 2.05, 0.2], [-0.25, 2.05, 0.55], [-0.6, 1.95, 0.7]], 0.032), {})
    .put("white", rbox(0.36, 0.11, 0.18, 0.05), { p: [-0.62, 1.86, 0.72], r: [0.4, 0.4, 0] })
    .put("black", cyl(0.035, 0.035, 0.02, 20), { p: [-0.7, 1.81, 0.74] })
    .put("black", cyl(0.035, 0.035, 0.02, 20), { p: [-0.55, 1.81, 0.7] })
    .put("neonWhite", cyl(0.025, 0.025, 0.005, 20), { p: [-0.62, 1.8, 0.72] });
  // doctor's element: arm + instrument tray + whips
  p.put("white", cyl(0.03, 0.03, 0.7, 12), { p: [0.05, 1.0, 0.35], r: [Math.PI / 2, 0, 0] })
    .put("white", rbox(0.6, 0.06, 0.28, 0.02), { p: [0.05, 1.0, 0.75] })
    .put("white", rbox(0.48, 0.02, 0.22, 0.01), { p: [0.05, 0.92, 0.95] });
  for (let i = 0; i < 4; i++) p.put("greyDark", cyl(0.008, 0.008, 0.3, 6), { p: [-0.18 + i * 0.12, 1.16, 0.78], r: [0.15, 0, 0] });
  // spittoon
  p.put("white", cyl(0.11, 0.07, 0.12, 24), { p: [0.12, 0.95, -0.22] }).put("white", cyl(0.04, 0.05, 0.8, 16), { p: [0.12, 0.5, -0.22] });
  return p;
}
function operatorStool(mat = "plumSeat") {
  const p = new Part()
    .put(mat, cyl(0.22, 0.21, 0.08, 32), { p: [0, 0.56, 0] })
    .put("white", cyl(0.025, 0.03, 0.48, 12), { p: [0, 0.3, 0] });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    p.put("greyDark", box(0.26, 0.025, 0.035), { p: [Math.cos(a) * 0.13, 0.05, Math.sin(a) * 0.13], r: [0, -a, 0] });
  }
  return p;
}
function roundStool() {
  const p = new Part().put("greyFabric", cyl(0.2, 0.19, 0.38, 32), { p: [0, 0.27, 0] }).put("greyFabric", cyl(0.205, 0.205, 0.05, 32), { p: [0, 0.48, 0] });
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.6;
    p.put("gold", cyl(0.01, 0.01, 0.1, 8), { p: [Math.cos(a) * 0.15, 0.05, Math.sin(a) * 0.15] });
  }
  return p;
}
async function buildTreatment() {
  const R = new Room("treatment");
  R.defineMaterials(MATS);
  const W = 3.9, Dp = 3.7, H = 2.85;
  R.place("shell", roomShell(W, Dp, H));
  // rectangular ceiling light panels (MAT03011)
  const lights = new Part().put("lightPanel", box(1.15, 0.03, 0.55), { p: [0, 0, 0] }).put("lightPanel", box(1.15, 0.03, 0.55), { p: [0, 0, 1.1] });
  R.place("ceiling_panels", lights, { p: [0.2, H - 0.02, -0.7] });

  // back wall: copper mirror, cream door, neon "ANNALISA LONGOBARDI"
  const back = new Part()
    .put("copper", box(0.72, 1.62, 0.025), { p: [-1.05, 1.15, 0] })
    .put("cream", box(0.82, 2.1, 0.035), { p: [-0.15, 1.05, 0] })
    .put("gold", box(0.1, 0.03, 0.01), { p: [-0.15, 1.6, 0.02] })
    .put("neonWhite", textGeom("serif", "ANNALISA LONGOBARDI", 0.13, 0.01), { p: [0.95, 1.98, 0.01] })
    .put("neonPink", textGeom("sans", "odontoiatra specialista in ortognatodonzia", 0.055, 0.008), { p: [0.95, 1.84, 0.01] });
  R.place("back_wall", back, { p: [0, 0, -Dp / 2 + 0.02] });

  // left wall: smoked bronze glass sliding doors
  const doors = new Part()
    .put("bronzeGlass", box(1.0, 2.45, 0.02), { p: [-0.5, 1.25, 0] })
    .put("bronzeGlass", box(1.0, 2.45, 0.02), { p: [0.5, 1.25, 0.03] })
    .put("darkMetal", box(2.08, 0.04, 0.06), { p: [0, 2.5, 0.015] })
    .put("darkMetal", box(0.03, 2.5, 0.05), { p: [-1.02, 1.25, 0] })
    .put("darkMetal", box(0.03, 2.5, 0.05), { p: [1.02, 1.25, 0.03] })
    .put("darkMetal", box(0.02, 0.6, 0.03), { p: [0.9, 1.1, 0.05] });
  R.place("bronze_glass_doors", doors, { p: [-W / 2 + 0.03, 0, -0.2], ry: Math.PI / 2 });

  // right wall: TV + French window
  const tv = new Part().put("black", box(1.1, 0.64, 0.04), { p: [0, 0, 0] }).put("screen", plane(1.05, 0.6), { p: [0, 0, 0.021] });
  R.place("tv", tv, { p: [W / 2 - 0.03, 1.75, -0.75], ry: -Math.PI / 2 });
  R.place("window", frenchWindow(1.0, 2.3), { p: [W / 2 - 0.01, 0, 0.75], ry: -Math.PI / 2 });

  // chair + unit + stools + cart with screen
  R.place("dental_chair", dentalChair(), { p: [0.35, 0, 0.05], ry: -0.35 });
  R.place("dental_unit", dentalUnit(), { p: [0.95, 0, -0.45], ry: -0.35 });
  R.place("operator_stool", operatorStool(), { p: [1.05, 0, 0.75] });
  R.place("stool_a", roundStool(), { p: [-1.45, 0, -1.4] });
  R.place("stool_b", roundStool(), { p: [-1.0, 0, -1.5] });
  const cart = new Part()
    .put("white", cyl(0.025, 0.025, 1.1, 12), { p: [0, 0.6, 0] })
    .put("white", rbox(0.4, 0.06, 0.3, 0.02), { p: [0, 0.85, 0.05] })
    .put("black", box(0.46, 0.32, 0.03), { p: [0, 1.28, 0] })
    .put("screen", plane(0.42, 0.28), { p: [0, 1.28, 0.016] });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    cart.put("greyDark", box(0.3, 0.025, 0.035), { p: [Math.cos(a) * 0.15, 0.05, Math.sin(a) * 0.15], r: [0, -a, 0] });
  }
  R.place("scanner_cart", cart, { p: [-0.5, 0, -0.75], ry: 0.4 });
  await R.write("treatment.glb");
}

/* ═════════════ ROOM F — CONSULTATION OFFICE (MAT03036, MAT03057) ═════════════ */
function chandelier() {
  const p = new Part().put("gold", cyl(0.018, 0.018, 0.75, 12), { p: [0, 0.38, 0] }).put("gold", cyl(0.045, 0.045, 0.12, 16), { p: [0, 0, 0] });
  const arms = 16;
  for (let i = 0; i < arms; i++) {
    const a = (i / arms) * Math.PI * 2;
    const tilt = (i % 3) * 0.25 - 0.2;
    const len = 0.42 + (i % 2) * 0.08;
    const end = [Math.cos(a) * len, tilt * 0.5 + (i % 2 ? 0.06 : -0.04), Math.sin(a) * len];
    p.put("gold", tube([[0, 0, 0], [end[0] * 0.6, end[1] + 0.06, end[2] * 0.6], end], 0.006, 16), {});
    p.put("gold", cyl(0.016, 0.016, 0.05, 10), { p: [end[0], end[1] + 0.025, end[2]] });
    p.put("neonWarm", cyl(0.012, 0.012, 0.06, 10), { p: [end[0], end[1] + 0.08, end[2]] });
  }
  return p;
}
function guestChair() {
  // pink velvet chair with curved back and bronze legs (MAT03036)
  const gap = 3.0;
  const p = new Part()
    .put("velvet", new THREE.CylinderGeometry(0.24, 0.23, 0.1, 40), { p: [0, 0.47, 0.02] })
    .put("velvet", shellLathe([[0.24, 0.55], [0.27, 0.66], [0.275, 0.8]], gap, 40), {})
    .put("velvet", shellLathe([[0.22, 0.55], [0.24, 0.66], [0.245, 0.78]], gap, 40), {})
    .put("velvet", shellRim(0.26, 0.8, gap, 0.022), {});
  for (const [x, z] of [[-0.17, 0.16], [0.17, 0.16], [-0.17, -0.16], [0.17, -0.16]]) p.put("bronze", cyl(0.011, 0.009, 0.44, 8), { p: [x, 0.21, z] });
  p.put("bronze", shellRim(0.25, 0.57, gap, 0.01), {});
  return p;
}
function execChair() {
  const p = new Part()
    .put("greyFabric", rbox(0.56, 0.14, 0.52, 0.06), { p: [0, 0.5, 0.03] })
    .put("greyFabric", rbox(0.58, 0.7, 0.14, 0.07), { p: [0, 0.92, -0.22], r: [-0.12, 0, 0] })
    .put("greyFabric", rbox(0.12, 0.32, 0.46, 0.05), { p: [-0.3, 0.68, 0] })
    .put("greyFabric", rbox(0.12, 0.32, 0.46, 0.05), { p: [0.3, 0.68, 0] })
    .put("greyDark", cyl(0.03, 0.03, 0.35, 12), { p: [0, 0.24, 0] });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    p.put("greyDark", box(0.3, 0.025, 0.04), { p: [Math.cos(a) * 0.15, 0.05, Math.sin(a) * 0.15], r: [0, -a, 0] });
  }
  return p;
}
async function buildConsultation() {
  const R = new Room("consultation");
  R.defineMaterials(MATS);
  const W = 3.5, Dp = 3.3, H = 2.8;
  R.place("shell", roomShell(W, Dp, H));
  R.place("cove", new Part().put("cove", box(W - 0.5, 0.02, 0.04), { p: [0, H - 0.25, -Dp / 2 + 0.55] }).put("ceiling", box(W, 0.22, 0.5), { p: [0, H - 0.11, -Dp / 2 + 0.25] }));

  // full-height wall unit: cream doors + arched grey niche + open bay
  const wallUnit = new Part();
  const z = 0;
  // arched niche (left): grey arched doors at the top
  wallUnit.put("greyDark", archPanel(0.44, 1.25, 0.03), { p: [-1.48, 1.32, z + 0.32] }).put("greyDark", archPanel(0.44, 1.25, 0.03), { p: [-1.02, 1.32, z + 0.32] });
  // the two halves of an arch: reduce to a single arched shape split into two doors
  wallUnit.m.get("greyDark").length = 0;
  const arch = archPanel(0.9, 1.3, 0.03);
  wallUnit.put("greyDark", arch, { p: [-1.25, 1.3, z + 0.32] });
  wallUnit.put("black", box(0.006, 1.25, 0.005), { p: [-1.25, 1.95, z + 0.355] });
  // open bay under the arch: dark back, counter, wine cooler, drawers, lamp, coffee machine
  wallUnit
    .put("greyDark", box(0.92, 0.42, 0.02), { p: [-1.25, 1.08, z + 0.02] })
    .put("greyDark", box(0.94, 0.04, 0.42), { p: [-1.25, 0.86, z + 0.21] })
    .put("wineGlass", box(0.45, 0.82, 0.4), { p: [-1.47, 0.42, z + 0.21] })
    .put("greyDark", box(0.45, 0.82, 0.4), { p: [-1.02, 0.42, z + 0.21] })
    .put("black", box(0.005, 0.6, 0.005), { p: [-1.02, 0.42, z + 0.415] })
    .put("gold", cyl(0.06, 0.07, 0.015, 24), { p: [-1.55, 0.89, z + 0.25] })
    .put("gold", tube([[-1.55, 0.89, 0.25], [-1.55, 1.15, 0.22], [-1.42, 1.2, 0.24]], 0.006, 12), {})
    .put("black", cyl(0.035, 0.06, 0.09, 20), { p: [-1.38, 1.16, z + 0.24], r: [0, 0, -0.9] })
    .put("white", rbox(0.16, 0.2, 0.2, 0.02), { p: [-1.05, 0.98, z + 0.26] });
  // cream doors (right part) in two rows
  const cols = [-0.55, -0.1, 0.35, 0.8, 1.25, 1.55];
  for (let i = 0; i < cols.length - 1; i++) {
    const cx = (cols[i] + cols[i + 1]) / 2, w = cols[i + 1] - cols[i] - 0.008;
    wallUnit.put("cream", box(w, 1.25, 0.03), { p: [cx, 2.05, z + 0.33] });
    if (i !== 2) wallUnit.put("cream", box(w, 1.38, 0.03), { p: [cx, 0.7, z + 0.33] });
  }
  wallUnit.put("cream", box(W, 0.06, 0.34), { p: [0, H - 0.03, z + 0.17] });
  // central bay with monitor (desk attached)
  wallUnit.put("cream", box(0.44, 1.38, 0.02), { p: [0.575, 0.7, z + 0.01] }).put("black", box(0.4, 0.26, 0.02), { p: [0.575, 1.18, z + 0.05] }).put("screen", plane(0.38, 0.24), { p: [0.575, 1.18, z + 0.061] }).put("cove", box(0.4, 0.01, 0.02), { p: [0.575, 1.385, z + 0.3] });
  R.place("wall_unit", wallUnit, { p: [0, 0, -Dp / 2 + 0.01] });

  // oval onyx desk with bronze edge, attached to the central bay
  const desk = new Part()
    .put("onyx", ellipseSlab(0.92, 1.85, 0.035), { p: [0, 0.745, 0] })
    .put("bronze", ellipseSlab(0.94, 1.87, 0.02), { p: [0, 0.725, 0] })
    .put("cream", box(0.46, 0.7, 0.62), { p: [0, 0.35, 0.25] })
    .put("black", box(0.5, 0.32, 0.03), { p: [0.08, 1.02, -0.45], r: [0, -0.5, 0] })
    .put("screen", plane(0.46, 0.28), { p: [0.087, 1.02, -0.437], r: [0, -0.5, 0] })
    .put("greyDark", cyl(0.012, 0.012, 0.22, 8), { p: [0.08, 0.87, -0.47] })
    .put("white", rbox(0.42, 0.015, 0.13, 0.005), { p: [-0.05, 0.775, -0.1], r: [0, -0.4, 0] })
    .put("white", rbox(0.07, 0.03, 0.1, 0.01), { p: [0.22, 0.79, -0.2] })
    // vase with tulips (MAT03036)
    .put("white", rbox(0.13, 0.22, 0.09, 0.01), { p: [-0.15, 0.88, 0.45] });
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2, rr = 0.03 + (i % 3) * 0.02;
    const top = [-0.15 + Math.cos(a) * rr * 2.2, 1.2 + (i % 3) * 0.04, 0.45 + Math.sin(a) * rr * 1.6];
    desk.put("plant", tube([[-0.15, 0.95, 0.45], [top[0] * 0.5 - 0.075, 1.08, (top[2] + 0.45) / 2], top], 0.004, 8), {});
    desk.put(i % 3 ? "tulipRed" : "tulipWhite", new THREE.SphereGeometry(0.022, 12, 10), { p: top, s: [1, 1.5, 1] });
  }
  R.place("desk", desk, { p: [0.575, 0, -Dp / 2 + 1.25] });

  R.place("guest_chair_a", guestChair(), { p: [-0.05, 0, -0.55], ry: Math.PI / 2 + 0.2 });
  R.place("guest_chair_b", guestChair(), { p: [-0.1, 0, 0.15], ry: Math.PI / 2 - 0.15 });
  R.place("exec_chair", execChair(), { p: [1.3, 0, -0.45], ry: -Math.PI / 2 + 0.3 });
  R.place("chandelier", chandelier(), { p: [0.1, 2.05, -0.3] });

  // right wall: interior window toward another room
  const win = new Part()
    .put("white", box(2.2, 0.06, 0.1), { p: [0, 2.23, 0] })
    .put("white", box(2.2, 0.08, 0.14), { p: [0, 0.94, 0] })
    .put("white", box(0.06, 1.3, 0.1), { p: [-1.07, 1.58, 0] })
    .put("white", box(0.06, 1.3, 0.1), { p: [1.07, 1.58, 0] })
    .put("white", box(0.05, 1.3, 0.1), { p: [0, 1.58, 0] })
    .put("clearGlass", box(2.1, 1.22, 0.01), { p: [0, 1.58, 0] })
    .put("greyDark", plane(2.1, 1.3), { p: [0, 1.58, -0.6] })
    .put("lightPanel", plane(0.6, 0.15), { p: [0.4, 2.0, -0.55] });
  R.place("interior_window", win, { p: [W / 2 - 0.01, 0, 0.35], ry: -Math.PI / 2 });

  // left wall: bronze glass sliding door to the corridor (MAT03057)
  const sd = new Part().put("bronzeGlass", box(1.1, 2.4, 0.02), { p: [0, 1.2, 0] }).put("darkMetal", box(0.02, 0.5, 0.03), { p: [0.45, 1.1, 0.02] }).put("darkMetal", box(1.2, 0.05, 0.06), { p: [0, 2.43, 0] });
  R.place("sliding_door", sd, { p: [-W / 2 + 0.04, 0, 0.6], ry: Math.PI / 2 });

  await R.write("consultation.glb");
}

await buildReception();
await buildTreatment();
await buildConsultation();
