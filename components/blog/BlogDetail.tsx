"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiCalendar,
  FiClock,
  FiChevronRight,
  FiShare2,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiBookmark,
  FiCheck,
  FiList,
} from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { BlogItem } from "@/types/blog/blog";

interface BlogDetailProps {
  blog: BlogItem;
  relatedBlogs: BlogItem[];
}

export default function BlogDetail({ blog, relatedBlogs }: BlogDetailProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://emiratehub.ae/blog/${blog.id}`;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${blog.title} - Emirate Hub Dubai`);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const scrollToSection = (index: number) => {
    const el = document.getElementById(`section-${index}`);
    if (el) {
      const navOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#FAF9F6]/60 min-h-screen">
      {/* Top Header Hero */}
      <section className="relative w-full overflow-hidden bg-[#0A0D14] text-white pt-28 sm:pt-36 pb-14 sm:pb-20">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 -mt-20 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="site-container relative z-10 max-w-5xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-300 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <FiChevronRight className="w-3.5 h-3.5 text-gray-500" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blogs & Insights
            </Link>
            {blog.category && (
              <>
                <FiChevronRight className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-primary font-medium capitalize">
                  {blog.category.replace("-", " ")}
                </span>
              </>
            )}
          </nav>

          {/* Category Tag */}
          {blog.category && (
            <div className="mb-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest">
                {blog.category.replace("-", " ")}
              </span>
            </div>
          )}

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.18] mb-5">
            {blog.title}
          </h1>

          {/* Subtitle / Excerpt */}
          {blog.excerpt && (
            <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 max-w-4xl">
              {blog.excerpt}
            </p>
          )}

          {/* Author & Meta Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Author details */}
            {blog.author && (
              <div className="flex items-center gap-3">
                {blog.author.avatar && (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 shrink-0">
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-white leading-tight">
                    {blog.author.name}
                  </p>
                  {blog.author.role && (
                    <p className="text-xs text-gray-400 font-light mt-0.5">
                      {blog.author.role}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Date, ReadTime & Share */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs text-gray-300">
              {blog.date && (
                <div className="flex items-center gap-1.5">
                  <FiCalendar className="w-4 h-4 text-primary" />
                  <span>{blog.date}</span>
                </div>
              )}
              {blog.readTime && (
                <div className="flex items-center gap-1.5">
                  <FiClock className="w-4 h-4 text-primary" />
                  <span>{blog.readTime}</span>
                </div>
              )}

              {/* Share actions */}
              <div className="flex items-center gap-2 pl-2 border-l border-white/15">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copy link"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  {copied ? <FiCheck className="w-3.5 h-3.5 text-green-400" /> : <FiShare2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={handleShareLinkedIn}
                  title="Share on LinkedIn"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleShareTwitter}
                  title="Share on X"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <FaXTwitter className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="site-container py-10 sm:py-16 max-w-6xl mx-auto">
        {/* Large Featured Image */}
        {blog.image && (
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl mb-12 sm:mb-16 border border-gray-200/80 bg-gray-100">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        {/* 2-Column Grid Layout: Main Article + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Article Content (8 Columns) */}
          <main className="lg:col-span-8 space-y-10">
            {/* Summary Quote Box - Only if present */}
            {blog.summaryQuote && (
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/80 shadow-xs">
                <div className="absolute top-6 left-6 text-primary/20 text-6xl font-serif select-none leading-none -translate-x-2 -translate-y-3">
                  “
                </div>
                <blockquote className="relative z-10 text-gray-800 text-lg sm:text-xl font-serif italic leading-relaxed pl-6 border-l-4 border-primary">
                  {blog.summaryQuote}
                </blockquote>
              </div>
            )}

            {/* Key Takeaways Box - Only if present */}
            {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200/90 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
                    Executive Advisory Takeaways
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {blog.keyTakeaways.map((takeaway, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 text-sm sm:text-base text-gray-800 leading-relaxed font-normal"
                    >
                      <FiCheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Sections - Only if present */}
            {blog.sections && blog.sections.length > 0 && (
              <div className="space-y-10 pt-2">
                {blog.sections.map((sec, sIdx) => (
                  <section
                    key={sIdx}
                    id={`section-${sIdx}`}
                    className="space-y-4 scroll-mt-28"
                  >
                    {sec.heading && (
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
                        {sec.heading}
                      </h2>
                    )}
                    {sec.paragraphs?.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-gray-700 text-base sm:text-lg leading-[1.8] font-light"
                      >
                        {p}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            )}

            {/* Topic Tags - Only if present */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="pt-8 border-t border-gray-200">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Related Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs sm:text-sm px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium shadow-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Box */}
            {blog.author && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {blog.author.avatar && (
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-gray-200 shrink-0 shadow-xs">
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    About the Author
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mt-0.5">
                    {blog.author.name}
                  </h4>
                  {blog.author.role && (
                    <p className="text-xs text-gray-500 font-normal mb-2">
                      {blog.author.role} at Emirate Hub
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                    Specialized in UAE corporate compliance, mainland & free zone formation, tax structuring, and business setup strategies in Dubai.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation back to blogs */}
            <div className="pt-6 flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to All Articles</span>
              </Link>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary/15 text-primary text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <FiCheck className="w-4 h-4 text-green-600" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <FiShare2 className="w-4 h-4" />
                    <span>Share Article</span>
                  </>
                )}
              </button>
            </div>
          </main>

          {/* Sticky Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-28">
            {/* Direct Consultation Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0F131C] text-white border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
              
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                Need Advisory Assistance?
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug mb-3">
                Speak with Our Corporate Advisors
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                Receive customized structuring guidance on UAE setup, VAT registrations, corporate tax, and trade licenses.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-gray-300 font-light">
                <li className="flex items-center gap-2">
                  <FiCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>100% FTA & Ministry Compliant</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>3-5 Business Days Fast Turnaround</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>Dedicated Relationship Manager</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => router.push("/#contact-us")}
                className="w-full py-3 rounded-full bg-primary hover:bg-[#c8191e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Free Consultation</span>
                <FiArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Table of Contents - Only if sections exist with headings */}
            {blog.sections && blog.sections.some((s) => s.heading) && (
              <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                  <FiList className="w-4 h-4 text-primary" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-2.5">
                  {blog.sections.map(
                    (sec, idx) =>
                      sec.heading && (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => scrollToSection(idx)}
                          className="block text-left text-xs sm:text-sm text-gray-600 hover:text-primary transition-colors cursor-pointer leading-snug font-medium"
                        >
                          {idx + 1}. {sec.heading}
                        </button>
                      )
                  )}
                </nav>
              </div>
            )}

            {/* Quick Share Card */}
            <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">
                Share this article
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareLinkedIn}
                  title="Share on LinkedIn"
                  className="p-2 rounded-full bg-gray-100 hover:bg-[#0077B5] hover:text-white text-gray-600 transition-colors cursor-pointer"
                >
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleShareTwitter}
                  title="Share on X"
                  className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white text-gray-600 transition-colors cursor-pointer"
                >
                  <FaXTwitter className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copy link"
                  className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-gray-600 transition-colors cursor-pointer"
                >
                  <FiShare2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Section - Only if related articles exist */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <section className="mt-20 sm:mt-28 pt-12 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  More Insights
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
                  Related Corporate Guides
                </h3>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline"
              >
                <span>View All Articles</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.id}`}
                  className="group flex flex-col bg-white rounded-3xl border border-gray-200/80 hover:border-gray-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {item.image && (
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.category && (
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold uppercase">
                            {item.category.replace("-", " ")}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mb-2.5">
                        {item.date && <span>{item.date}</span>}
                        {item.date && item.readTime && <span>•</span>}
                        {item.readTime && <span>{item.readTime}</span>}
                      </div>

                      <h4 className="font-bold text-base sm:text-lg text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm font-normal line-clamp-2 leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-5">
                      {item.author && (
                        <span className="text-xs font-semibold text-gray-700">
                          {item.author.name}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-primary text-xs font-bold group-hover:translate-x-1 transition-transform ml-auto">
                        <span>Read</span>
                        <FiArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Copy Toast Alert */}
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-950 text-white text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in">
          <FiCheckCircle className="text-primary w-4 h-4" />
          <span className="font-medium">Article link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
