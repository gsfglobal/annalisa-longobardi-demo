import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/** The smile curve: an arc opening upward with the ends lifted. Used by the sculpture and the scenes. */
export function smileCurve(width = 4.4, depth = 0.9, lift = 0.55, z = 0, samples = 9) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    const x = (t - 0.5) * width;
    const n = x / (width / 2);
    const y = -depth * (1 - n * n) + lift * Math.pow(Math.abs(n), 6);
    const zz = z - 0.35 * n * n;
    pts.push(new THREE.Vector3(x, y, zz));
  }
  return new THREE.CatmullRomCurve3(pts, false, "centripetal");
}

/** Sculptural band extruded along a curve (rounded section). */
export function ribbonGeometry(curve: THREE.Curve<THREE.Vector3>, w = 0.34, h = 0.07, steps = 220) {
  const shape = new THREE.Shape();
  const r = h / 2;
  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.absarc(w / 2 - r, 0, r, -Math.PI / 2, Math.PI / 2, false);
  shape.lineTo(-w / 2 + r, h / 2);
  shape.absarc(-w / 2 + r, 0, r, Math.PI / 2, (3 * Math.PI) / 2, false);
  const g = new THREE.ExtrudeGeometry(shape, { steps, bevelEnabled: false, extrudePath: curve });
  g.computeVertexNormals();
  return g;
}

export type ToothKind = "central" | "lateral" | "canine" | "premolar" | "molar";

/** Stylised tooth crown (illustrative, not anatomically exact): a rounded block shaped vertex by vertex. */
export function toothGeometry(kind: ToothKind, w: number, h: number, d: number) {
  const g = new RoundedBoxGeometry(w, h, d, 6, Math.min(w, d) * 0.44);
  const p = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const xn = v.x / (w / 2);
    const yn = v.y / (h / 2); // -1 = incisal/occlusal edge, +1 = cervical (gum line)
    const zn = v.z / (d / 2);
    // Narrower at the cervical third, rounded at the edge
    const ws = 1 - 0.3 * Math.pow(Math.max(0, yn), 1.6) - 0.06 * Math.pow(Math.max(0, -yn), 3);
    v.x *= ws;
    // Thin incisal edge on front teeth, broader on back teeth
    const front = kind === "central" || kind === "lateral" || kind === "canine";
    const ds = front ? 0.42 + 0.58 * ((yn + 1) / 2) : 0.85 + 0.15 * ((yn + 1) / 2);
    v.z *= ds;
    // Labial convexity
    if (zn > 0) v.z += d * 0.08 * (1 - xn * xn) * (1 - yn * yn);
    // Canine tip
    if (kind === "canine" && yn < -0.3) v.y -= h * 0.12 * (1 - Math.min(1, Math.abs(xn))) * ((-yn - 0.3) / 0.7);
    // Cusps on back teeth
    if ((kind === "premolar" || kind === "molar") && yn < -0.6) {
      const cusps = kind === "molar" ? 2 : 1;
      v.y -= h * 0.06 * Math.max(0, Math.cos(xn * Math.PI * cusps)) * Math.max(0, Math.cos(zn * Math.PI * 0.5));
    }
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

const SIDE: { kind: ToothKind; w: number; h: number; d: number }[] = [
  { kind: "central", w: 0.86, h: 1.08, d: 0.72 },
  { kind: "lateral", w: 0.68, h: 0.94, d: 0.66 },
  { kind: "canine", w: 0.78, h: 1.06, d: 0.82 },
  { kind: "premolar", w: 0.7, h: 0.84, d: 0.92 },
  { kind: "premolar", w: 0.68, h: 0.8, d: 0.92 },
  { kind: "molar", w: 1.0, h: 0.74, d: 1.08 },
  { kind: "molar", w: 0.94, h: 0.7, d: 1.02 },
];

export type ToothSpec = {
  id: number;
  kind: ToothKind;
  w: number;
  h: number;
  d: number;
  pos: THREE.Vector3;
  rotY: number;
  side: -1 | 1;
  index: number; // 0 = central incisor
};

/** Upper arch: 14 teeth placed along a parabola z = -k·x² by arc length. */
export function archLayout(unit = 0.42, k = 0.62): { teeth: ToothSpec[]; curve: THREE.CatmullRomCurve3 } {
  const teeth: ToothSpec[] = [];
  const gap = 0.012;
  const step = 0.0015;
  const zf = (x: number) => -k * x * x;
  let id = 0;
  for (const side of [-1, 1] as const) {
    let x = 0;
    let s = 0;
    SIDE.forEach((t, index) => {
      const width = t.w * unit;
      const target = s + width / 2 + (index === 0 ? gap / 2 : gap);
      while (s < target) {
        const dx = step;
        const dz = zf(x + dx) - zf(x);
        s += Math.hypot(dx, dz);
        x += dx;
      }
      const cx = x * side;
      const nx = 2 * k * cx;
      const len = Math.hypot(nx, 1);
      const rotY = Math.atan2(nx / len, 1 / len);
      const h = t.h * unit;
      // Smile line: incisal edges rise gently toward the back
      const yEdge = 0.55 * x * x;
      teeth.push({
        id: id++,
        kind: t.kind,
        w: width,
        h,
        d: t.d * unit,
        pos: new THREE.Vector3(cx, yEdge + h / 2, zf(cx) - (t.d * unit) / 2),
        rotY,
        side,
        index,
      });
      // advance to the end of this tooth
      const end = s + width / 2;
      while (s < end) {
        const dx = step;
        const dz = zf(x + dx) - zf(x);
        s += Math.hypot(dx, dz);
        x += dx;
      }
    });
  }
  const pts: THREE.Vector3[] = [];
  const xmax = Math.max(...teeth.map((t) => Math.abs(t.pos.x))) + 0.12;
  for (let i = 0; i <= 24; i++) {
    const x = -xmax + (2 * xmax * i) / 24;
    pts.push(new THREE.Vector3(x, 0.55 * x * x, zf(x) - 0.12));
  }
  return { teeth, curve: new THREE.CatmullRomCurve3(pts) };
}
