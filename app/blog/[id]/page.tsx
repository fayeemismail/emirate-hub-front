import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/blog/BlogDetail";
import StructuredData from "@/components/seo/StructuredData";
import { getBlogPageData, getBlogPostBySlug, getGlobalSeoData } from "@/lib/sanity/api";
import { buildBreadcrumbSchema, buildArticleSchema } from "@/lib/seo/schemaOrg";

export const revalidate = 60;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const data = await getBlogPageData();
  if (!data?.blogs) return [];
  return data.blogs
    .filter((blog) => blog.active !== false && blog.id)
    .map((blog) => ({
      id: blog.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const [blog, globalSeo] = await Promise.all([
    getBlogPostBySlug(id),
    getGlobalSeoData(),
  ]);

  if (!blog) {
    return {
      title: "Article Not Found | Emirate Hub",
    };
  }

  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const postSlug = blog.slug || id;
  const canonicalUrl = `${siteUrl}/blog/${postSlug}`;

  return {
    title: `${blog.title} | Emirate Hub Dubai`,
    description: blog.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: canonicalUrl,
      images: blog.image ? [{ url: blog.image, alt: blog.title }] : [],
      type: "article",
      publishedTime: blog.date,
      authors: blog.author ? [blog.author.name] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.image ? [blog.image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const [blog, data, globalSeo] = await Promise.all([
    getBlogPostBySlug(id),
    getBlogPageData(),
    getGlobalSeoData(),
  ]);

  if (!blog) {
    notFound();
  }

  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const postSlug = blog.slug || id;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: `${siteUrl}/` },
    { name: "Blog", url: `${siteUrl}/blog` },
    { name: blog.title, url: `${siteUrl}/blog/${postSlug}` },
  ]);

  const articleSchema = buildArticleSchema(blog, globalSeo);

  const relatedBlogs = (data.blogs || [])
    .filter((item) => item.id !== blog.id && item.active !== false)
    .slice(0, 3);

  return (
    <main>
      <StructuredData data={[breadcrumbSchema, articleSchema]} />
      <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
    </main>
  );
}
