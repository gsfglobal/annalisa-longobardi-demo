import { StudioExperiencePage } from "@/components/pages/StudioExperiencePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "/studio/experience/",
  "The Studio — esperienza 3D",
  "Esplora in 3D la reception, una sala operativa e l'ufficio dello studio della Dott.ssa Annalisa Longobardi a Napoli. Ricostruzione digitale dimostrativa."
);
export default function Page() {
  return <StudioExperiencePage />;
}
