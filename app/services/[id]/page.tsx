import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllServices,
  getServiceById,
  getRelatedServices,
} from "@/lib/services";
import { getCorporateServiceBySlug } from "@/lib/sanity/api";
import ServiceDetail from "@/components/services/ServiceDetail";

export const revalidate = 60;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const sanityService = await getCorporateServiceBySlug(id);
  const service = sanityService || getServiceById(id);

  if (!service) {
    return {
      title: "Service Not Found | Emirate Hub",
    };
  }

  return {
    title: `${service.title} | Emirate Hub Dubai`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Emirate Hub Corporate Services`,
      description: service.description,
      images: service.image ? [service.image] : [],
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const sanityService = await getCorporateServiceBySlug(id);
  const fallbackService = getServiceById(id);

  const service = sanityService
    ? {
        ...fallbackService,
        ...sanityService,
        timeline: fallbackService?.timeline || "2 - 5 Business Days",
        jurisdiction:
          fallbackService?.jurisdiction || "Dubai Mainland & Free Zones",
        steps: fallbackService?.steps || [],
      }
    : fallbackService;

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(id, 3);

  return (
    <main>
      <ServiceDetail service={service as any} relatedServices={relatedServices} />
    </main>
  );
}
