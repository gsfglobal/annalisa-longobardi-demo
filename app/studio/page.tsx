import { StudioPage } from "@/components/pages/StudioPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/studio/", "Lo studio a Napoli", "Lo studio della Dott.ssa Longobardi in Piazza Medaglie d'Oro a Napoli: ambienti accoglienti, sale operative moderne e impronta digitale.");
export default function Page() { return <StudioPage />; }
