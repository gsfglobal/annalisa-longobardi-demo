"use client";
import Link from "next/link";
import { lazy, useCallback, useEffect, useRef, useState } from "react";
import { Expand, LogOut, RotateCcw, Shrink, X } from "lucide-react";
import { SceneShell, useIsMobile, useReducedMotion } from "@/components/three/SceneShell";
import { Img } from "@/components/ui/Img";
import { studioRooms, type StudioRoom } from "@/lib/studio-rooms";
import { RoomSelector } from "./RoomSelector";
import { StudioFallback } from "./StudioFallback";
import { StudioLoading } from "./StudioLoading";

const StudioScene = lazy(() => import("./StudioScene"));

/**
 * THE STUDIO — immersive 3D experience.
 * Level 1: cinematic intro (scene already visible) · Level 2: exploration · Level 3: room selector.
 */
export function StudioExperience() {
  const box = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [started, setStarted] = useState(false);
  const [roomId, setRoomId] = useState<StudioRoom["id"]>("reception");
  const room = studioRooms.find((r) => r.id === roomId)!;
  const [view, setView] = useState(room.entry);
  const [active, setActive] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [introKey, setIntroKey] = useState(1);
  const [fade, setFade] = useState(false);
  const [fs, setFs] = useState(false);
  const hotspot = room.hotspots.find((h) => h.id === active) ?? null;

  const changeRoom = useCallback(
    (id: StudioRoom["id"]) => {
      if (id === roomId) return;
      setFade(true);
      setActive(null);
      setTimeout(
        () => {
          const r = studioRooms.find((x) => x.id === id)!;
          setRoomId(id);
          setView(r.entry);
          setIntroKey((k) => k + 1);
          setTimeout(() => setFade(false), 350);
        },
        reduced ? 0 : 480
      );
    },
    [roomId, reduced]
  );
  const selectHotspot = useCallback(
    (id: string) => {
      const h = room.hotspots.find((x) => x.id === id);
      if (!h) return;
      setStarted(true);
      setActive(id);
      setView(h.view);
    },
    [room]
  );
  const closeHotspot = () => {
    setActive(null);
    setView(room.entry);
  };
  const reset = () => {
    setActive(null);
    setView(room.entry);
    setResetKey((k) => k + 1);
  };
  const toggleFs = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await box.current?.requestFullscreen();
    } catch {
      /* fullscreen not allowed by the browser/frame: the experience still works */
    }
  };
  const exit = async () => {
    if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
    setStarted(false);
    setActive(null);
    setView(room.entry);
    document.getElementById("dettagli-studio")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  useEffect(() => {
    const on = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", on);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("fullscreenchange", on);
      window.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <section aria-labelledby="tour-title" className="relative bg-black">
      <div ref={box} className={`relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#0e0c0b] ${started ? "touch-none" : ""}`}>
        <SceneShell
          eager
          className="absolute inset-0"
          label={`Ricostruzione 3D dimostrativa: ${room.title}. ${room.intro}`}
          fallback={<StudioFallback room={room} />}
        >
          {(visible) => (
            <StudioScene
              room={roomId}
              view={view}
              controls={started}
              activeHotspot={active}
              onHotspot={selectHotspot}
              showHotspots={started}
              resetKey={resetKey}
              introKey={introKey}
              active={visible}
              reduced={reduced}
              compact={mobile}
            />
          )}
        </SceneShell>
        <StudioLoading />

        {/* soft spatial fade between rooms */}
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-20 bg-[#0e0c0b] transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`} />

        {/* LEVEL 1 — Cinematic intro */}
        <div className={`absolute inset-0 z-30 flex flex-col justify-end bg-gradient-to-t from-black via-black/55 to-black/10 transition-opacity duration-700 ${started ? "pointer-events-none opacity-0" : "opacity-100"}`} aria-hidden={started}>
          <div className="wrap grid gap-10 pb-20 md:pb-24 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="kicker text-white/75">The Studio · Immersive 3D Experience</p>
              <h1 id="tour-title" className="mega mt-5 text-[clamp(48px,9vw,148px)]">
                Entra nel nostro <span className="accent">mondo.</span>
              </h1>
              <p className="body mt-6 max-w-xl text-white/85">Scopri gli ambienti dello studio della Dott.ssa Annalisa Longobardi.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => setStarted(true)} className="pill pill-white" tabIndex={started ? -1 : 0}>
                  Esplora lo studio
                </button>
                <Link href="/contatti/" className="pill pill-line" tabIndex={started ? -1 : 0}>Prenota una visita</Link>
              </div>
            </div>
            <figure className="hidden lg:col-span-3 lg:col-start-10 lg:block">
              <div className="arch relative aspect-[3/4] w-full overflow-hidden">
                <Img k="studio-attesa" alt="Fotografia reale della sala d'attesa" fill sizes="25vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-[12px] leading-5 text-white/70">Fotografia reale · sala d&apos;attesa. La scena 3D è una ricostruzione dimostrativa basata su queste immagini.</figcaption>
            </figure>
          </div>
        </div>

        {/* LEVEL 2/3 — exploration UI */}
        {started && (
          <>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-64 bg-gradient-to-b from-black/75 via-black/35 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-56 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 p-4 pt-20 md:p-8 md:pt-24">
              <div className="min-w-0 max-w-md max-sm:pt-14">
                <p className="kicker text-white/70">0{studioRooms.indexOf(room) + 1} · {room.label}</p>
                <h2 className="mega mt-2 text-[clamp(22px,3.4vw,46px)]" aria-live="polite">{room.title}</h2>
                <p className="mt-2 hidden text-[14px] leading-6 text-white/80 md:block">{room.intro}</p>
              </div>
              <div className="flex shrink-0 gap-2 max-sm:absolute max-sm:right-4 max-sm:top-[76px]">
                <button type="button" onClick={reset} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 backdrop-blur-md hover:bg-white hover:text-black" aria-label="Ripristina la visuale"><RotateCcw className="h-4 w-4" /></button>
                <button type="button" onClick={toggleFs} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 backdrop-blur-md hover:bg-white hover:text-black" aria-label={fs ? "Esci da schermo intero" : "Schermo intero"}>{fs ? <Shrink className="h-4 w-4" /> : <Expand className="h-4 w-4" />}</button>
                <button type="button" onClick={exit} className="flex h-11 items-center gap-2 rounded-full border border-white/25 bg-black/50 px-4 text-[12px] font-semibold uppercase tracking-[0.12em] backdrop-blur-md hover:bg-white hover:text-black"><LogOut className="h-4 w-4" aria-hidden="true" /><span className="max-sm:sr-only">Esci dal tour</span></button>
              </div>
            </div>

            {/* accessible list of hotspots + active card */}
            <div className="absolute bottom-24 left-4 right-4 z-30 md:bottom-28 md:left-auto md:right-8 md:w-[380px]">
              {hotspot ? (
                <div className="rounded-[24px] border border-white/15 bg-black/70 p-5 backdrop-blur-xl" role="dialog" aria-label={hotspot.title}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[18px] font-semibold leading-snug">{hotspot.title}</p>
                    <button type="button" onClick={closeHotspot} className="-mr-2 -mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10" aria-label="Chiudi punto informativo"><X className="h-4 w-4" /></button>
                  </div>
                  <p className="mt-2 text-[14px] leading-6 text-white/85">{hotspot.text}</p>
                  {hotspot.source && <p className="mt-3 text-[12px] text-white/60">Fonte: {hotspot.source}</p>}
                </div>
              ) : (
                <div className="rounded-[24px] border border-white/15 bg-black/55 p-3 backdrop-blur-xl md:p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">Punti informativi</p>
                  <ul className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible">
                    {room.hotspots.map((h) => (
                      <li key={h.id} className="shrink-0"><button type="button" onClick={() => selectHotspot(h.id)} className="min-h-10 whitespace-nowrap rounded-full border border-white/20 px-3 text-[13px] hover:border-white">{h.title}</button></li>
                    ))}
                  </ul>
                  <p className="mt-2 hidden text-[12px] text-white/60 md:block">{mobile ? "Scorri con un dito per guardarti intorno." : "Trascina per guardarti intorno · rotella per avvicinarti."}</p>
                </div>
              )}
            </div>

          </>
        )}

        <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-2 p-3 md:p-5">
          {started && <RoomSelector current={roomId} onChange={changeRoom} />}
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-white/65">
            Ricostruzione digitale dimostrativa basata sulle foto dello studio · non è una copia fedele
          </p>
        </div>
      </div>
    </section>
  );
}
