import type { Metadata } from "next";
import BlogsAndNews from "@/components/home/BlogsAndNews";
import ContactUs from "@/components/home/ContactUs";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import PriceCards from "@/components/home/PriceCards";
import Service from "@/components/home/Service";
import StructuredData from "@/components/seo/StructuredData";
// import Testimonials from "@/components/home/Testimonials";

import {
  getHomeHeroData,
  getHomePricingData,
  getHomeServicesData,
  getHomeContactData,
  getHomeBlogSectionData,
  getHomeFaqData,
  getServicesSelectOptions,
  getHomeSeoData,
  getGlobalSeoData,
} from "@/lib/sanity/api";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [homeSeo, globalSeo] = await Promise.all([
    getHomeSeoData(),
    getGlobalSeoData(),
  ]);
  return generatePageMetadata(homeSeo, globalSeo, "/");
}

export default async function Home() {
  const [
    heroData,
    pricingData,
    serviceData,
    contactData,
    blogData,
    faqData,
    serviceOptions,
    globalSeo,
  ] = await Promise.all([
    getHomeHeroData(),
    getHomePricingData(),
    getHomeServicesData(),
    getHomeContactData(),
    getHomeBlogSectionData(),
    getHomeFaqData(),
    getServicesSelectOptions(),
    getGlobalSeoData(),
  ]);

  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: `${siteUrl}/`,
    name: "Emirate Hub | Business Setup & Company Formation Dubai, UAE",
    description: globalSeo.defaultMetaDescription,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  return (
    <main>
      <StructuredData data={webPageSchema} />
      {heroData?.active !== false && <Hero data={heroData} />}
      {pricingData?.active !== false && <PriceCards data={pricingData} />}
      {serviceData?.active !== false && <Service data={serviceData} />}
      {contactData?.active !== false && (
        <ContactUs data={contactData} serviceOptions={serviceOptions} />
      )}
      {/* Testimonials remains commented until active */}
      {blogData?.active !== false && <BlogsAndNews data={blogData} />}
      {faqData?.active !== false && <Faq data={faqData} />}
    </main>
  );
}
