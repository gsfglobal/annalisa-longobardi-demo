import { LocationsPage } from "@/components/pages/LocationsPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/sedi/", "Sedi", "Le sedi dello studio della Dott.ssa Annalisa Longobardi: Napoli, Piazza Medaglie d'Oro 27.");
export default function Page() { return <LocationsPage />; }
