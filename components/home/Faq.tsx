"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { HomeFaqData, HomeFaqItem } from "@/types/home/faq";

const defaultFaqData: HomeFaqItem[] = [
  {
    id: 1,
    question: "How much does setting up a business in Dubai cost?",
    answer:
      "The cost of setting up a business in Dubai depends on the license type, jurisdiction (Freezone vs. Mainland), and visa requirements. Basic Freezone company setup packages typically start from AED 12,500.",
  },
  {
    id: 2,
    question: "Can I own 100% of my company in Dubai?",
    answer:
      "Yes! Foreign entrepreneurs can retain 100% foreign ownership of their business in all UAE Freezones as well as across most Mainland commercial and industrial activities without requiring a UAE local partner.",
  },
  {
    id: 3,
    question: "Do I have to be physically in the UAE to set up a business?",
    answer:
      "No, initial company incorporation can be completed remotely from anywhere in the world. You will only need to visit Dubai briefly for Emirates ID biometrics and medical fitness tests.",
  },
  {
    id: 4,
    question: "How much does setting up a business in Dubai cost?",
    answer:
      "Full setup packages include trade license issuance, corporate registration, virtual office address, and visa allocation. Emirate Hub provides transparent pricing with zero hidden fees.",
  },
  {
    id: 5,
    question: "Can I own 100% of my company in Dubai?",
    answer:
      "Under the latest UAE Commercial Companies Law, 100% foreign ownership is fully guaranteed across over 1,000+ commercial activities on the Mainland and 100% across all Freezones.",
  },
  {
    id: 6,
    question: "Do I have to be physically in the UAE to set up a business?",
    answer:
      "Our team handles all initial document submissions, authority approvals, and name reservations electronically so you can stay focused on your business.",
  },
];

interface FaqProps {
  data?: HomeFaqData | null;
}

export default function Faq({ data }: FaqProps) {
  const [openId, setOpenId] = useState<string | number | null>(null);

  if (data && data.active === false) {
    return null;
  }

  const items =
    data?.faqs && data.faqs.length > 0 ? data.faqs : defaultFaqData;
  const sectionTitle = data?.title || "FAQ";
  const sectionSubtitle = data?.subtitle || "Questions ? Look here.";
  const faqImage =
    data?.image ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop";

  const toggleFaq = (id: string | number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      style={data?.backgroundColor ? { backgroundColor: data.backgroundColor } : undefined}
      className="py-16 md:py-24 bg-[#F2F3EE] relative overflow-hidden"
    >
      {/* Top Right Decorative Dot Matrix Grid */}
      <div className="absolute top-8 right-8 hidden md:grid grid-cols-6 gap-2.5 pointer-events-none opacity-25">
        {Array.from({ length: 42 }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-gray-400" />
        ))}
      </div>

      {/* Bottom Left Decorative Dot Matrix Grid */}
      <div className="absolute -bottom-6 -left-6 hidden md:grid grid-cols-6 gap-2.5 pointer-events-none opacity-25">
        {Array.from({ length: 42 }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-gray-400" />
        ))}
      </div>

      <div className="site-container relative z-10">
        {/* Main Section Heading - Matching About and PriceCards style */}
        <div className="pb-2 text-center md:text-left">
          <h2
            style={data?.titleColor ? { color: data.titleColor } : undefined}
            className="relative text-5xl md:text-6xl lg:text-6xl font-bold font-sans text-primary cursor-pointer inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.75 after:bg-primary hover:after:w-full after:transition-all after:duration-300 after:ease-in-out"
          >
            {sectionTitle}
          </h2>
        </div>

        {/* Subtitle */}
        <div className="mb-10 md:mb-14 text-center md:text-left">
          <h3
            style={data?.subtitleColor ? { color: data.subtitleColor } : undefined}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight"
          >
            {sectionSubtitle}
          </h3>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Image (Balanced Size) */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-sm aspect-4/5 w-full bg-gray-200">
              <img
                src={faqImage}
                alt="FAQ Consultation Specialist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: FAQ Accordion List (Lightweight & Smooth) */}
          <div className="lg:col-span-7 space-y-4 md:space-y-5">
            {items.map((item, index) => {
              const itemId = item.id ?? item._key ?? index;
              const isOpen = openId === itemId;

              return (
                <div
                  key={itemId}
                  className="border-b border-gray-300/60 pb-4 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(itemId)}
                    className="w-full flex items-center gap-4 text-left cursor-pointer group focus:outline-none select-none"
                  >
                    {/* Red Circular Icon with Smooth Rotating Chevron Arrow */}
                    <div
                      className={`w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0 transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <FiChevronRight className="w-5 h-5 text-white stroke-[2.5]" />
                    </div>

                    {/* Question Text */}
                    <span
                      style={{
                        "--faq-q-color": data?.questionColor || "#111827",
                      } as React.CSSProperties}
                      className="text-base md:text-lg font-bold text-[var(--faq-q-color)] group-hover:text-primary transition-colors duration-200 leading-snug"
                    >
                      {item.question}
                    </span>
                  </button>

                  {/* Fast, Lightweight Expandable Answer Animation */}
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
                        <p
                          style={data?.answerColor ? { color: data.answerColor } : undefined}
                          className="text-gray-600 text-sm md:text-base leading-relaxed pl-12 pt-3 font-normal"
                        >
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
