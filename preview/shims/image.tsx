/* eslint-disable @next/next/no-img-element -- shim dell anteprima: next/image non esiste fuori da Next.js */
import loader from "../../lib/image-loader";
import { media } from "../../lib/media";

type Props = { src: string; alt: string; fill?: boolean; width?: number; height?: number; sizes?: string; priority?: boolean; className?: string };
export default function Image({ src, alt, fill, width, height, sizes, priority, className }: Props) {
  const key = src.replace(/^.*\/media\//, "");
  const ws = media[key]?.widths ?? [];
  const srcSet = ws.map((w) => `${loader({ src, width: w })} ${Math.min(w, media[key].w)}w`).join(", ");
  return (
    <img
      src={loader({ src, width: 1280 })}
      srcSet={srcSet || undefined}
      sizes={sizes}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : undefined}
    />
  );
}
