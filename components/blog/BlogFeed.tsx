"use client";

import { useState } from "react";
import BlogHero from "@/components/blog/BlogHero";
import BlogsList from "@/components/blog/BlogsList";
import blogHeroData from "@/data/blog/blogHero.json";
import blogsData from "@/data/blog/blogsData.json";

export default function BlogFeed() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      {blogHeroData.active && <BlogHero />}
      {blogsData.active && (
        <BlogsList
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}
    </>
  );
}
