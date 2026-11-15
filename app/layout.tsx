import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { RevealObserver } from "@/components/ui/Reveal";
import { SITE_URL } from "@/lib/site";
import { BASE } from "@/lib/asset";

const IS_DEMO = BASE !== "";
import { dentistJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Dott.ssa Annalisa Longobardi — Il tuo sorriso pazzesco", template: "%s · Dott.ssa Annalisa Longobardi" },
  description:
    "Odontoiatra specialista in Ortognatodonzia a Napoli. Invisalign, faccette dentali, sbiancamento e ortodonzia per adulti e bambini.",
  // copia demo (GitHub Pages): fuori dai motori di ricerca, non deve competere col sito reale
  ...(IS_DEMO ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-white focus:rounded-full focus:px-4 focus:py-3 focus:text-black">
          Vai al contenuto
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCTA />
        <RevealObserver />
        {!IS_DEMO && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistJsonLd()) }} />}
      </body>
    </html>
  );
}
