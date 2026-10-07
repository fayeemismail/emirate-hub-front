import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OurVision from "@/components/about/OurVision";
import OfficeLocationMap from "@/components/about/OfficeLocationMap";
import StructuredData from "@/components/seo/StructuredData";
import {
  getAboutHeroData,
  getAboutVisionData,
  getAboutLocationData,
  getAboutSeoData,
  getGlobalSeoData,
} from "@/lib/sanity/api";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schemaOrg";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [aboutSeo, globalSeo] = await Promise.all([
    getAboutSeoData(),
    getGlobalSeoData(),
  ]);
  return generatePageMetadata(aboutSeo, globalSeo, "/about");
}

export default async function AboutPage() {
  const [heroData, visionData, locationData, globalSeo] = await Promise.all([
    getAboutHeroData(),
    getAboutVisionData(),
    getAboutLocationData(),
    getGlobalSeoData(),
  ]);

  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${siteUrl}/` },
    { name: "About Us", url: `${siteUrl}/about` },
  ]);

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about/#webpage`,
    url: `${siteUrl}/about`,
    name: "About Emirate Hub | Certified UAE Corporate Advisory & Setup",
    description: globalSeo.organizationDescription,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  return (
    <main>
      <StructuredData data={[breadcrumbSchema, aboutPageSchema]} />
      {heroData?.active !== false && <AboutHero data={heroData} />}
      {visionData?.active !== false && <OurVision data={visionData} />}
      {locationData?.active !== false && (
        <OfficeLocationMap data={locationData} />
      )}
    </main>
  );
}
