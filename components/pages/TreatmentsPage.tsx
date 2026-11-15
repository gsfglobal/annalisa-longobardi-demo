"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { categories, treatments } from "@/lib/site";
import { InnerHero } from "./InnerHero";

/** Editorial index of the treatments: list rows with a photo revealed on hover/focus (not cards). */
export function TreatmentsPage() {
  const [hover, setHover] = useState(treatments[0].image);
  return (
    <>
      <InnerHero kicker="Trattamenti" title={<>Tutto per il tuo <span className="accent">sorriso</span></>} intro="Dalla prevenzione all'estetica, dall'ortodonzia alla chirurgia: i 15 trattamenti dello studio, per adulti e bambini." />
      <section className="bg-black pb-24 md:pb-32">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {Object.entries(categories).map(([k, label]) => (
              <div key={k} className="mb-14">
                <p className="kicker border-b border-white/25 pb-3 text-plum">{label}</p>
                <ul>
                  {treatments.filter((t) => t.category === k).map((t) => {
                    const row = (
                      <>
                        <span className="min-w-0">
                          <span className="mega block text-[clamp(28px,3.4vw,48px)] transition-colors duration-500 group-hover:text-plum">{t.name}</span>
                          <span className="mt-1 block text-[14px] leading-6 text-white/70">{t.short}</span>
                        </span>
                        {t.detail ? <span className="tag shrink-0 text-white/85">3D <ArrowUpRight className="h-3 w-3" aria-hidden="true" /></span> : null}
                      </>
                    );
                    return (
                      <li key={t.slug} className="border-b border-white/10" onMouseEnter={() => setHover(t.image)} onFocus={() => setHover(t.image)}>
                        {t.detail ? (
                          <Link href={`/trattamenti/${t.slug}/`} className="group flex items-center justify-between gap-6 py-5">{row}</Link>
                        ) : (
                          <div className="group flex items-center justify-between gap-6 py-5">{row}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="hidden lg:col-span-4 lg:block">
            <div className="arch sticky top-28 aspect-[3/4] bg-ink">
              <Img key={hover} k={hover} alt="" fill sizes="30vw" className="object-cover animate-[fadeIn_0.8s_ease]" />
            </div>
          </div>
        </div>
      </section>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </>
  );
}
