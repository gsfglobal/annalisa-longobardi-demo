"use client";
import { useCallback, useRef, useState } from "react";
import { Img } from "@/components/ui/Img";

type Props = { before: string; after: string; caption: string; beforeAlt: string; afterAlt: string };

/** Confronto prima/dopo trascinabile: mouse, touch e tastiera (frecce). */
export function BeforeAfterSlider({ before, after, caption, beforeAlt, afterAlt }: Props) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <figure>
      <div
        ref={box}
        className="relative aspect-[3/2] cursor-ew-resize touch-pan-y select-none overflow-hidden bg-ink"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Img k={after} alt={afterAlt} fill sizes="(min-width:1024px) 60vw, 100vw" className="pointer-events-none object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Img k={before} alt={beforeAlt} fill sizes="(min-width:1024px) 60vw, 100vw" className="pointer-events-none object-cover" />
        </div>
        <span className="eyebrow absolute left-4 top-4 bg-white px-3 py-2 text-plum">Prima</span>
        <span className="eyebrow absolute right-4 top-4 bg-white px-3 py-2 text-plum">Dopo</span>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -left-px w-[2px] bg-white" />
          <div
            role="slider"
            tabIndex={0}
            aria-label="Sposta il confronto prima e dopo"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
            }}
            className="pointer-events-auto absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-plum text-white shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-[13px] leading-6 text-ink/80">{caption}</figcaption>
    </figure>
  );
}
