import type { Metadata } from "next";
import { PageSeoData, GlobalSeoData } from "@/types/seo";

export function generatePageMetadata(
  pageSeo: PageSeoData,
  globalSeo: GlobalSeoData,
  fallbackRoute: string
): Metadata {
  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const rawCanonical = pageSeo.canonicalUrl || `${siteUrl}${fallbackRoute}`;
  const canonical = rawCanonical.startsWith("http") ? rawCanonical : `${siteUrl}${rawCanonical}`;

  const title = pageSeo.seoTitle || globalSeo.defaultSeoTitle || "Emirate Hub";
  const description = pageSeo.metaDescription || globalSeo.defaultMetaDescription;
  const keywords = pageSeo.keywords && pageSeo.keywords.length > 0 ? pageSeo.keywords : globalSeo.defaultKeywords;

  const ogTitle = pageSeo.ogTitle || title;
  const ogDescription = pageSeo.ogDescription || description;
  const ogImage = pageSeo.ogImage || globalSeo.defaultOgImage;
  const ogImageAlt = pageSeo.ogImageAlt || globalSeo.defaultOgImageAlt || title;

  const twitterCard = (pageSeo.twitterCardType || globalSeo.twitterCardType || "summary_large_image") as "summary" | "summary_large_image";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: globalSeo.siteName || "Emirate Hub",
      locale: globalSeo.locale || "en_AE",
      type: "website",
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: ogImageAlt,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
    twitter: {
      card: twitterCard,
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: !pageSeo.noIndex,
      follow: !pageSeo.noFollow,
      googleBot: {
        index: !pageSeo.noIndex,
        follow: !pageSeo.noFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
