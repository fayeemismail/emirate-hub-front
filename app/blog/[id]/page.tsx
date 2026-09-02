import type { Metadata } from "next";
import { notFound } from "next/navigation";
import rawBlogsData from "@/data/blog/blogsData.json";
import { BlogsPageData } from "@/types/blog/blog";
import BlogDetail from "@/components/blog/BlogDetail";
import ServicesCta from "@/components/services/ServicesCta";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const data: BlogsPageData = rawBlogsData as BlogsPageData;
  if (!data?.blogs) return [];
  return data.blogs
    .filter((blog) => blog.active)
    .map((blog) => ({
      id: blog.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const data: BlogsPageData = rawBlogsData as BlogsPageData;
  const blog = data.blogs.find((b) => b.id === id && b.active);

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
  const data: BlogsPageData = rawBlogsData as BlogsPageData;
  const blog = data.blogs.find((b) => b.id === id && b.active);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = data.blogs
    .filter((b) => b.id !== id && b.active)
    .slice(0, 3);

  return (
    <main>
      <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
      {/* <ServicesCta /> */}
    </main>
  );
}
