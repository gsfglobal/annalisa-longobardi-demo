import { HomePage } from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/", "Dott.ssa Annalisa Longobardi — Il tuo sorriso pazzesco", "Odontoiatra specialista in Ortognatodonzia a Napoli. Invisalign, faccette dentali, sbiancamento e ortodonzia per adulti e bambini.");
export default function Page() { return <HomePage />; }
