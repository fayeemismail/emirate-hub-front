import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import AdditionalServices from "@/components/services/AdditionalServices";
import ServicesFaq from "@/components/services/Faq";
import ServicesCta from "@/components/services/ServicesCta";
import StructuredData from "@/components/seo/StructuredData";
import {
  getServicesHeroData,
  getCorporateServicesData,
  getAdditionalServicesData,
  getServicesFaqData,
  getServicesCtaData,
  getServicesSeoData,
  getGlobalSeoData,
} from "@/lib/sanity/api";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schemaOrg";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [servicesSeo, globalSeo] = await Promise.all([
    getServicesSeoData(),
    getGlobalSeoData(),
  ]);
  return generatePageMetadata(servicesSeo, globalSeo, "/services");
}

export default async function ServicesPage() {
  const [
    heroData,
    corporateServices,
    additionalServices,
    faqData,
    ctaData,
    globalSeo,
  ] = await Promise.all([
    getServicesHeroData(),
    getCorporateServicesData(),
    getAdditionalServicesData(),
    getServicesFaqData(),
    getServicesCtaData(),
    getGlobalSeoData(),
  ]);

  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${siteUrl}/` },
    { name: "Services", url: `${siteUrl}/services` },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/services/#webpage`,
    url: `${siteUrl}/services`,
    name: "Corporate Services & Solutions | Emirate Hub Dubai",
    description: globalSeo.defaultMetaDescription,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#organization`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: (corporateServices || []).map((srv: any, idx: number) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: srv.title,
        url: `${siteUrl}/services/${srv.slug || srv.id}`,
      })),
    },
  };

  return (
    <main>
      <StructuredData data={[breadcrumbSchema, collectionSchema]} />
      <ServicesHero data={heroData as any} />
      <ServicesList services={corporateServices} />
      {(additionalServices as any)?.active !== false && (
        <AdditionalServices data={additionalServices} />
      )}
      {(faqData as any)?.active !== false && <ServicesFaq data={faqData} />}
      {ctaData?.active !== false && <ServicesCta data={ctaData} />}
    </main>
  );
}
