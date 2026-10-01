import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import AdditionalServices from "@/components/services/AdditionalServices";
import ServicesFaq from "@/components/services/Faq";
import ServicesCta from "@/components/services/ServicesCta";
import {
  getServicesHeroData,
  getCorporateServicesData,
  getAdditionalServicesData,
  getServicesFaqData,
  getServicesCtaData,
} from "@/lib/sanity/api";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Corporate Services in Dubai & UAE | Emirate Hub",
  description:
    "Explore our complete range of corporate services in the UAE: Company Formation, Visa Services, Corporate Tax, Office Rentals, Banking, and Digital Marketing.",
};

export default async function ServicesPage() {
  const [heroData, corporateServices, additionalServices, faqData, ctaData] =
    await Promise.all([
      getServicesHeroData(),
      getCorporateServicesData(),
      getAdditionalServicesData(),
      getServicesFaqData(),
      getServicesCtaData(),
    ]);

  return (
    <main>
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
