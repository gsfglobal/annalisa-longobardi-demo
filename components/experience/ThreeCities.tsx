"use client";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { contacts, locations, whatsappLink } from "@/lib/site";
import { ChapterTag } from "./Chapter";

/** Abstract map: the three cities projected from their real coordinates, joined by the smile curve. */
function CityMap({ active, onPick }: { active: number; onPick: (n: number) => void }) {
  const lats = locations.map((l) => l.coords.lat);
  const lngs = locations.map((l) => l.coords.lng);
  const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  const P = locations.map((l) => ({
    x: 40 + ((l.coords.lng - minLng) / (maxLng - minLng)) * 230,
    y: 50 + ((maxLat - l.coords.lat) / (maxLat - minLat)) * 300,
  }));
  const [mi, ro, na] = [P[2], P[1], P[0]];
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="group" aria-label="Mappa stilizzata delle sedi">
      <defs>
        <radialGradient id="glow"><stop offset="0" stopColor="#843064" stopOpacity="0.5" /><stop offset="1" stopColor="#843064" stopOpacity="0" /></radialGradient>
      </defs>
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="#000000" strokeOpacity="0.06" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={"h" + i} y1={i * 50} x1="0" y2={i * 50} x2="400" stroke="#000000" strokeOpacity="0.06" />
      ))}
      <path d={`M${mi.x} ${mi.y} Q ${mi.x - 60} ${(mi.y + ro.y) / 2} ${ro.x} ${ro.y} T ${na.x} ${na.y}`} fill="none" stroke="#843064" strokeWidth="1.5" strokeDasharray="4 6" />
      {P.map((p, n) => (
        <g key={locations[n].slug} className="cursor-pointer" onClick={() => onPick(n)}>
          {n === active && <circle cx={p.x} cy={p.y} r="40" fill="url(#glow)" />}
          <circle cx={p.x} cy={p.y} r={n === active ? 9 : 6} fill={n === active ? "#843064" : "#1d1d1d"} />
          <circle cx={p.x} cy={p.y} r="16" fill="none" stroke="#843064" strokeOpacity={n === active ? 0.8 : 0} />
          <text x={p.x + 20} y={p.y + 5} className="font-display" fontSize="16" fontWeight="700" fill="#000000" style={{ textTransform: "uppercase" }}>{locations[n].city}</text>
          <text x={p.x + 20} y={p.y + 22} fontSize="10" fill="#1d1d1d" fillOpacity="0.7">
            {locations[n].coords.lat.toFixed(2)}° N · {locations[n].coords.lng.toFixed(2)}° E
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ThreeCities({ asPage = false }: { asPage?: boolean }) {
  const [i, setI] = useState(0);
  const l = locations[i];
  const H = asPage ? "h1" : "h2";
  return (
    <section id="exp-07" data-chapter="07" aria-labelledby="tc-title" className="on-light relative bg-mist py-24 text-black md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          {!asPage && <ChapterTag n="07" name="Three Cities, One Vision" light />}
          <H id="tc-title" className="mega rv mt-8 text-[clamp(44px,6.5vw,104px)]">
            Tre città, una <span className="accent text-plum">visione</span>
          </H>
          <div role="tablist" aria-label="Sedi" className="mt-10 flex gap-2">
            {locations.map((x, n) => (
              <button key={x.slug} role="tab" aria-selected={n === i} aria-controls="tc-panel" id={`tc-${x.slug}`} onClick={() => setI(n)} className={`min-h-12 flex-1 rounded-full border text-[12px] font-semibold uppercase tracking-[0.14em] transition ${n === i ? "border-black bg-black text-white" : "border-black/20 hover:border-black"}`}>
                {x.city}
              </button>
            ))}
          </div>
          <div id="tc-panel" role="tabpanel" aria-labelledby={`tc-${l.slug}`} className="mt-8 rounded-[28px] bg-white p-7 md:p-9" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="mega text-[44px]">{l.city}</p>
              <span className={`tag ${l.confirmed ? "text-black/70" : "text-plum"}`}>Fonte: {l.source}{l.confirmed ? "" : " · da confermare"}</span>
            </div>
            <address className="mt-4 text-[17px] not-italic leading-7">
              {l.address}
              <br />
              {l.postalCode} {l.city} ({l.region})
            </address>
            {l.slug === "napoli" && <p className="mt-2 text-[14px] text-black/70">{contacts.hours}</p>}
            {l.bookingNote && <p className="mt-2 text-[14px] text-black/70">{l.bookingNote}</p>}
            <div className="mt-7 flex flex-wrap gap-2">
              <a href={l.mapsHref} target="_blank" rel="noopener" className="pill pill-line-dark"><MapPin className="h-4 w-4" aria-hidden="true" /> Mappa</a>
              {l.bookingHref && (
                <a href={l.bookingHref} target="_blank" rel="noopener" className="pill pill-plum">Prenota <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
              )}
              <a href={whatsappLink(`Buongiorno, vorrei informazioni per una visita presso la sede di ${l.city}.`)} target="_blank" rel="noopener" className="pill pill-line-dark"><WhatsAppIcon /> WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="relative aspect-square lg:col-span-5 lg:col-start-8">
          <CityMap active={i} onPick={setI} />
        </div>
      </div>
    </section>
  );
}
