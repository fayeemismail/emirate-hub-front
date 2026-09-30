"use client";

import Link from "next/link";
import { FiChevronRight, FiTrendingUp } from "react-icons/fi";
import rawBlogHeroData from "@/data/blog/blogHero.json";
import { BlogHeroData } from "@/types/blog/blogHero";

interface BlogHeroProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function BlogHero({}: BlogHeroProps = {}) {
  const data: BlogHeroData = rawBlogHeroData as BlogHeroData;

  if (!data || !data.active) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0D14] text-white pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 -mt-32 w-96 h-96 bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-32 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Subtle Grid Backdrop Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="site-container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Breadcrumb Navigation - Only shown if breadcrumb data is active */}
          {data.breadcrumb && (
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 mb-6 bg-white/[0.06] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md shadow-inner"
            >
              {data.breadcrumb.parentHref && data.breadcrumb.parentLabel && (
                <>
                  <Link
                    href={data.breadcrumb.parentHref}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {data.breadcrumb.parentLabel}
                  </Link>
                  <FiChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </>
              )}
              {data.breadcrumb.label && (
                <span className="text-primary font-semibold tracking-wide">
                  {data.breadcrumb.label}
                </span>
              )}
            </nav>
          )}

          {/* Badge - Only shown if badge data is present */}
          {data.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <FiTrendingUp className="w-3.5 h-3.5" />
              <span>{data.badge}</span>
            </div>
          )}

          {/* Main Heading */}
          {data.title && (
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-5">
              {data.title}{" "}
              {data.highlightedTitle && (
                <span className="bg-gradient-to-r from-red-500 via-primary to-rose-400 bg-clip-text text-transparent">
                  {data.highlightedTitle}
                </span>
              )}
            </h1>
          )}

          {/* Subtitle */}
          {data.subtitle && (
            <p className="text-gray-200 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto mb-3 leading-snug">
              {data.subtitle}
            </p>
          )}

          {/* Description */}
          {data.description && (
            <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
              {data.description}
            </p>
          )}

          {/* Optional Stats Highlights - Only rendered if stats exist */}
          {data.stats && data.stats.length > 0 && (
            <div className="mt-12 sm:mt-14 pt-8 border-t border-white/10 w-full max-w-3xl grid grid-cols-3 gap-4 sm:gap-6">
              {data.stats.map((st, sIdx) => (
                <div key={sIdx} className="flex flex-col items-center text-center">
                  <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                    {st.value}
                  </span>
                  <span className="text-[11px] sm:text-xs text-gray-400 font-light mt-0.5">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
