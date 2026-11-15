import { TreatmentsPage } from "@/components/pages/TreatmentsPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/trattamenti/", "Trattamenti", "Invisalign, faccette, sbiancamento, ortodonzia, gnatologia, pedodonzia, implantologia, protesi e igiene: tutti i trattamenti dello studio a Napoli.");
export default function Page() { return <TreatmentsPage />; }
