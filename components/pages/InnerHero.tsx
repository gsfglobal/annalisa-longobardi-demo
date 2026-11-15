import { Img } from "@/components/ui/Img";

/** Inner page opening: large title + photo in an arch mask (same language as the home). */
export function InnerHero({ kicker, title, intro, image, imageAlt = "" }: { kicker: string; title: React.ReactNode; intro?: string; image?: string; imageAlt?: string }) {
  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className={image ? "lg:col-span-7" : "lg:col-span-11"}>
          <p className="kicker rv text-white/70">{kicker}</p>
          <h1 className="mega rv mt-6 text-[clamp(52px,9vw,150px)]">{title}</h1>
          {intro && <p className="body rv mt-8 max-w-xl text-white/80">{intro}</p>}
        </div>
        {image && (
          <div className="arch rv relative aspect-[4/5] w-full max-w-[420px] justify-self-end lg:col-span-4 lg:col-start-9">
            <Img k={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 30vw, 100vw" className="object-cover object-top" />
          </div>
        )}
      </div>
    </section>
  );
}
