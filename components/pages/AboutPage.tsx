import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { credentials, cv, doctor } from "@/lib/site";
import { InnerHero } from "./InnerHero";

export function AboutPage() {
  return (
    <>
      <InnerHero kicker="Chi sono" title={<>Annalisa <span className="accent">Longobardi</span></>} intro="Odontoiatra, specialista in Ortognatodonzia. Mi occupo di estetica dentale con un obiettivo preciso: regalarvi un sorriso pazzesco." image="ritratto-piedi" imageAlt="Ritratto della Dott.ssa Annalisa Longobardi" />
      <section className="on-light bg-pearl py-24 text-black md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="arch relative aspect-[4/5] lg:col-span-5">
            <Img k="ritratto-poltrona" alt="La dottoressa seduta in poltrona" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-top" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <p className="kicker text-plum">Filosofia</p>
            <h2 className="mega rv mt-6 text-[clamp(40px,5vw,80px)]">Attenta, precisa, <span className="accent text-plum">personalizzata.</span></h2>
            <p className="body rv mt-8 text-ink">Ogni sorriso viene valutato nella sua unicità, con l&apos;obiettivo di unire estetica, salute e armonia. Risultati naturali, equilibrati e duraturi, che valorizzano il sorriso senza stravolgerlo.</p>
            <p className="body rv mt-5 text-ink/85">Io e il mio team affrontiamo ogni caso con precisione, impegno e attenzione, dalle procedure più semplici agli interventi più complessi, per adulti e bambini di tutte le età.</p>
            <ul className="rv mt-10 flex flex-wrap gap-2">{credentials.map((c) => <li key={c} className="tag text-plum">{c}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="bg-black py-24 md:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker text-white/60">Formazione</p>
            <ol className="mt-8 space-y-8">
              {cv.education.map((e) => (
                <li key={e.year} className="rv border-t border-white/15 pt-6">
                  <span className="mega block text-[64px]">{e.year}</span>
                  <span className="body mt-2 block text-white/80">{e.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="kicker text-white/60">Attività professionale e accademica</p>
            <ul className="mt-8">
              {cv.career.map((c) => (
                <li key={c.text} className="rv flex gap-5 border-t border-white/15 py-5 text-[16px] leading-7 text-white/85">
                  <span className="w-20 shrink-0 font-serif text-[20px] italic text-white">{c.year || "—"}</span>
                  {c.text}
                </li>
              ))}
            </ul>
            <p className="kicker mt-14 text-white/60">Società e riconoscimenti</p>
            <ul className="mt-6 space-y-3">
              {cv.memberships.map((m) => <li key={m} className="rv text-[15px] leading-7 text-white/80">· {m}</li>)}
            </ul>
            <p className="mt-6 text-[14px] text-white/60">{cv.research}</p>
          </div>
        </div>
      </section>
      <section className="bg-plum py-20 text-center">
        <div className="wrap">
          <p className="mega rv mx-auto max-w-4xl text-[clamp(36px,5.5vw,84px)]">Il mio obiettivo? <span className="accent">Regalarvi un sorriso pazzesco.</span></p>
          <p className="mt-4 text-[14px] text-white/80">{doctor.fullName}</p>
          <Link href="/contatti/" className="pill pill-white mt-10">Contatta lo studio</Link>
        </div>
      </section>
    </>
  );
}
