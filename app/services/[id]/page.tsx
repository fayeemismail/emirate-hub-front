import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllServices,
  getServiceById,
  getRelatedServices,
} from "@/lib/services";
import { getCorporateServiceBySlug, getGlobalSeoData } from "@/lib/sanity/api";
import ServiceDetail from "@/components/services/ServiceDetail";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/seo/schemaOrg";

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
  const [sanityService, globalSeo] = await Promise.all([
    getCorporateServiceBySlug(id),
    getGlobalSeoData(),
  ]);
  const service = sanityService || getServiceById(id);

  if (!service) {
    return {
      title: "Service Not Found | Emirate Hub",
    };
  }

  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const serviceSlug = (service as any).slug || service.id || id;
  const canonicalUrl = `${siteUrl}/services/${serviceSlug}`;

  return {
    title: `${service.title} | Emirate Hub Dubai`,
    description: service.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.title} | Emirate Hub Corporate Services`,
      description: service.description,
      url: canonicalUrl,
      images: service.image ? [{ url: service.image, alt: service.title }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Emirate Hub`,
      description: service.description,
      images: service.image ? [service.image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [sanityService, globalSeo] = await Promise.all([
    getCorporateServiceBySlug(id),
    getGlobalSeoData(),
  ]);
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

  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const serviceSlug = (service as any).slug || service.id || id;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${siteUrl}/` },
    { name: "Services", url: `${siteUrl}/services` },
    { name: service.title, url: `${siteUrl}/services/${serviceSlug}` },
  ]);

  const serviceSchema = buildServiceSchema(service, globalSeo);
  const relatedServices = getRelatedServices(id, 3);

  return (
    <main>
      <StructuredData data={[breadcrumbSchema, serviceSchema]} />
      <ServiceDetail service={service as any} relatedServices={relatedServices} />
    </main>
  );
}
