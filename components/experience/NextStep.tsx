"use client";
import Link from "next/link";
import { lazy, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SceneShell, useIsMobile, useReducedMotion } from "@/components/three/SceneShell";
import { SmileFallback } from "@/components/three/Fallbacks";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { contacts, whatsappLink } from "@/lib/site";
import { ChapterTag } from "./Chapter";

const HeroScene = lazy(() => import("@/components/three/scenes/HeroScene"));

/** The close: the opening sculpture returns as a visual callback. */
export function NextStep() {
  const progress = useRef({ current: 0.12 }).current;
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const options = [
    { label: "Prenota una visita", sub: "Prima visita e consulenza", href: "/contatti/", internal: true },
    { label: "Scrivici su WhatsApp", sub: contacts.whatsappLabel, href: whatsappLink("Buongiorno, vorrei prenotare una visita."), icon: true },
    { label: "Scopri dove riceviamo", sub: "Napoli · Roma · Milano", href: "/sedi/", internal: true },
  ];
  return (
    <section id="exp-08" data-chapter="08" aria-labelledby="ns-title" className="relative overflow-hidden bg-black py-24 md:py-36">
      <SceneShell className="pointer-events-none absolute inset-0 opacity-70" label="La scultura del sorriso, ripresa dall'apertura" fallback={<div className="absolute inset-x-0 top-1/4 h-1/2"><SmileFallback /></div>}>
        {(active) => <HeroScene progress={progress} active={active} reduced={reduced} compact={mobile} />}
      </SceneShell>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      <div className="wrap relative">
        <ChapterTag n="08" name="The Next Step" />
        <h2 id="ns-title" className="mega rv mt-8 text-[clamp(48px,9vw,150px)]">
          Il tuo sorriso <span className="accent text-white">pazzesco</span>
          <br />
          inizia qui.
        </h2>
        <ul className="mt-14 border-t border-white/20">
          {options.map((o) => {
            const inner = (
              <>
                <span>
                  <span className="mega block text-[clamp(26px,3.6vw,52px)] transition-colors duration-500 group-hover:text-plum">{o.label}</span>
                  <span className="mt-1 block text-[14px] text-white/70">{o.sub}</span>
                </span>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                  {o.icon ? <WhatsAppIcon className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" aria-hidden="true" />}
                </span>
              </>
            );
            return (
              <li key={o.label} className="border-b border-white/20">
                {o.internal ? (
                  <Link href={o.href} className="group flex items-center justify-between gap-6 py-7">{inner}</Link>
                ) : (
                  <a href={o.href} target="_blank" rel="noopener" className="group flex items-center justify-between gap-6 py-7">{inner}</a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
