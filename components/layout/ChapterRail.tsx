"use client";
import { useEffect, useState } from "react";
import { chapters } from "@/components/experience/Chapter";

/** Chapter progress: vertical rail on desktop, thin bar on mobile. */
export function ChapterRail() {
  const [active, setActive] = useState(0);
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const on = () => {
      const mid = window.innerHeight * 0.45;
      let a = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top < mid) a = i;
      });
      setActive(a);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProg(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <>
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[55] h-[2px] bg-white/10 lg:hidden">
        <div className="h-full origin-left bg-plum" style={{ transform: `scaleX(${prog})` }} />
      </div>
      <nav aria-label="Capitoli" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 mix-blend-difference lg:block">
        <ol className="flex flex-col items-end gap-3">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3 py-1 text-white"
                aria-current={i === active ? "true" : undefined}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {c.name}
                </span>
                <span className={`w-4 text-right text-[10px] font-semibold transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}>{c.n}</span>
                <span className={`block h-[2px] bg-white transition-all duration-500 ${i === active ? "w-8" : "w-3 opacity-50"}`} />
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
