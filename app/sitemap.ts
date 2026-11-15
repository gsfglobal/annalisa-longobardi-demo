import type { MetadataRoute } from "next";
import { SITE_URL, treatments } from "@/lib/site";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/chi-sono/", "/studio/", "/studio/experience/", "/trattamenti/", "/sedi/", "/contatti/", ...treatments.filter((t) => t.detail).map((t) => `/trattamenti/${t.slug}/`)];
  return paths.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
