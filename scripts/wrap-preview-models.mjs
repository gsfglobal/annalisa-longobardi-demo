// Preview only: wraps each GLB (unchanged bytes) as base64 in a .json file,
// because the artifact host does not serve .glb/.bin. The real site uses the .glb files.
import { readdirSync, readFileSync, writeFileSync, renameSync, mkdirSync } from "node:fs";
const dir = "preview-dist/models/studio";
const keep = "preview-glb-src";
mkdirSync(keep, { recursive: true });
for (const f of readdirSync(dir).filter((f) => f.endsWith(".glb"))) {
  const b = readFileSync(`${dir}/${f}`);
  writeFileSync(`${dir}/${f.replace(/\.glb$/, ".json")}`, JSON.stringify({ glb: b.toString("base64") }));
  renameSync(`${dir}/${f}`, `${keep}/${f}`);
  console.log("wrapped", f, b.length);
}
