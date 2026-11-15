"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { contacts } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function MobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.9);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`fixed inset-x-3 bottom-3 z-40 transition-transform duration-700 ease-[var(--ease-lux)] lg:hidden ${show ? "translate-y-0" : "translate-y-[140%]"}`}>
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/85 p-1.5 pb-[max(6px,env(safe-area-inset-bottom))] backdrop-blur-xl">
        <Link href="/contatti/" className="pill pill-plum flex-1 !min-h-12">Prenota una visita</Link>
        <a href={contacts.whatsappHref} target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25"><WhatsAppIcon className="h-5 w-5" /></a>
        <a href={contacts.phoneHref} aria-label={`Chiama ${contacts.phoneLabel}`} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
        </a>
      </div>
    </div>
  );
}
