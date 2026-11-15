/** Chapter heading: number + name, used by the chapter rail. */
export function ChapterTag({ n, name, light }: { n: string; name: string; light?: boolean }) {
  return (
    <p className={`kicker flex items-center gap-3 ${light ? "text-black/70" : "text-white/75"}`}>
      <span className={`rounded-full border px-2.5 py-1 ${light ? "border-black/25" : "border-white/30"}`}>{n}</span>
      <span>{name}</span>
    </p>
  );
}

export const chapters = [
  { id: "exp-01", n: "01", name: "Signature Opening" },
  { id: "exp-02", n: "02", name: "Meet Annalisa" },
  { id: "exp-03", n: "03", name: "Smile Architecture" },
  { id: "exp-04", n: "04", name: "Treatments" },
  { id: "exp-05", n: "05", name: "The Studio" },
  { id: "exp-06", n: "06", name: "Pazzesco Stories" },
  { id: "exp-07", n: "07", name: "Three Cities" },
  { id: "exp-08", n: "08", name: "The Next Step" },
];
