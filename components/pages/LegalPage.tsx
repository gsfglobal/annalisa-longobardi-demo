import { InnerHero } from "./InnerHero";

export function LegalPage({ kind }: { kind: "privacy" | "cookie" }) {
  const title = kind === "privacy" ? "Privacy Policy" : "Cookie Policy";
  return (
    <>
      <InnerHero kicker="Informazioni legali" title={title} />
      <section className="bg-black pb-24">
        <div className="wrap max-w-3xl">
          <p className="tag text-plum">Testo da redigere</p>
          <p className="body mt-6 text-white/80">
            Segnaposto della demo. Il testo definitivo della {title} deve essere redatto e validato dal titolare del trattamento, con un
            consulente privacy, secondo il GDPR (Reg. UE 2016/679), il D.Lgs. 196/2003 e le Linee guida del Garante. La demo non
            installa cookie di profilazione né strumenti di tracciamento.
          </p>
        </div>
      </section>
    </>
  );
}
