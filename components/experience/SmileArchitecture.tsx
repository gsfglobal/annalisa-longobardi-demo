"use client";
import { lazy, useState } from "react";
import { SceneShell, useIsMobile } from "@/components/three/SceneShell";
import { ArchFallback } from "@/components/three/Fallbacks";
import type { SmileMode } from "@/components/three/scenes/SmileScene";
import { ChapterTag } from "./Chapter";

const SmileScene = lazy(() => import("@/components/three/scenes/SmileScene"));

const MODES: { key: SmileMode; title: string; lead: string; text: string; view: string }[] = [
  {
    key: "estetica",
    title: "Estetica",
    lead: "Le proporzioni del sorriso.",
    text: "Forma e proporzione dei denti anteriori, linea del sorriso, rapporto con labbra e lineamenti: un sorriso bello è prima di tutto un sorriso in equilibrio.",
    view: "Vista frontale · guide di proporzione sui sei denti anteriori",
  },
  {
    key: "allineamento",
    title: "Allineamento",
    lead: "Ogni elemento lungo la sua curva.",
    text: "L'arcata segue una curva continua. Il suo allineamento contribuisce all'armonia del sorriso e rende più semplice l'igiene quotidiana.",
    view: "Vista occlusale dall'alto · forma dell'arcata",
  },
  {
    key: "funzione",
    title: "Funzione",
    lead: "Estetica e masticazione lavorano insieme.",
    text: "Premolari e molari sostengono la masticazione: un sorriso armonico è anche un sorriso che funziona bene, ogni giorno.",
    view: "Vista laterale · elementi posteriori evidenziati",
  },
  {
    key: "personalizzazione",
    title: "Su misura",
    lead: "Ogni sorriso è unico.",
    text: "Nessun piano è standard: ogni scelta nasce da una valutazione professionale individuale, durante la visita.",
    view: "Vista tre quarti · un elemento isolato per l'analisi",
  },
];

export function SmileArchitecture() {
  const [mode, setMode] = useState<SmileMode>("estetica");
  const mobile = useIsMobile();
  const m = MODES.find((x) => x.key === mode)!;
  return (
    <section id="exp-03" data-chapter="03" aria-labelledby="aos-title" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <ChapterTag n="03" name="Smile Architecture" />
          <h2 id="aos-title" className="mega rv mt-8 text-[8.2vw] lg:text-[6.4vw] 2xl:text-[104px]">
            L&apos;architettura
            <br />
            del <span className="accent text-[1.1em]">sorriso</span>
          </h2>

          <div role="tablist" aria-label="Dimensioni del sorriso" className="rv mt-10 grid grid-cols-2 gap-2 rounded-[28px] border border-white/15 p-1.5 sm:grid-cols-4 sm:rounded-full">
            {MODES.map((x) => (
              <button
                key={x.key}
                role="tab"
                id={`tab-${x.key}`}
                aria-selected={mode === x.key}
                aria-controls="aos-panel"
                onClick={() => setMode(x.key)}
                className={`min-h-11 rounded-full px-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-500 ${
                  mode === x.key ? "bg-white text-black" : "text-white/80 hover:text-white"
                }`}
              >
                {x.title}
              </button>
            ))}
          </div>

          <div id="aos-panel" role="tabpanel" aria-labelledby={`tab-${mode}`} aria-live="polite" className="mt-10 min-h-[220px]">
            <p key={m.key + "l"} className="font-serif text-[30px] italic leading-tight text-white md:text-[38px]">{m.lead}</p>
            <p key={m.key + "t"} className="body mt-5 max-w-md text-white/80">{m.text}</p>
            <p className="kicker mt-8 text-white/60">{m.view}</p>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <SceneShell
            className="h-[58svh] w-full md:h-[72vh]"
            label={`Modello tridimensionale stilizzato di un'arcata dentale. ${m.view}.`}
            fallback={<div className="flex h-full items-center justify-center p-10"><ArchFallback /></div>}
          >
            {(active) => <SmileScene mode={mode} active={active} compact={mobile} />}
          </SceneShell>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12px] text-white/60">
            <span>Trascina per ruotare (rotazione limitata) oppure usa i pulsanti.</span>
            <span className="tag text-white/60">Modello illustrativo · non diagnostico</span>
          </div>
        </div>
      </div>
    </section>
  );
}
