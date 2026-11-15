import Image from "next/image";
import { media } from "@/lib/media";

type Props = {
  k: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
};

/** Immagine ottimizzata: varianti WebP pre-generate servite tramite next/image + loader custom. */
export function Img({ k, alt, sizes = "100vw", priority, className, fill }: Props) {
  const m = media[k];
  if (fill) {
    return <Image src={`/media/${k}`} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
  }
  return (
    <Image
      src={`/media/${k}`}
      alt={alt}
      width={m.w}
      height={m.h}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
