import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { treatments } from "@/lib/site";
import { treatmentDetails } from "@/lib/treatment-details";
import type { TreatmentKey } from "@/components/three/scenes/TreatmentScene";
import { TreatmentHero3D } from "./TreatmentHero3D";

export function TreatmentDetailPage({ slug }: { slug: string }) {
  const t = treatments.find((x) => x.slug === slug)!;
  const d = treatmentDetails[slug];
  const related = d.related.map((s) => treatments.find((x) => x.slug === s)!).filter(Boolean);
  return (
    <>
      <section className="relative overflow-hidden bg-black pb-16 pt-28 md:pt-36">
        <div className="wrap relative grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <nav aria-label="Percorso" className="kicker text-white/65"><Link href="/trattamenti/" className="hover:text-white">Trattamenti</Link> / {t.name}</nav>
            <h1 className="mega mt-6 break-words text-[clamp(36px,7.5vw,120px)]">{t.name}</h1>
            <p className="body mt-6 max-w-md text-white/80">{t.short}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/contatti/" className="pill pill-white">Prenota una visita</Link>
              <div className="arch-sm relative h-24 w-20 bg-ink"><Img k={t.image} alt={`Fotografia: ${t.name}`} fill sizes="80px" className="object-cover" /></div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <TreatmentHero3D k={slug as TreatmentKey} label={`Modello tridimensionale illustrativo: ${t.name}`} />
          </div>
        </div>
      </section>
      <section className="on-light bg-pearl py-24 text-black md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="kicker text-plum">Cos&apos;è</p>
            <p className="mt-6 font-serif text-[28px] leading-[1.35] md:text-[34px]">{d.intro}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="kicker text-plum">A chi si rivolge</p>
            <ul className="mt-6">
              {d.forWho.map((w) => <li key={w} className="border-t border-black/15 py-4 text-[16px] leading-7 text-ink">{w}</li>)}
            </ul>
          </div>
        </div>
        <div className="wrap mt-20">
          <p className="kicker text-plum">Il percorso</p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {d.steps.map((s, i) => (
              <li key={s.title} className="rounded-[24px] bg-white p-6">
                <span className="mega text-[44px] text-plum">0{i + 1}</span>
                <h2 className="mt-4 text-[14px] font-semibold uppercase tracking-[0.12em]">{s.title}</h2>
                <p className="mt-2 text-[15px] leading-6 text-ink/85">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="wrap mt-20 grid gap-10 lg:grid-cols-12">
          <p className="kicker text-plum lg:col-span-4">Domande frequenti</p>
          <div className="lg:col-span-8">
            {d.faq.map((f) => (
              <details key={f.q} className="group border-t border-black/15 py-5 last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[20px] font-semibold md:text-[24px]">
                  {f.q}<span aria-hidden="true" className="text-plum transition-transform duration-500 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-[16px] leading-7 text-ink">{f.a}</p>
              </details>
            ))}
            <p className="mt-6 text-[13px] text-ink/75">Informazioni di carattere generale: indicazioni, tempi e risultati si definiscono solo dopo una visita.</p>
          </div>
        </div>
      </section>
      <section className="bg-black py-20">
        <div className="wrap">
          <p className="kicker text-white/60">Trattamenti correlati</p>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="border-t border-white/20 pt-5">
                <Link href={r.detail ? `/trattamenti/${r.slug}/` : "/trattamenti/"} className="mega text-[30px] hover:text-plum">{r.name}</Link>
                <p className="mt-2 text-[14px] text-white/70">{r.short}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
