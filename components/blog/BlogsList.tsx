"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiClock,
  FiCalendar,
  FiArrowRight,
  FiShare2,
  FiFilter,
  FiBookOpen,
  FiCheckCircle,
} from "react-icons/fi";
import rawBlogsData from "@/data/blog/blogsData.json";
import { BlogsPageData, BlogItem } from "@/types/blog/blog";

interface BlogsListProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
}

export default function BlogsList({
  selectedCategory = "all",
  onSelectCategory,
  searchQuery = "",
}: BlogsListProps) {
  const router = useRouter();
  const data: BlogsPageData = rawBlogsData as BlogsPageData;

  const [internalCategory, setInternalCategory] = useState<string>(selectedCategory);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [highlightedBlogId, setHighlightedBlogId] = useState<string | null>(null);

  // Sync internal category with prop if provided
  useEffect(() => {
    setInternalCategory(selectedCategory);
  }, [selectedCategory]);

  // Filter only active blogs
  const activeBlogs = useMemo(() => {
    if (!data?.blogs) return [];
    return data.blogs.filter((blog) => blog.active);
  }, [data?.blogs]);

  // Filtered blogs based on Category and Search
  const filteredBlogs = useMemo(() => {
    let list = activeBlogs;

    // Filter by Category
    if (internalCategory && internalCategory !== "all") {
      list = list.filter((b) => b.category === internalCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags?.some((t) => t.toLowerCase().includes(q)) ||
          b.sections?.some((s) =>
            s.paragraphs.some((p) => p.toLowerCase().includes(q))
          )
      );
    }

    return list;
  }, [activeBlogs, internalCategory, searchQuery]);

  // Handle Hash Deep-Linking & Smooth Scroll from Home Page
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const targetId = window.location.hash.replace("#", "");
        const matchedBlog = activeBlogs.find((b) => b.id === targetId);

        if (matchedBlog) {
          // Ensure category matches if target belongs to a specific category
          if (internalCategory !== "all" && matchedBlog.category !== internalCategory) {
            setInternalCategory("all");
            if (onSelectCategory) onSelectCategory("all");
          }

          setHighlightedBlogId(targetId);

          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              const navOffset = 110;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - navOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }, 250);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [activeBlogs, internalCategory, onSelectCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setInternalCategory(categoryId);
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };

  const handleShare = (e: React.MouseEvent, blogId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/blog/${blogId}`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedId(blogId);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  // Only render if blogs section is active and has active blogs
  if (!data || !data.active || activeBlogs.length === 0) {
    return null;
  }

  // Identify featured blog for prominent hero display when browsing 'all' and without active search query
  const featuredBlog =
    internalCategory === "all" && !searchQuery.trim()
      ? filteredBlogs.find((b) => b.featured) || filteredBlogs[0]
      : null;

  const standardBlogs = featuredBlog
    ? filteredBlogs.filter((b) => b.id !== featuredBlog.id)
    : filteredBlogs;

  return (
    <section id="blogs-feed" className="py-16 sm:py-20 md:py-28 bg-[#F8FAFC] text-gray-900">
      <div className="site-container">
        {/* Category Filter Pills - Only rendered if categories exist */}
        {data.categories && data.categories.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 gap-2 sm:gap-3 no-scrollbar">
              {data.categories.map((cat) => {
                const isActive = internalCategory === cat.id;
                // Count active articles in this category
                const count =
                  cat.id === "all"
                    ? activeBlogs.length
                    : activeBlogs.filter((b) => b.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 border cursor-pointer select-none ${
                      isActive
                        ? "bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-900/10 scale-105"
                        : "bg-white text-gray-600 border-gray-200/80 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50 shadow-xs"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Search Feedback Banner */}
        {searchQuery.trim() && (
          <div className="mb-8 flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-gray-200/80 shadow-xs">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FiFilter className="w-4 h-4 text-primary" />
              <span>
                Found <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? "article" : "articles"} matching "<strong>{searchQuery}</strong>"
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className="text-xs text-primary font-semibold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <FiBookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              We couldn't find any articles matching your search query or selected category filter.
            </p>
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className="px-6 py-3 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#c8191e] transition-all cursor-pointer"
            >
              Show All Articles
            </button>
          </div>
        )}

        {/* Prominent Editorial Featured Article (Top Card) */}
        {featuredBlog && (
          <div className="mb-10 sm:mb-14">
            <Link
              id={featuredBlog.id}
              href={`/blog/${featuredBlog.id}`}
              className={`group relative bg-white rounded-3xl sm:rounded-[2rem] border transition-all duration-500 overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12 items-center block scroll-mt-32 ${
                highlightedBlogId === featuredBlog.id
                  ? "border-primary/50 shadow-2xl ring-2 ring-primary/30"
                  : "border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-2xl"
              }`}
            >
              {/* Featured Image */}
              {featuredBlog.image && (
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-full min-h-[320px] lg:min-h-[440px] lg:col-span-7 overflow-hidden bg-gray-100">
                  <Image
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Pill on Image */}
                  {featuredBlog.category && (
                    <div className="absolute top-5 left-5 z-10">
                      <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase border border-white/20">
                        {featuredBlog.category.replace("-", " ")}
                      </span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  <div className="absolute bottom-5 left-5 z-10">
                    <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold tracking-widest uppercase shadow-md">
                      Featured Story
                    </span>
                  </div>
                </div>
              )}

              {/* Featured Body */}
              <div className="p-7 sm:p-9 lg:p-12 lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-4">
                    {featuredBlog.date && (
                      <span className="flex items-center gap-1.5">
                        <FiCalendar className="w-3.5 h-3.5 text-primary" />
                        {featuredBlog.date}
                      </span>
                    )}
                    {featuredBlog.date && featuredBlog.readTime && (
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                    )}
                    {featuredBlog.readTime && (
                      <span className="flex items-center gap-1.5">
                        <FiClock className="w-3.5 h-3.5 text-primary" />
                        {featuredBlog.readTime}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 group-hover:text-primary transition-colors">
                    {featuredBlog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal line-clamp-3 sm:line-clamp-4 mb-6">
                    {featuredBlog.excerpt}
                  </p>
                </div>

                {/* Footer: Author & Read CTA */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  {featuredBlog.author && (
                    <div className="flex items-center gap-3">
                      {featuredBlog.author.avatar && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
                          <Image
                            src={featuredBlog.author.avatar}
                            alt={featuredBlog.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                          {featuredBlog.author.name}
                        </p>
                        {featuredBlog.author.role && (
                          <p className="text-[11px] text-gray-400 font-normal leading-tight mt-0.5">
                            {featuredBlog.author.role}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => handleShare(e, featuredBlog.id)}
                      title="Copy link"
                      className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                    >
                      <FiShare2 className="w-4 h-4" />
                    </button>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold group-hover:bg-primary group-hover:text-white transition-all">
                      <span>Read Article</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Standard Blog Articles Grid */}
        {standardBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 items-stretch">
            {standardBlogs.map((blog) => (
              <Link
                key={blog.id}
                id={blog.id}
                href={`/blog/${blog.id}`}
                className={`group relative flex flex-col bg-white rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden scroll-mt-32 ${
                  highlightedBlogId === blog.id
                    ? "border-primary/50 shadow-2xl ring-2 ring-primary/30"
                    : "border-gray-200/80 hover:border-gray-300 shadow-xs hover:shadow-xl"
                }`}
              >
                {/* Image Container */}
                {blog.image && (
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Overlay Tag */}
                    {blog.category && (
                      <div className="absolute bottom-3.5 left-3.5 z-10">
                        <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide uppercase border border-white/20">
                          {blog.category.replace("-", " ")}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Meta: Date & Read Time */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-3">
                      {blog.date && (
                        <span className="flex items-center gap-1.5">
                          <FiCalendar className="w-3.5 h-3.5 text-primary" />
                          {blog.date}
                        </span>
                      )}
                      {blog.date && blog.readTime && (
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                      )}
                      {blog.readTime && (
                        <span className="flex items-center gap-1.5">
                          <FiClock className="w-3.5 h-3.5 text-primary" />
                          {blog.readTime}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-xs sm:text-sm font-normal leading-relaxed mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Card Footer: Author & Share/Read Actions */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    {blog.author ? (
                      <div className="flex items-center gap-2.5">
                        {blog.author.avatar && (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
                            <Image
                              src={blog.author.avatar}
                              alt={blog.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-gray-900 leading-tight">
                            {blog.author.name}
                          </p>
                          {blog.author.role && (
                            <p className="text-[10px] text-gray-400 font-normal leading-tight mt-0.5">
                              {blog.author.role}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleShare(e, blog.id)}
                        title="Copy article link"
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                      >
                        <FiShare2 className="w-4 h-4" />
                      </button>
                      <span className="inline-flex items-center gap-1 text-primary text-xs font-bold group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <FiArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Copy Toast Alert */}
        {copiedId && (
          <div className="fixed bottom-6 right-6 z-50 bg-gray-950 text-white text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in">
            <FiCheckCircle className="text-primary w-4 h-4" />
            <span className="font-medium">Article link copied to clipboard!</span>
          </div>
        )}
      </div>
    </section>
  );
}
