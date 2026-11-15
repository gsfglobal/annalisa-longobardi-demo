"use client";
import Link from "next/link";
import { lazy, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SceneShell, useIsMobile, useReducedMotion } from "@/components/three/SceneShell";
import { StudioFallback } from "@/components/3d/StudioFallback";
import { studioRooms } from "@/lib/studio-rooms";
import { ChapterTag } from "./Chapter";

const StudioScene = lazy(() => import("@/components/3d/StudioScene"));

/**
 * 05 — Preview of the 3D tour. Light: only the reception, loaded when the section
 * is close. Sequence: slow camera → title → highlighted hotspot → button.
 */
export function StudioPreview() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [stage, setStage] = useState(0);
  const [seen, setSeen] = useState(false);
  const room = studioRooms[0];
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen) return;
    const d = reduced ? [0, 0, 0, 0] : [0, 1200, 2600, 3600];
    const timers = d.map((ms, n) => setTimeout(() => setStage(n + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [seen, reduced]);
  const show = (n: number) => (stage >= n ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0");

  return (
    <section ref={ref} id="exp-05" data-chapter="05" aria-labelledby="sp-title" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#0e0c0b]">
      <SceneShell className="absolute inset-0" label="Anteprima 3D della sala d'attesa dello studio (ricostruzione dimostrativa)" fallback={<StudioFallback room={room} />}>
        {(active) => (
          <StudioScene
            mode="preview"
            room="reception"
            view={stage >= 1 ? room.entry : { pos: [2.3, 1.7, 2.1], target: room.entry.target }}
            controls={false}
            activeHotspot={null}
            onHotspot={() => {}}
            showHotspots={stage >= 3}
            onlyHotspot="neon"
            highlightHotspot="neon"
            resetKey={0}
            introKey={1}
            active={active}
            reduced={reduced}
            compact={mobile}
          />
        )}
      </SceneShell>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="wrap pb-14 md:pb-20">
          <ChapterTag n="05" name="The Studio · Immersive 3D" />
          <h2 id="sp-title" className={`mega mt-6 text-[clamp(44px,8vw,136px)] transition-all duration-1000 ease-[var(--ease-lux)] ${show(2)}`}>
            Non limitarti a <span className="accent">immaginarlo.</span>
            <span className="mt-2 block text-[0.42em] tracking-[-0.02em] text-white/90">Entra nel nostro studio.</span>
          </h2>
          <div className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-1000 ease-[var(--ease-lux)] ${show(4)}`}>
            <Link href="/studio/experience/" className="pill pill-white">
              Esplora lo studio in 3D <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="text-[13px] text-white/70">Reception · Sala operativa · Ufficio — ricostruzione digitale dimostrativa</span>
          </div>
        </div>
      </div>
    </section>
  );
}
