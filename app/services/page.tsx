import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import AdditionalServices from "@/components/services/AdditionalServices";
import ServicesFaq from "@/components/services/Faq";
import ServicesCta from "@/components/services/ServicesCta";
import additionalServicesData from "@/data/service/additionalServices.json";
import faqData from "@/data/service/faq.json";

export const metadata: Metadata = {
  title: "Corporate Services in Dubai & UAE | Emirate Hub",
  description:
    "Explore our complete range of corporate services in the UAE: Company Formation, Visa Services, Corporate Tax, Office Rentals, Banking, and Digital Marketing.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesList />
      {additionalServicesData.active && <AdditionalServices />}
      {faqData.active && <ServicesFaq />}
      <ServicesCta />
    </main>
  );
}




