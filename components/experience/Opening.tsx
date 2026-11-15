"use client";
import Link from "next/link";
import { lazy, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Img } from "@/components/ui/Img";
import { SceneShell, useIsMobile, useReducedMotion } from "@/components/three/SceneShell";
import { SmileFallback } from "@/components/three/Fallbacks";
import type { Progress } from "@/components/three/scenes/HeroScene";
import { doctor } from "@/lib/site";

const HeroScene = lazy(() => import("@/components/three/scenes/HeroScene"));

/**
 * 01 — Signature Opening. Multi-layer editorial composition:
 * [back] "IL TUO SORRISO" · [mid] full-height portrait · [3D] smile curve · [front] "PAZZESCO." + secondary photo.
 */
export function Opening() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef<Progress>({ current: 0 }).current;
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    if (reduced || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".op-line > span", { yPercent: 108, duration: 1.5, ease: "expo.out", stagger: 0.1, delay: 0.15 });
      gsap.from(".op-portrait", { clipPath: "inset(100% 0% 0% 0% round 999px 999px 0 0)", duration: 1.8, ease: "expo.out", delay: 0.05 });
      gsap.from(".op-photo", { yPercent: 30, opacity: 0, duration: 1.6, ease: "expo.out", delay: 0.6 });
      gsap.from(".op-fade", { opacity: 0, y: 14, duration: 1.2, ease: "power3.out", stagger: 0.08, delay: 0.7 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7, onUpdate: (s) => (progress.current = s.progress) },
      });
      // depth between layers: back title rises slowly, front title faster, portrait expands
      tl.to(".op-back", { yPercent: -35, duration: 1 }, 0)
        .to(".op-front", { yPercent: -120, duration: 1 }, 0)
        .to(".op-portrait", { scale: 1.08, yPercent: -6, duration: 1 }, 0)
        .to(".op-photo", { yPercent: -60, duration: 1 }, 0)
        .to(".op-ui", { opacity: 0, duration: 0.25 }, 0.05)
        .to(".op-veil", { opacity: 1, duration: 0.25 }, 0.75);
    }, root);
    return () => ctx.revert();
  }, [reduced, progress]);

  return (
    <section ref={root} id="exp-01" data-chapter="01" aria-labelledby="op-title" className={reduced ? "relative" : "relative h-[220vh]"}>
      <div className={`${reduced ? "relative min-h-[100svh]" : "sticky top-0 h-[100svh]"} overflow-hidden bg-black`}>
        <h1 id="op-title" className="sr-only">Il tuo sorriso pazzesco. {doctor.fullName}, {doctor.title}.</h1>

        {/* back layer: monumental title behind the portrait */}
        <p aria-hidden="true" className="op-back mega absolute inset-x-0 top-[17%] z-0 text-center text-[clamp(64px,13.2vw,250px)] leading-[0.82] text-white md:top-[13%]">
          <span className="op-line block overflow-hidden pb-[0.04em]"><span className="block">Il tuo</span></span>
          <span className="op-line block overflow-hidden pb-[0.04em]"><span className="block">sorriso</span></span>
        </p>

        {/* full-height portrait in the arch */}
        <div className="op-portrait arch absolute bottom-0 left-1/2 z-10 h-[64svh] w-[min(72vw,470px)] -translate-x-1/2 origin-bottom bg-ink md:h-[80svh]">
          <Img k="ritratto-poltrona" alt="La Dott.ssa Annalisa Longobardi" fill priority sizes="(min-width:768px) 470px, 72vw" className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </div>

        {/* 3D: the curve of the smile passes in front of the portrait */}
        <SceneShell eager className="pointer-events-none absolute inset-0 z-20" label="Scultura tridimensionale ispirata alla curva armonica del sorriso" fallback={<div className="absolute inset-x-0 top-[40%] h-[28%]"><SmileFallback /></div>}>
          {(active) => <HeroScene progress={progress} active={active} reduced={reduced} compact={mobile} />}
        </SceneShell>

        {/* front layer */}
        <p aria-hidden="true" className="op-front accent absolute inset-x-0 bottom-[16svh] z-30 text-center text-[clamp(76px,17vw,290px)] leading-none text-white md:bottom-[8svh]">
          <span className="op-line block overflow-hidden"><span className="block">Pazzesco.</span></span>
        </p>

        {/* secondary photo layer */}
        <div className="op-photo arch-sm absolute bottom-[14svh] left-[6vw] z-30 hidden aspect-[3/4] w-[13vw] max-w-[220px] overflow-hidden border border-white/20 lg:block">
          <Img k="studio-attesa" alt="" fill sizes="220px" className="object-cover" />
        </div>

        <div className="op-ui absolute inset-x-0 bottom-0 z-40 pb-6 md:pb-8">
          <div className="wrap flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="op-fade max-md:hidden">
              <p className="text-[15px] font-semibold">{doctor.fullName}</p>
              <p className="text-[14px] text-white/75">Odontoiatra · Specialista in Ortognatodonzia</p>
            </div>
            <div className="op-fade flex gap-2 max-md:justify-center">
              <Link href="/studio/experience/" className="pill pill-white">Entra nello studio 3D</Link>
              <Link href="/contatti/" className="pill pill-line max-sm:hidden">Prenota una visita</Link>
            </div>
          </div>
        </div>
        <p className="op-ui op-fade kicker absolute left-5 top-24 z-40 text-white/80 md:left-14 md:top-28">Napoli · Roma · Milano</p>
        <div aria-hidden="true" className="op-veil pointer-events-none absolute inset-0 z-50 bg-black opacity-0" />
      </div>
    </section>
  );
}
