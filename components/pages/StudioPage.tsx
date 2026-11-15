import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { studioGallery, contacts } from "@/lib/site";
import { InnerHero } from "./InnerHero";

export function StudioPage() {
  return (
    <>
      <InnerHero kicker="Lo studio · Napoli" title={<>Il mio <span className="accent">studio</span></>} intro={`Uno spazio accogliente, moderno e pensato per mettere ogni paziente a proprio agio. ${contacts.hours}.`} image="studio-attesa" imageAlt="Sala d'attesa dello studio" />
      <section className="bg-black pb-10">
        <div className="wrap">
          <Link href="/studio/experience/" className="group relative block overflow-hidden rounded-[28px] border border-white/15">
            <div className="relative aspect-[16/9] md:aspect-[21/8]">
              <Img k="studio-lounge" alt="" fill sizes="100vw" className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
              <p className="kicker text-white/75">The Studio · Immersive 3D Experience</p>
              <p className="mega mt-3 max-w-2xl text-[clamp(32px,5vw,80px)]">Entra nel nostro <span className="accent">mondo.</span></p>
              <span className="pill pill-white mt-6 self-start">Esplora lo studio in 3D <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
            </div>
          </Link>
        </div>
      </section>
      <section className="bg-black pb-24 pt-10">
        <div className="wrap columns-1 gap-4 sm:columns-2 lg:columns-3">
          {studioGallery.map((g, i) => (
            <figure key={g.key} className="mb-4 break-inside-avoid">
              <div className={`relative overflow-hidden bg-ink ${i % 3 === 0 ? "arch-sm aspect-[3/4]" : "aspect-[4/3] rounded-[24px]"}`}>
                <Img k={g.key} alt={g.alt} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-2 text-[12px] text-white/60">{g.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
