"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiPlus, FiMinus, FiArrowRight, FiHelpCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import rawFaqData from "@/data/service/faq.json";
import { FaqData } from "@/types/service/faq";

export default function ServicesFaq() {
  const data: FaqData = rawFaqData;
  const [openId, setOpenId] = useState<number | null>(1); // Single active open item
  const [searchQuery, setSearchQuery] = useState("");

  if (!data.active) {
    return null;
  }

  const { sectionHeader, helpBox, items } = data;

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  // Real-time search filter
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  return (
    <section className="py-20 md:py-28 bg-[#F7F8F4] relative overflow-hidden">
      {/* Decorative Radial Background Lights */}
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-125 h-125 bg-black/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12 px-4">
          {sectionHeader.badge && (
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary uppercase mb-3.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <LuSparkles className="w-4 h-4" />
              <span>{sectionHeader.badge}</span>
            </span>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            {sectionHeader.titlePrefix}{" "}
            <span className="text-primary">{sectionHeader.highlightedTitle}</span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8">
            {sectionHeader.description}
          </p>

          {/* Interactive Search Bar */}
          <div className="w-full max-w-xl relative">
            <div className="relative flex items-center">
              <FiSearch className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={sectionHeader.searchPlaceholder}
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-sm text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 p-1 text-gray-400 hover:text-gray-600 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Unique, Clean Question Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-start mb-14 md:mb-16">
            {filteredItems.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                    isOpen
                      ? "border-primary/40 shadow-md ring-1 ring-primary/20"
                      : "border-gray-200/80 hover:border-primary/30 hover:shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none select-none group"
                  >
                    <div className="flex-1">
                      {/* Meta Number + Category */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary font-mono tracking-wider">
                          {item.number}
                        </span>
                        <span className="h-2.5 w-px bg-gray-300" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                          {item.category}
                        </span>
                      </div>

                      {/* Question Title */}
                      <h3
                        className={`text-sm sm:text-base font-bold tracking-tight leading-snug transition-colors duration-200 ${
                          isOpen
                            ? "text-primary"
                            : "text-gray-900 group-hover:text-primary"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    {/* Circular Action Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 ${
                        isOpen
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary"
                      }`}
                    >
                      {isOpen ? (
                        <FiMinus className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <FiPlus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-gray-100 bg-gray-50/40"
                      >
                        <div className="p-5 sm:p-6 pt-3.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-200/80 mb-14">
            <p className="text-gray-500 text-sm mb-2">
              No matching questions found for &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-semibold text-primary hover:underline cursor-pointer uppercase tracking-wider"
            >
              Clear search filter
            </button>
          </div>
        )}

        {/* Contact / Help Banner (Conditionally rendered when helpBox.active is true) */}
        {helpBox.active && (
          <div className="bg-linear-to-r from-black via-zinc-950 to-black rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary shrink-0 border border-white/10">
                  <FiHelpCircle className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-white">
                    {helpBox.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm max-w-xl font-light">
                    {helpBox.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={helpBox.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold tracking-wider uppercase transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>{helpBox.whatsappText}</span>
                </a>

                <Link
                  href={helpBox.buttonHref}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary hover:bg-[#c8191e] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-primary/30 active:scale-95 cursor-pointer"
                >
                  <span>{helpBox.buttonText}</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
