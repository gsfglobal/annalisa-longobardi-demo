import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { RevealObserver } from "@/components/ui/Reveal";
import { HomePage } from "@/components/pages/HomePage";
import { AboutPage } from "@/components/pages/AboutPage";
import { StudioPage } from "@/components/pages/StudioPage";
import { TreatmentsPage } from "@/components/pages/TreatmentsPage";
import { TreatmentDetailPage } from "@/components/pages/TreatmentDetailPage";
import { LocationsPage } from "@/components/pages/LocationsPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { LegalPage } from "@/components/pages/LegalPage";
import { StudioExperiencePage } from "@/components/pages/StudioExperiencePage";
import { usePathname } from "next/navigation";
import { treatments } from "@/lib/site";

const titles: Record<string, string> = {
  "/": "Dott.ssa Annalisa Longobardi — Il tuo sorriso pazzesco",
  "/chi-sono/": "Chi sono",
  "/studio/": "Lo studio a Napoli",
  "/studio/experience/": "The Studio — esperienza 3D",
  "/trattamenti/": "Trattamenti",
  "/sedi/": "Sedi",
  "/contatti/": "Contatti e prenotazioni",
};

function Route({ path }: { path: string }) {
  if (path === "/chi-sono/") return <AboutPage />;
  if (path === "/studio/") return <StudioPage />;
  if (path === "/studio/experience/") return <StudioExperiencePage />;
  if (path === "/trattamenti/") return <TreatmentsPage />;
  if (path === "/sedi/") return <LocationsPage />;
  if (path === "/contatti/") return <ContactPage />;
  if (path === "/privacy-policy/") return <LegalPage kind="privacy" />;
  if (path === "/cookie-policy/") return <LegalPage kind="cookie" />;
  const m = path.match(/^\/trattamenti\/([^/]+)\/$/);
  if (m && treatments.some((t) => t.slug === m[1] && t.detail)) return <TreatmentDetailPage slug={m[1]} />;
  return <HomePage />;
}

function App() {
  const path = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = titles[path];
    document.title = t && path !== "/" ? `${t} · Dott.ssa Annalisa Longobardi` : titles["/"];
  }, [path]);
  return (
    <>
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-white focus:px-4 focus:py-3 focus:text-black">
        Vai al contenuto
      </a>
      <Header />
      <main id="main" tabIndex={-1} key={path} className="page-in">
        <Route path={path} />
      </main>
      <Footer />
      <MobileCTA />
      <RevealObserver />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
