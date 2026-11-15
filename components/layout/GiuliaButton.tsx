"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { giulia, giuliaHref } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Pulsante flottante "Chatta con Giulia" (WhatsApp). Compare dopo il primo schermo,
 * per non coprire le call to action dell'apertura. Dichiara che Giulia è un'assistente virtuale.
 */
export function GiuliaButton() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [path]);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setOpen(true), 1200);
    const u = setTimeout(() => setOpen(false), 7200);
    return () => { clearTimeout(t); clearTimeout(u); };
  }, [show]);

  return (
    <div
      className={`fixed right-4 bottom-[92px] z-40 flex items-end gap-3 transition-all duration-700 ease-[var(--ease-lux)] lg:right-8 lg:bottom-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={`mb-1 hidden max-w-[260px] origin-bottom-right rounded-2xl rounded-br-sm border border-white/10 bg-black/90 px-4 py-3 text-white backdrop-blur-xl transition-all duration-500 sm:block ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <p className="text-[13px] leading-snug">Ciao, sono {giulia.name}. Posso darti informazioni e aiutarti a richiedere un appuntamento.</p>
        <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/60">{giulia.role} · AI</p>
      </div>
      <a
        href={giuliaHref}
        target="_blank"
        rel="noopener"
        aria-label={`Chatta su WhatsApp con ${giulia.name}, ${giulia.role.toLowerCase()} (intelligenza artificiale)`}
        className="group flex items-center gap-3 rounded-full border border-white/15 bg-plum py-2 pl-2 pr-5 text-white shadow-[0_12px_40px_-12px_rgba(132,48,100,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
      >
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-plum">
          <WhatsAppIcon className="h-6 w-6" />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-plum bg-white">
            <span className="absolute inset-0 animate-ping rounded-full bg-white motion-reduce:hidden" />
          </span>
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[14px] font-semibold">Chatta con {giulia.name}</span>
          <span className="text-[11px] text-white/75">su WhatsApp · assistente AI</span>
        </span>
      </a>
    </div>
  );
}
