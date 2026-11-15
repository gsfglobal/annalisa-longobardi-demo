import Link from "next/link";
import { asset } from "@/lib/asset";
import { contacts, doctor, locations, nav, social } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black pb-28 pt-20 lg:pb-12">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/media/logo-640.png")} alt="Annalisa Longobardi" width={640} height={294} loading="lazy" className="h-16 w-auto" />
            <p className="mt-6 max-w-xs text-[14px] leading-6 text-white/70">{doctor.fullName} — {doctor.title}</p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="kicker text-white/50">Sito</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-plum">{n.label}</Link></li>)}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className="kicker text-white/50">Sedi</p>
            <ul className="mt-4 space-y-3 text-[14px] leading-6 text-white/85">
              {locations.map((l) => (
                <li key={l.slug}><span className="font-semibold text-white">{l.city}</span> — {l.address}{!l.confirmed && <span className="text-white/50"> (da confermare)</span>}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="kicker text-white/50">Contatti</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li><a href={contacts.phoneHref} className="hover:text-plum">{contacts.phoneLabel}</a></li>
              <li><a href={contacts.whatsappHref} target="_blank" rel="noopener" className="hover:text-plum">WhatsApp {contacts.whatsappLabel}</a></li>
              <li><a href={contacts.emailHref} className="break-all hover:text-plum">{contacts.email}</a></li>
              <li className="flex gap-4 pt-2"><a href={social.instagram.href} target="_blank" rel="noopener" className="hover:text-plum">Instagram</a><a href={social.tiktok.href} target="_blank" rel="noopener" className="hover:text-plum">TikTok</a></li>
            </ul>
          </div>
        </div>
        <p aria-hidden="true" className="mega mt-20 select-none text-center text-[13.5vw] leading-[0.8] text-white/[0.06]">Pazzesco</p>
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-white/55 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {doctor.fullName} · P.IVA {doctor.vat} · Iscrizione Albo: <em>da inserire</em></p>
          <p className="flex gap-5"><Link href="/privacy-policy/" className="hover:text-white">Privacy Policy</Link><Link href="/cookie-policy/" className="hover:text-white">Cookie Policy</Link><span>Demo Dental Go — non pubblicata</span></p>
        </div>
      </div>
    </footer>
  );
}
