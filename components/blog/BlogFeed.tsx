"use client";

import { useState } from "react";
import BlogHero from "@/components/blog/BlogHero";
import BlogsList from "@/components/blog/BlogsList";
import blogHeroData from "@/data/blog/blogHero.json";
import blogsData from "@/data/blog/blogsData.json";

export default function BlogFeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      {blogHeroData.active && (
        <BlogHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}
      {blogsData.active && (
        <BlogsList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}
    </>
  );
}
