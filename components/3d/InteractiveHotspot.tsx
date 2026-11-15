"use client";
import { Html } from "@react-three/drei";
import type { Hotspot } from "@/lib/studio-rooms";

/** Hotspot anchored to a point in the room: a real button (focusable, tappable). */
export function InteractiveHotspot({ h, active, onSelect, highlight }: { h: Hotspot; active: boolean; onSelect: (id: string) => void; highlight?: boolean }) {
  return (
    <Html position={h.at} center zIndexRange={[30, 10]} style={{ pointerEvents: "auto" }}>
      <button
        type="button"
        onClick={() => onSelect(h.id)}
        aria-pressed={active}
        aria-label={`Punto informativo: ${h.title}`}
        className="group relative flex items-center gap-2 whitespace-nowrap"
      >
        <span className="relative flex h-9 w-9 items-center justify-center">
          {(highlight || !active) && <span className="absolute inset-0 animate-ping rounded-full bg-white/40 motion-reduce:animate-none" />}
          <span className={`relative flex h-7 w-7 items-center justify-center rounded-full border border-white/80 backdrop-blur-md transition-colors duration-500 ${active ? "bg-white" : "bg-black/45 group-hover:bg-white"}`}>
            <span className={`h-2 w-2 rounded-full ${active ? "bg-plum" : "bg-white group-hover:bg-plum"}`} />
          </span>
        </span>
        <span className={`rounded-full bg-black/70 px-3 py-1.5 text-[12px] font-semibold tracking-[0.04em] text-white backdrop-blur-md transition-opacity duration-500 ${active || highlight ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>
          {h.title}
        </span>
      </button>
    </Html>
  );
}
