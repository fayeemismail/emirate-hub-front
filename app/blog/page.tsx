import type { Metadata } from "next";
import BlogFeed from "@/components/blog/BlogFeed";
import StructuredData from "@/components/seo/StructuredData";
import {
  getBlogHeroData,
  getBlogPageData,
  getBlogSeoData,
  getGlobalSeoData,
} from "@/lib/sanity/api";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schemaOrg";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [blogSeo, globalSeo] = await Promise.all([
    getBlogSeoData(),
    getGlobalSeoData(),
  ]);
  return generatePageMetadata(blogSeo, globalSeo, "/blog");
}

export default async function BlogPage() {
  const [heroData, blogsData, globalSeo] = await Promise.all([
    getBlogHeroData(),
    getBlogPageData(),
    getGlobalSeoData(),
  ]);

  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${siteUrl}/` },
    { name: "Blog", url: `${siteUrl}/blog` },
  ]);

  const blogListingSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/blog/#blog`,
    url: `${siteUrl}/blog`,
    name: "Business Insights & Advisory Blog | Emirate Hub Dubai",
    description: globalSeo.defaultMetaDescription,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    blogPost: (blogsData.blogs || []).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug || post.id}`,
      datePublished: post.date,
    })),
  };

  return (
    <main>
      <StructuredData data={[breadcrumbSchema, blogListingSchema]} />
      <BlogFeed heroData={heroData} blogsData={blogsData} />
    </main>
  );
}
