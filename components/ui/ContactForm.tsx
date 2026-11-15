"use client";
import Link from "next/link";
import { useState } from "react";
import { treatments, whatsappLink } from "@/lib/site";

/**
 * Modulo di richiesta appuntamento.
 * Nessun dato viene inviato a server: alla conferma prepara un messaggio WhatsApp
 * precompilato che il paziente invia di persona (comportamento reale, senza backend).
 */
export function ContactForm() {
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get("nome") || "").trim();
    const motivo = String(f.get("motivo") || "");
    const quando = String(f.get("quando") || "");
    const note = String(f.get("note") || "").trim();
    if (!nome || !f.get("privacy")) {
      setError("Inserisci il tuo nome e accetta l'informativa privacy per continuare.");
      return;
    }
    setError(null);
    const text = [
      `Buongiorno, sono ${nome}.`,
      `Vorrei prenotare una visita${motivo ? ` per: ${motivo}` : ""}.`,
      quando ? `Preferenza: ${quando}.` : "",
      note ? `Note: ${note}` : "",
    ]
      .filter(Boolean)
      .join(" ");
    setSent(whatsappLink(text));
  }

  if (sent) {
    return (
      <div className="rounded-[28px] bg-white p-8 text-black md:p-10" role="status">
        <p className="font-serif text-[34px] font-light leading-tight text-black">Il tuo messaggio è pronto.</p>
        <p className="mt-4 text-[15px] leading-7 text-ink">
          Aprilo su WhatsApp e invialo: la segreteria ti risponderà negli orari di apertura per confermare l&apos;appuntamento.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={sent} target="_blank" rel="noopener" className="pill pill-plum"><span>Apri WhatsApp e invia</span></a>
          <button type="button" onClick={() => setSent(null)} className="pill pill-line-dark"><span>Modifica</span></button>
        </div>
      </div>
    );
  }

  const field = "mt-2 w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-ink/50 focus:border-plum focus:outline-none focus:ring-0";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <label className="block">
          <span className="kicker text-ink">Nome e cognome *</span>
          <input name="nome" autoComplete="name" required className={field} placeholder="Come ti chiami?" />
        </label>
        <label className="block">
          <span className="kicker text-ink">Motivo della visita</span>
          <select name="motivo" className={field} defaultValue="">
            <option value="">Prima visita / consulenza</option>
            {treatments.map((t) => (
              <option key={t.slug} value={t.name}>{t.name}</option>
            ))}
          </select>
        </label>
      </div>
      <fieldset>
        <legend className="kicker text-ink">Preferenza oraria</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Mattina", "Pomeriggio", "Indifferente"].map((q) => (
            <label key={q} className="cursor-pointer">
              <input type="radio" name="quando" value={q} className="peer sr-only" />
              <span className="inline-block border border-ink/25 px-5 py-3 text-[13px] uppercase tracking-[0.16em] text-ink transition rounded-full peer-checked:border-plum peer-checked:bg-plum peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-plum">
                {q}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="kicker text-ink">Note (facoltative)</span>
        <textarea name="note" rows={3} className={field} placeholder="Non inserire dati sanitari: ne parleremo in visita." />
      </label>
      <label className="flex items-start gap-3 text-[14px] leading-6 text-ink">
        <input type="checkbox" name="privacy" required className="mt-1 h-4 w-4 accent-[#843064]" />
        <span>
          Ho letto l&apos;<Link href="/privacy-policy/" className="underline underline-offset-4">informativa privacy</Link> e acconsento a essere ricontattato per la mia richiesta. *
        </span>
      </label>
      {error && <p role="alert" className="text-[14px] text-plum">{error}</p>}
      <button type="submit" className="pill pill-plum w-full !whitespace-normal text-center sm:w-auto"><span>Prepara la richiesta su WhatsApp</span></button>
    </form>
  );
}
