import { ContactForm } from "@/components/ui/ContactForm";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { contacts, whatsappLink } from "@/lib/site";
import { ThreeCities } from "@/components/experience/ThreeCities";

export function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-black pb-20 pt-32 md:pt-44">
        <div className="wrap relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker text-white/70">Contatti</p>
            <h1 className="mega mt-6 text-[clamp(48px,7vw,112px)]">Il tuo sorriso <span className="accent">pazzesco</span> inizia qui.</h1>
            <div className="mt-10 grid gap-2">
              <a href={whatsappLink("Buongiorno, vorrei prenotare una visita.")} target="_blank" rel="noopener" className="pill pill-plum justify-between"><span className="flex items-center gap-3"><WhatsAppIcon /> WhatsApp</span><span>{contacts.whatsappLabel}</span></a>
              <a href={contacts.phoneHref} className="pill pill-line justify-between"><span>Telefono</span><span>{contacts.phoneLabel}</span></a>
              <a href={contacts.emailHref} className="pill pill-line justify-between normal-case tracking-normal"><span className="uppercase tracking-[0.16em]">Email</span><span className="truncate">{contacts.email}</span></a>
              <a href={contacts.bookingHref} target="_blank" rel="noopener" className="pill pill-line justify-between"><span>Prenotazione online</span><span>MioDottore ↗</span></a>
            </div>
            <p className="mt-6 text-[14px] text-white/70">Napoli: {contacts.hours}</p>
          </div>
          <div className="on-light lg:col-span-6 lg:col-start-7">
            <div className="rounded-[28px] bg-pearl p-6 text-black md:p-10">
              <p className="mega text-[34px]">Richiedi un appuntamento</p>
              <p className="mt-3 text-[15px] leading-7 text-ink/85">Compila i campi: prepariamo un messaggio WhatsApp già scritto da inviare alla segreteria. Nessun dato viene salvato.</p>
              <div className="mt-8"><ContactForm /></div>
            </div>
          </div>
        </div>
      </section>
      <ThreeCities />
    </>
  );
}
