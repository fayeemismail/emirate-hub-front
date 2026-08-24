"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
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

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F2F3EE] relative overflow-hidden">
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
          <h2 className="relative text-5xl md:text-6xl lg:text-6xl font-bold font-sans text-primary cursor-pointer inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.75 after:bg-primary hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">
            FAQ
          </h2>
        </div>

        {/* Subtitle */}
        <div className="mb-10 md:mb-14 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Questions ? Look here.
          </h3>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Image (Balanced Size) */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-2xl md:rounded-[24px] shadow-sm aspect-[4/5] w-full bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
                alt="FAQ Consultation Specialist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: FAQ Accordion List (Lightweight & Smooth) */}
          <div className="lg:col-span-7 space-y-4 md:space-y-5">
            {faqData.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-gray-300/60 pb-4 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
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
                    <span className="text-base md:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 leading-snug">
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
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-12 pt-3 font-normal">
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
