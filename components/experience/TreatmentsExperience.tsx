"use client";
import Link from "next/link";
import { lazy, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { SceneShell, useIsMobile, useReducedMotion } from "@/components/three/SceneShell";
import { ArchFallback } from "@/components/three/Fallbacks";
import type { TreatmentKey } from "@/components/three/scenes/TreatmentScene";
import { ChapterTag } from "./Chapter";

const TreatmentScene = lazy(() => import("@/components/three/scenes/TreatmentScene"));

type Identity = { bg: string; light: boolean; accent: string };
const ITEMS: { k: TreatmentKey; name: string; img: string; claim: string; text: string; model: string; id: Identity }[] = [
  {
    k: "invisalign",
    name: "Invisalign",
    img: "t-invisalign",
    claim: "Trasparente. Su misura.",
    text: "Allineatori trasparenti e rimovibili, progettati in digitale dopo la scansione intraorale. Lo studio è Diamond Apex Invisalign Provider.",
    model: "Un allineatore trasparente si posa sull'arcata",
    id: { bg: "bg-ink", light: false, accent: "text-white" },
  },
  {
    k: "faccette-dentali",
    name: "Faccette",
    img: "t-faccette",
    claim: "Forma e luce, con naturalezza.",
    text: "Sottili lamine in ceramica applicate sulla superficie visibile del dente. Lo studio è Centro di Eccellenza Lumineers.",
    model: "Una faccetta si avvicina alla superficie di un dente",
    id: { bg: "bg-pearl", light: true, accent: "text-plum" },
  },
  {
    k: "ortodonzia",
    name: "Ortodonzia",
    img: "t-ortodonzia",
    claim: "Ogni dente al suo posto.",
    text: "Correzione delle malocclusioni e allineamento dell'arcata per bambini, ragazzi e adulti, con la specializzazione in Ortognatodonzia.",
    model: "Schema: i denti si dispongono lungo la curva dell'arcata",
    id: { bg: "bg-black", light: false, accent: "text-white" },
  },
  {
    k: "sbiancamento-dentale",
    name: "Sbiancamento",
    img: "t-sbiancamento",
    claim: "Più luce al sorriso.",
    text: "Sbiancamento professionale sotto controllo odontoiatrico. Lo studio è Centro d'Eccellenza per lo sbiancamento BlancOne.",
    model: "Una luce attraversa l'arcata",
    id: { bg: "bg-white", light: true, accent: "text-plum" },
  },
];

/** 04 — Treatments as experiences: every treatment has its own scene and identity. */
export function TreatmentsExperience() {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(0);
  const [play, setPlay] = useState(0);
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const start = useRef<number | null>(null);
  const it = ITEMS[i];
  const L = it.id.light;
  const go = (n: number) => {
    const next = (n + ITEMS.length) % ITEMS.length;
    if (next === i) return;
    setPrev(i);
    setI(next);
    setPlay((p) => p + 1);
  };

  return (
    <section id="exp-04" data-chapter="04" aria-labelledby="tx-title" className={`relative overflow-hidden ${L ? "on-light text-black" : "text-white"} transition-colors duration-700`}>
      {/* scene change: the new identity opens with a circular mask */}
      <div aria-hidden="true" className={`absolute inset-0 ${ITEMS[prev].id.bg}`} />
      <div key={i} aria-hidden="true" className={`absolute inset-0 ${it.id.bg} ${reduced ? "" : "animate-[wipe_1.1s_cubic-bezier(0.16,1,0.3,1)_both]"}`} />

      <div className="wrap relative py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <ChapterTag n="04" name="Treatments as Experiences" light={L} />
            <h2 id="tx-title" className={`kicker mt-5 ${L ? "text-black/70" : "text-white/70"}`}>I trattamenti signature dello studio</h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(i - 1)} className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${L ? "border-black/25 hover:bg-black hover:text-white" : "border-white/30 hover:bg-white hover:text-black"}`} aria-label="Trattamento precedente"><ArrowLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => go(i + 1)} className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${L ? "border-black/25 hover:bg-black hover:text-white" : "border-white/30 hover:bg-white hover:text-black"}`} aria-label="Trattamento successivo"><ArrowRight className="h-5 w-5" /></button>
          </div>
        </div>

        <div
          className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-12 lg:items-center"
          onPointerDown={(e) => (start.current = e.clientX)}
          onPointerUp={(e) => {
            if (start.current === null) return;
            const dx = e.clientX - start.current;
            if (Math.abs(dx) > 70 && (e.target as HTMLElement).tagName !== "CANVAS") go(i + (dx < 0 ? 1 : -1));
            start.current = null;
          }}
        >
          <div key={it.k} className="relative z-10 lg:col-span-5" role="tabpanel" id="tx-panel" aria-labelledby={`tx-tab-${it.k}`} aria-live="polite">
            <p className={`kicker ${L ? "text-black/60" : "text-white/60"}`}>0{i + 1} / 0{ITEMS.length}</p>
            <h3 className="mega mt-4 whitespace-nowrap" style={{ fontSize: `clamp(38px, ${Math.min(8.4, 50 / it.name.length).toFixed(2)}vw, 150px)` }}>
              <span className="block overflow-hidden"><span className={`block ${reduced ? "" : "animate-[rise_1.1s_cubic-bezier(0.16,1,0.3,1)_both]"}`}>{it.name}</span></span>
            </h3>
            <p className={`accent mt-4 text-[clamp(28px,3vw,44px)] ${it.id.accent} ${reduced ? "" : "animate-[fadeUp_1s_0.15s_both]"}`}>{it.claim}</p>
            <p className={`body mt-5 max-w-md ${L ? "text-ink" : "text-white/80"} ${reduced ? "" : "animate-[fadeUp_1s_0.25s_both]"}`}>{it.text}</p>
            <div className={`mt-8 flex items-end gap-5 ${reduced ? "" : "animate-[fadeUp_1s_0.35s_both]"}`}>
              <div className="arch-sm relative aspect-[3/4] w-24 shrink-0 bg-ink md:w-28">
                <Img k={it.img} alt={`Fotografia: ${it.name}`} fill sizes="120px" className="object-cover" />
              </div>
              <Link href={`/trattamenti/${it.k}/`} className={`pill ${L ? "pill-plum" : "pill-white"}`}>
                Approfondisci <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-7">
            <SceneShell className="h-[46svh] w-full md:h-[66vh]" label={`Modello 3D illustrativo: ${it.model}.`} fallback={<div className="flex h-full items-center justify-center p-10"><ArchFallback /></div>}>
              {(active) => <TreatmentScene k={it.k} play={play} active={active} compact={mobile} />}
            </SceneShell>
            <div className={`mt-2 flex flex-wrap items-center justify-between gap-2 text-[12px] ${L ? "text-black/65" : "text-white/65"}`}>
              <span>{it.model} · illustrazione schematica, non un risultato clinico</span>
              <button type="button" onClick={() => setPlay((p) => p + 1)} className="tag">Ripeti</button>
            </div>
          </div>
        </div>

        <div role="tablist" aria-label="Trattamenti" className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {ITEMS.map((x, n) => (
            <button
              key={x.k}
              role="tab"
              id={`tx-tab-${x.k}`}
              aria-selected={n === i}
              aria-controls="tx-panel"
              onClick={() => go(n)}
              className={`flex min-h-12 shrink-0 items-center gap-3 rounded-full border px-5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 ${
                n === i ? (L ? "border-black bg-black text-white" : "border-white bg-white text-black") : L ? "border-black/20 hover:border-black" : "border-white/25 hover:border-white"
              }`}
            >
              <span className={n === i ? "text-plum" : "opacity-60"}>0{n + 1}</span>
              {x.name}
            </button>
          ))}
          <span className={`flex min-h-12 shrink-0 items-center rounded-full border border-dashed px-5 text-[12px] uppercase tracking-[0.12em] ${L ? "border-black/25 text-black/55" : "border-white/25 text-white/55"}`}>
            Composite bonding · in attesa di conferma
          </span>
          <Link href="/trattamenti/" className={`flex min-h-12 shrink-0 items-center gap-2 rounded-full px-5 text-[12px] font-semibold uppercase tracking-[0.14em] underline underline-offset-4`}>
            Tutti i 15 trattamenti
          </Link>
        </div>
      </div>
      <style>{`
        @keyframes wipe{from{clip-path:circle(0% at 72% 50%)}to{clip-path:circle(150% at 72% 50%)}}
        @keyframes rise{from{transform:translateY(105%)}to{transform:none}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
      `}</style>
    </section>
  );
}
