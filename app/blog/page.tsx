import type { Metadata } from "next";
import BlogFeed from "@/components/blog/BlogFeed";
import { getBlogHeroData, getBlogPageData } from "@/lib/sanity/api";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blogs & News | Emirate Hub Dubai",
  description:
    "Expert insights on UAE company setup, VAT compliance, corporate tax regulations, mainland vs free zone comparisons, and business growth in Dubai.",
};

export default async function BlogPage() {
  const [heroData, blogsData] = await Promise.all([
    getBlogHeroData(),
    getBlogPageData(),
  ]);

  return (
    <main>
      <BlogFeed heroData={heroData} blogsData={blogsData} />
    </main>
  );
}
