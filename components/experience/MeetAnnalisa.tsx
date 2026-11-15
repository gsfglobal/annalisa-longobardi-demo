"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Img } from "@/components/ui/Img";
import { useReducedMotion } from "@/components/three/SceneShell";
import { credentials } from "@/lib/site";
import { ChapterTag } from "./Chapter";

const steps = [
  { y: "2001", t: "Laurea con lode in Odontoiatria e Protesi Dentaria" },
  { y: "2002", t: "Titolare di studio privato" },
  { y: "2005", t: "Specializzazione in Ortognatodonzia, Seconda Università degli Studi di Napoli" },
  { y: "Oggi", t: "Coordinatrice del Master di II livello “Basic Orthodontics”, Università “Luigi Vanvitelli”" },
];

/**
 * 02 — Meet Annalisa. On desktop the composition changes during the scroll:
 * (1) full-height portrait + monumental title → (2) portrait moves, the second photo comes in,
 * academic path → (3) credentials and CTA. On mobile: static editorial layout (no pinning).
 */
export function MeetAnnalisa() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      tl.to(".ma-portrait", { xPercent: 66, scale: 0.55, duration: 1 }, 0.15)
        .to(".ma-tag", { opacity: 0, duration: 0.2 }, 0.1)
        .fromTo(".ma-second", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 }, 0.3)
        .to(".ma-title", { yPercent: -22, scale: 0.6, duration: 1 }, 0.15)
        .to(".ma-intro", { opacity: 0, y: -30, duration: 0.4 }, 0.15)
        .fromTo(".ma-step", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.4 }, 0.6)
        .fromTo(".ma-cred", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, 1.3)
        .to({}, { duration: 0.3 });
    });
    return () => mm.revert();
  }, [reduced]);

  return (
    <section ref={root} id="exp-02" data-chapter="02" aria-labelledby="ma-title" className={`on-light relative bg-pearl text-black ${reduced ? "" : "lg:h-[320vh]"}`}>
      {/* DESKTOP: pinned sequence */}
      <div className={`relative hidden overflow-hidden lg:block ${reduced ? "min-h-[100svh]" : "sticky top-0 h-[100svh]"}`}>
        <div className="wrap relative h-full">
          <div className="ma-portrait arch absolute bottom-0 left-14 top-[12vh] z-10 w-[34vw] max-w-[560px] origin-bottom-left bg-mist">
            <Img k="ritratto-piedi" alt="Ritratto della Dott.ssa Annalisa Longobardi" fill sizes="35vw" className="object-cover object-top" />
          </div>
          <div className="ma-second arch absolute bottom-0 left-14 top-[18vh] w-[30vw] max-w-[480px] overflow-hidden bg-mist" style={reduced ? { display: "none" } : { clipPath: "inset(100% 0% 0% 0%)" }}>
            <Img k="studio-direzione" alt="L'ufficio della dottoressa nello studio di Napoli" fill sizes="30vw" className="object-cover" />
          </div>
          <div className="absolute right-14 top-[14vh] w-[48vw]">
            <div className="ma-tag"><ChapterTag n="02" name="Meet Annalisa" light /></div>
            <h2 id="ma-title" className="ma-title mega mt-8 origin-top-left text-[clamp(64px,7.4vw,138px)]">
              La visione dietro il <span className="accent text-plum">sorriso.</span>
            </h2>
            <p className="ma-intro body mt-8 max-w-lg text-ink">
              Odontoiatra e specialista in Ortognatodonzia, la Dott.ssa Annalisa Longobardi unisce attività clinica e
              accademica. Il suo obiettivo è dichiarato: un sorriso pazzesco, naturale ed equilibrato.
            </p>
          </div>
          <div className="absolute right-14 top-[40vh] w-[44vw]">
            <ol className="border-t border-black/15">
              {steps.map((s) => (
                <li key={s.y} className={`ma-step grid grid-cols-[120px_1fr] gap-6 border-b border-black/15 py-3.5 ${reduced ? "" : "opacity-0"}`}>
                  <span className="mega text-[30px]">{s.y}</span>
                  <span className="text-[15px] leading-6 text-ink">{s.t}</span>
                </li>
              ))}
            </ol>
            <div className={`ma-cred mt-6 flex flex-col gap-4 ${reduced ? "" : "opacity-0"}`}>
              <ul className="flex flex-wrap gap-2">{credentials.map((c) => <li key={c} className="tag text-plum">{c}</li>)}</ul>
              <Link href="/chi-sono/" className="pill pill-line-dark self-start">La biografia completa</Link>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE/TABLET: editorial layout */}
      <div className="py-20 lg:hidden">
        <div className="wrap">
          <ChapterTag n="02" name="Meet Annalisa" light />
          <h2 className="mega rv mt-6 text-[clamp(46px,11vw,96px)]">La visione dietro il <span className="accent text-plum">sorriso.</span></h2>
          <div className="mt-10 grid grid-cols-5 gap-3">
            <div className="arch relative col-span-3 aspect-[3/4.4] bg-mist"><Img k="ritratto-piedi" alt="Ritratto della Dott.ssa Annalisa Longobardi" fill sizes="60vw" className="object-cover object-top" /></div>
            <div className="arch-sm relative col-span-2 mt-16 aspect-[3/4] self-start bg-mist"><Img k="studio-direzione" alt="L'ufficio della dottoressa" fill sizes="40vw" className="object-cover" /></div>
          </div>
          <p className="body mt-10 text-ink">Odontoiatra e specialista in Ortognatodonzia, la Dott.ssa Annalisa Longobardi unisce attività clinica e accademica. Il suo obiettivo è dichiarato: un sorriso pazzesco, naturale ed equilibrato.</p>
          <ol className="mt-8 border-t border-black/15">
            {steps.map((s) => (
              <li key={s.y} className="grid grid-cols-[76px_1fr] gap-4 border-b border-black/15 py-4">
                <span className="mega text-[24px]">{s.y}</span>
                <span className="text-[15px] leading-6 text-ink">{s.t}</span>
              </li>
            ))}
          </ol>
          <ul className="mt-6 flex flex-wrap gap-2">{credentials.map((c) => <li key={c} className="tag text-plum">{c}</li>)}</ul>
          <Link href="/chi-sono/" className="pill pill-line-dark mt-8">La biografia completa</Link>
        </div>
      </div>
    </section>
  );
}
