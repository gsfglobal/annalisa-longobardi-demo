import { Img } from "@/components/ui/Img";
import type { StudioRoom } from "@/lib/studio-rooms";

/** Without WebGL: high-quality photo of the same room (the info points stay in the tour UI). */
export function StudioFallback({ room }: { room: StudioRoom }) {
  return (
    <div className="absolute inset-0 bg-black">
      <Img k={room.photos[0].key} alt={room.photos[0].alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/45" />
    </div>
  );
}
