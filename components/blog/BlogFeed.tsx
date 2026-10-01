"use client";

import { useState } from "react";
import BlogHero from "@/components/blog/BlogHero";
import BlogsList from "@/components/blog/BlogsList";
import { BlogHeroData } from "@/types/blog/blogHero";
import { BlogsPageData } from "@/types/blog/blog";

interface BlogFeedProps {
  heroData: BlogHeroData;
  blogsData: BlogsPageData;
}

export default function BlogFeed({ heroData, blogsData }: BlogFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      {heroData?.active !== false && <BlogHero data={heroData} />}
      {blogsData?.active !== false && (
        <BlogsList
          data={blogsData}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}
    </>
  );
}
