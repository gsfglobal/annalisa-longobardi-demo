import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";
// DEMO: indicizzazione disattivata finché il sito non viene approvato e pubblicato.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
