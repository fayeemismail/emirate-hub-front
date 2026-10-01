import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/blog/BlogDetail";
import { getBlogPageData, getBlogPostBySlug } from "@/lib/sanity/api";

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
  const blog = await getBlogPostBySlug(id);

  if (!blog) {
    return {
      title: "Article Not Found | Emirate Hub",
    };
  }

  return {
    title: `${blog.title} | Emirate Hub Dubai`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.image ? [blog.image] : [],
      type: "article",
      publishedTime: blog.date,
      authors: blog.author ? [blog.author.name] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const [blog, data] = await Promise.all([
    getBlogPostBySlug(id),
    getBlogPageData(),
  ]);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = (data.blogs || [])
    .filter((item) => item.id !== blog.id && item.active !== false)
    .slice(0, 3);

  return (
    <main>
      <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
    </main>
  );
}
