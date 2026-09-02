import type { Metadata } from "next";
import BlogFeed from "@/components/blog/BlogFeed";
import ServicesCta from "@/components/services/ServicesCta";

export const metadata: Metadata = {
  title: "Blogs & News | Emirate Hub Dubai",
  description:
    "Expert insights on UAE company setup, VAT compliance, corporate tax regulations, mainland vs free zone comparisons, and business growth in Dubai.",
};

export default function BlogPage() {
  return (
    <main>
      <BlogFeed />
      {/* <ServicesCta /> */}
    </main>
  );
}
