import type { MetadataRoute } from "next";
import {
  getGlobalSeoData,
  getSitemapServices,
  getSitemapBlogs,
} from "@/lib/sanity/api";
import { getAllServices } from "@/lib/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [globalSeo, sanityServices, sanityBlogs] = await Promise.all([
    getGlobalSeoData(),
    getSitemapServices(),
    getSitemapBlogs(),
  ]);

  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const now = new Date();

  // Static public routes (strictly excluding admin, studio, api, and internal test routes)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Dynamic corporate services
  const fallbackServices = getAllServices();
  const serviceList =
    sanityServices.length > 0
      ? sanityServices
      : fallbackServices.map((s) => ({ slug: s.id, _updatedAt: undefined }));

  const serviceRoutes: MetadataRoute.Sitemap = serviceList.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: service._updatedAt ? new Date(service._updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic blog articles
  const blogRoutes: MetadataRoute.Sitemap = sanityBlogs.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: blog._updatedAt
      ? new Date(blog._updatedAt)
      : blog.date
      ? new Date(blog.date)
      : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
