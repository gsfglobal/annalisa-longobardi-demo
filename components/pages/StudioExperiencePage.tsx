import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { StudioExperience } from "@/components/3d/StudioExperience";
import { studioRooms } from "@/lib/studio-rooms";
import { contacts, locations } from "@/lib/site";

export function StudioExperiencePage() {
  const napoli = locations[0];
  return (
    <>
      <StudioExperience />

      <section id="dettagli-studio" aria-labelledby="det-title" className="bg-black py-24 md:py-32">
        <div className="wrap">
          <p className="kicker text-white/70">Dettagli architettonici</p>
          <h2 id="det-title" className="mega mt-5 max-w-4xl text-[clamp(40px,6vw,96px)]">
            Le fotografie <span className="accent">reali</span> degli ambienti.
          </h2>
          <p className="body mt-6 max-w-2xl text-white/80">
            Ogni ambiente del tour è stato ricostruito a partire da queste immagini. Qui trovi gli originali e cosa è stato
            riprodotto o semplificato nella versione 3D.
          </p>
          <div className="mt-16 space-y-24">
            {studioRooms.map((r, i) => (
              <article key={r.id} className="grid gap-8 lg:grid-cols-12" aria-labelledby={`room-${r.id}`}>
                <div className="lg:col-span-4">
                  <p className="kicker text-white/60">Ambiente 0{i + 1}</p>
                  <h3 id={`room-${r.id}`} className="mega mt-3 text-[clamp(30px,3.4vw,52px)]">{r.title}</h3>
                  <p className="body mt-4 text-white/80">{r.intro}</p>
                  <p className="mt-6 text-[13px] leading-6 text-white/60"><span className="font-semibold text-white/80">Fedeltà della ricostruzione.</span> {r.fidelity}</p>
                </div>
                <div className={`grid gap-4 sm:grid-cols-2 lg:col-span-8 ${i % 2 ? "lg:order-first" : ""}`}>
                  {r.photos.map((ph, n) => (
                    <figure key={ph.key} className={n === 0 ? "sm:col-span-2" : ""}>
                      <div className={`relative overflow-hidden bg-ink ${n === 0 ? "aspect-[16/9] rounded-[28px]" : "arch-sm aspect-[4/3]"}`}>
                        <Img k={ph.key} alt={ph.alt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] hover:scale-[1.03]" />
                      </div>
                      <figcaption className="mt-2 text-[12px] text-white/60">{ph.alt} · foto ufficiale {ph.file}</figcaption>
                    </figure>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-24 grid gap-6 rounded-[28px] border border-white/15 p-7 md:grid-cols-12 md:p-10">
            <p className="mega text-[28px] md:col-span-4">Verso il digital twin</p>
            <p className="text-[15px] leading-7 text-white/80 md:col-span-8">
              Questa è una ricostruzione dimostrativa. Con planimetria, misure, panoramiche 360° e una scansione LiDAR degli
              ambienti, lo stesso tour può diventare una copia fedele dello studio, mantenendo navigazione e punti informativi.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-plum py-24 text-center md:py-32">
        <div className="wrap">
          <h2 className="mega mx-auto max-w-4xl text-[clamp(44px,7vw,120px)]">Vieni a conoscere lo <span className="accent">studio.</span></h2>
          <p className="mt-6 text-[16px] text-white/85">{napoli.address}, {napoli.postalCode} Napoli · {contacts.hours}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contatti/" className="pill pill-white">Prenota una visita</Link>
            <a href={napoli.mapsHref} target="_blank" rel="noopener" className="pill pill-line">Indicazioni</a>
          </div>
        </div>
      </section>
    </>
  );
}
