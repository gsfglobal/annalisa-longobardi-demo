import { notFound } from "next/navigation";
import { TreatmentDetailPage } from "@/components/pages/TreatmentDetailPage";
import { pageMeta } from "@/lib/seo";
import { treatments } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return treatments.filter((t) => t.detail).map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = treatments.find((x) => x.slug === slug);
  if (!t) return {};
  return pageMeta(`/trattamenti/${t.slug}/`, `${t.name} a Napoli`, `${t.short} Studio della Dott.ssa Annalisa Longobardi, Napoli.`);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!treatments.some((t) => t.slug === slug && t.detail)) notFound();
  return <TreatmentDetailPage slug={slug} />;
}
