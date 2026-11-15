/** Compresses the studio GLBs (meshopt + quantisation) and checks that they reload. */
import fs from "node:fs";
import path from "node:path";
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { meshopt, quantize, reorder } from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptDecoder } from "meshoptimizer";

await MeshoptEncoder.ready;
await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ "meshopt.encoder": MeshoptEncoder, "meshopt.decoder": MeshoptDecoder });
const dir = path.resolve(process.env.STUDIO_OUT ?? "public/models/studio");
const useMeshopt = process.env.MESHOPT !== "0";
for (const f of ["reception.glb", "treatment.glb", "consultation.glb"]) {
  const p = path.join(dir, f);
  const before = fs.statSync(p).size;
  const doc = await io.read(p);
  await doc.transform(reorder({ encoder: MeshoptEncoder }), quantize(), ...(useMeshopt ? [meshopt({ encoder: MeshoptEncoder, level: "medium" })] : []));
  await io.write(p, doc);
  const check = await io.read(p);
  const root = check.getRoot();
  console.log(`${f}: ${(before / 1024).toFixed(0)} KB → ${(fs.statSync(p).size / 1024).toFixed(0)} KB | nodes ${root.listNodes().length}, meshes ${root.listMeshes().length}, materials ${root.listMaterials().length}, textures ${root.listTextures().length}, extensions: ${root.listExtensionsUsed().map((e) => e.extensionName).join(", ")}`);
}
