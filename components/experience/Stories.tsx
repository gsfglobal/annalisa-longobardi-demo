"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { asset } from "@/lib/asset";
import { Img } from "@/components/ui/Img";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { social } from "@/lib/site";
import { ChapterTag } from "./Chapter";

const facebook = "https://www.facebook.com/AnnalisaLongobardiOdontoiatra";

const reels = [
  { k: "t-invisalign", title: "Invisalign, spiegato bene", net: "tiktok" as const },
  { k: "studio-attesa", title: "Dentro lo studio", net: "instagram" as const },
  { k: "t-faccette", title: "Faccette: forma e luce", net: "instagram" as const },
  { k: "t-sbiancamento", title: "Sbiancamento professionale", net: "tiktok" as const },
  { k: "studio-operativa-prugna", title: "Dietro le quinte", net: "instagram" as const },
];

function Player() {
  const v = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    const on = () => setT(el.duration ? el.currentTime / el.duration : 0);
    el.addEventListener("timeupdate", on);
    return () => el.removeEventListener("timeupdate", on);
  }, []);
  const toggle = () => {
    const el = v.current;
    if (!el) return;
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => {});
    else {
      el.pause();
      setPlaying(false);
    }
  };
  return (
    <figure className="relative">
      <div className="arch-sm relative aspect-[9/16] w-full overflow-hidden bg-black">
        <video
          ref={v}
          className="absolute inset-0 h-full w-full object-cover"
          src={asset("/media/hero.mp4")}
          poster={asset("/media/hero-poster.webp")}
          muted={muted}
          playsInline
          loop
          preload="none"
          onClick={toggle}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="absolute inset-x-5 top-[16%] flex items-center justify-between text-white">
          <span className="kicker">Reel · Lo studio</span>
          <span className="tag">Video ufficiale</span>
        </div>
        <div className="absolute inset-x-5 bottom-5 text-white">
          <p className="accent text-[34px] leading-none">Benvenuti nello studio</p>
          <div className="mt-4 flex items-center gap-3">
            <button type="button" onClick={toggle} className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition hover:bg-plum hover:text-white" aria-label={playing ? "Metti in pausa il video" : "Riproduci il video"}>
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button type="button" onClick={() => setMuted((m) => !m)} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40" aria-label={muted ? "Attiva l'audio" : "Disattiva l'audio"}>
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25" aria-hidden="true">
              <div className="h-full bg-white" style={{ width: `${t * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-[12px] text-black/65">Fonte: video pubblicato sul sito ufficiale annalisalongobardi.com</figcaption>
    </figure>
  );
}

function ReelSlider() {
  const track = useRef<HTMLUListElement>(null);
  const move = (d: number) => track.current?.scrollBy({ left: d * (track.current.clientWidth * 0.6), behavior: "smooth" });
  return (
    <div className="relative min-w-0">
      <div className="mb-3 flex items-center justify-between">
        <p className="kicker text-black/65">Reel verticali</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-black/25 transition hover:bg-black hover:text-white" aria-label="Reel precedenti"><ArrowLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-black/25 transition hover:bg-black hover:text-white" aria-label="Reel successivi"><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
      <ul ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
        {reels.map((c, n) => (
          <li key={c.k} className={`shrink-0 snap-start ${n % 2 ? "md:mt-10" : ""}`}>
            <a href={social[c.net].href} target="_blank" rel="noopener" className="group relative block aspect-[9/16] w-[46vw] overflow-hidden rounded-[24px] bg-black sm:w-[30vw] md:w-[200px] lg:w-[220px]">
              <Img k={c.k} alt="" fill sizes="240px" className="object-cover opacity-90 transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-white">
                <span className="tag mb-3 text-white/90">{c.net === "tiktok" ? <TikTokIcon className="h-3 w-3" /> : <InstagramIcon className="h-3 w-3" />} Reel da collegare</span>
                <p className="font-display text-[19px] font-bold uppercase leading-none tracking-tight">{c.title}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Stories() {
  return (
    <section id="exp-06" data-chapter="06" aria-labelledby="st-title" className="on-light relative bg-white py-24 text-black md:py-32">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 border-b-2 border-black pb-6 xl:flex-row xl:items-end">
          <div>
            <ChapterTag n="06" name="Pazzesco Stories" light />
            <h2 id="st-title" className="mega rv mt-6 text-[clamp(52px,10vw,170px)]">
              Pazzesco <span className="accent text-plum">stories</span>
            </h2>
          </div>
          <div className="min-w-0 xl:shrink-0 xl:text-right">
            <p className="kicker text-black/70">N°01 · Il magazine del sorriso</p>
            <div className="mt-4 flex flex-wrap gap-2 xl:justify-end">
              <a href={social.instagram.href} target="_blank" rel="noopener" className="pill pill-line-dark !min-h-11 !px-4" aria-label={`Instagram ${social.instagram.handle}`}><InstagramIcon /> Instagram</a>
              <a href={social.tiktok.href} target="_blank" rel="noopener" className="pill pill-line-dark !min-h-11 !px-4" aria-label={`TikTok ${social.tiktok.handle}`}><TikTokIcon /> TikTok</a>
              <a href={facebook} target="_blank" rel="noopener" className="pill pill-line-dark hidden !min-h-11 !px-4 sm:inline-flex">Facebook</a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <Player />
          </div>
          <div className="flex min-w-0 flex-col gap-5 md:col-span-7 lg:col-span-8">
            <blockquote className="rv rounded-[28px] bg-plum p-7 text-white md:p-10">
              <p className="accent text-[clamp(32px,3.6vw,56px)] leading-[1.02]">“Il mio obiettivo? Regalarvi un sorriso pazzesco!”</p>
              <footer className="kicker mt-6 text-white/85">Dott.ssa Annalisa Longobardi — dal sito ufficiale</footer>
            </blockquote>
            <ReelSlider />
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-[12px] leading-5 text-black/65">
          Le copertine usano foto del sito ufficiale come segnaposto. I Reel e i contenuti social (inclusi eventuali video con creator)
          verranno collegati solo con l&apos;autorizzazione della dottoressa, tramite embed ufficiali o file forniti dallo studio.
        </p>
      </div>
    </section>
  );
}
