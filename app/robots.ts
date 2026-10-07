import type { MetadataRoute } from "next";
import { getGlobalSeoData } from "@/lib/sanity/api";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const globalSeo = await getGlobalSeoData();
  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const disallowed = globalSeo.disallowedPaths || ["/studio", "/api/", "/coming-soon"];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disallowed,
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}