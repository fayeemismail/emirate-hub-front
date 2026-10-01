"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiPlus, FiMinus, FiArrowRight, FiHelpCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import rawFaqData from "@/data/service/faq.json";
import { FaqData } from "@/types/service/faq";

interface ServicesFaqProps {
  data?: FaqData | any | null;
}

export default function ServicesFaq({ data: propData }: ServicesFaqProps) {
  const data: FaqData = propData || rawFaqData;
  const [openId, setOpenId] = useState<number | string | null>(1);
  const [searchQuery, setSearchQuery] = useState("");

  if (data && data.active === false) {
    return null;
  }

  const sectionHeader = data.sectionHeader || rawFaqData.sectionHeader;
  const helpBox = data.helpBox || rawFaqData.helpBox;
  const items = data.items || rawFaqData.items;

  const toggleFaq = (id: number | string) => {
    setOpenId(openId === id ? null : id);
  };

  // Real-time search filter
  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter(
      (item: any) =>
        (item.question && item.question.toLowerCase().includes(q)) ||
        (item.answer && item.answer.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
    );
  }, [items, searchQuery]);

  return (
    <section
      style={data.backgroundColor ? { backgroundColor: data.backgroundColor } : undefined}
      className="py-20 md:py-28 bg-[#F7F8F4] relative overflow-hidden"
    >
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

          <h2
            style={data.titleColor ? { color: data.titleColor } : undefined}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-4"
          >
            {sectionHeader.titlePrefix}{" "}
            <span
              style={data.highlightColor ? { color: data.highlightColor } : undefined}
              className="text-primary"
            >
              {sectionHeader.highlightedTitle}
            </span>
          </h2>

          <p
            style={data.descriptionColor ? { color: data.descriptionColor } : undefined}
            className="text-gray-600 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8"
          >
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
                placeholder={sectionHeader.searchPlaceholder || "Search questions by topic..."}
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

        {/* Question Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-start mb-14 md:mb-16">
            {filteredItems.map((item: any, index: number) => {
              const itemId = item.id ?? item._key ?? index;
              const isOpen = openId === itemId;

              return (
                <div
                  key={itemId}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                    isOpen
                      ? "border-primary/40 shadow-md ring-1 ring-primary/20"
                      : "border-gray-200/80 hover:border-primary/30 hover:shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(itemId)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex-1 pr-2">
                      {item.category && (
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-primary mb-1.5 block">
                          {item.category}
                        </span>
                      )}
                      <h3
                        style={data.questionColor ? { color: data.questionColor } : undefined}
                        className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors"
                      >
                        {item.question}
                      </h3>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-primary text-white rotate-180"
                          : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {isOpen ? (
                        <FiMinus className="w-4 h-4" />
                      ) : (
                        <FiPlus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 font-light">
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
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 mb-14">
            <FiHelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 text-base font-medium">
              No matching questions found for &quot;{searchQuery}&quot;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 text-primary text-sm font-semibold hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Help / Contact Callout Box */}
        {helpBox && helpBox.active !== false && (
          <div className="rounded-3xl bg-linear-to-r from-gray-900 via-[#07172e] to-gray-900 p-8 sm:p-10 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                {helpBox.title || "Still have specific questions?"}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                {helpBox.description ||
                  "Our senior business setup consultants are ready to provide a personalized advisory session tailored to your exact business activities."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href={helpBox.buttonHref || "/#contact-us"}
                className="px-6 py-3.5 rounded-full bg-primary hover:bg-[#c8191e] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{helpBox.buttonText || "REQUEST ADVISORY CALL"}</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
              {helpBox.whatsappHref && (
                <a
                  href={helpBox.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <FaWhatsapp className="w-4 h-4 text-emerald-400" />
                  <span>{helpBox.whatsappText || "CHAT ON WHATSAPP"}</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
