import { ContactPage } from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/contatti/", "Contatti e prenotazioni", "Prenota una visita: telefono 081 5453461, WhatsApp, email. Studio in Piazza Medaglie d'Oro 27, Napoli.");
export default function Page() { return <ContactPage />; }
