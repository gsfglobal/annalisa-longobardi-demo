import { media } from "./media";
import { BASE } from "./asset";

/** Loader per next/image: sceglie la variante WebP pre-generata più adatta. */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const key = src.replace(/^.*\/media\//, "").replace(/\.\w+$/, "");
  const m = media[key];
  if (!m) return src;
  const w = m.widths.find((x) => x >= width) ?? m.widths[m.widths.length - 1];
  return `${BASE}/media/${key}-${w}.webp`;
}
