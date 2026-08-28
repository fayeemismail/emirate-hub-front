"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookmark, FiFlag, FiMessageSquare, FiTarget, FiShield } from "react-icons/fi";

interface TabData {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  image: string;
  description1: string;
  description2: string;
}

const tabsData: TabData[] = [
  {
    id: "expertise",
    label: "Expertise & Experience",
    icon: FiBookmark,
    title: "Expertise & Experience",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
    description1:
      "With years of dedicated experience in the UAE market, our team of seasoned corporate advisors delivers unmatched guidance tailored to your vision.",
    description2:
      "We navigate complex regulatory frameworks and legal requirements effortlessly, ensuring your business launch in Dubai is smooth, efficient, and compliant.",
  },
  {
    id: "end-to-end",
    label: "End-to-End Solutions",
    icon: FiFlag,
    title: "End-to-End Solutions",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop",
    description1:
      "From company formation, trade licensing, and visas to corporate tax registration, accounting, and golden visa services, we provide a seamless and exceptional experience.",
    description2:
      "Emirate Hub handles every detail so you can focus entirely on scaling your business.",
  },
  {
    id: "tailored",
    label: "Tailored Support",
    icon: FiMessageSquare,
    title: "Tailored Support",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
    description1:
      "Every business is unique. We assign dedicated business setup managers who offer personalized, 1-on-1 strategic support customized to your specific industry requirements.",
    description2:
      "Our client relationship team is always available to answer queries, assist with banking, administrative procedures, and ongoing business growth in Dubai.",
  },
  {
    id: "strategic",
    label: "Strategic Advantage",
    icon: FiTarget,
    title: "Strategic Advantage",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    description1:
      "Position your enterprise in Dubai’s thriving economy. We analyze Freezone and Mainland options to maximize tax efficiency, ownership structures, and international expansion.",
    description2:
      "Gain direct access to our network of premier UAE financial institutions, legal experts, and strategic corporate partners.",
  },
  {
    id: "trust",
    label: "Trust & Transparency",
    icon: FiShield,
    title: "Trust & Transparency",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    description1:
      "We build lasting client relationships based on integrity, clear communication, and zero hidden costs. Complete fee structure breakdown is provided upfront.",
    description2:
      "Over hundreds of international entrepreneurs and global companies trust Emirate Hub as their official incorporation partner in the UAE.",
  },
];

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState<string>("end-to-end");

  const currentTab = tabsData.find((t) => t.id === activeTab) || tabsData[1];

  return (
    <section className="py-16 md:py-24 bg-[#F2F3EE] overflow-hidden">
      <div className="site-container">
        {/* Main Section Title */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Why Choose <span className="text-primary">Emirate Hub?</span>
          </h2>
        </div>

        {/* Tabs Bar Header */}
        <div className="border-b border-gray-300/60 max-w-5xl mx-auto">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none gap-4 sm:gap-6 md:gap-8 lg:gap-10 pb-0 px-2">
            {tabsData.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3.5 px-1 text-xs sm:text-sm md:text-[14px] font-medium tracking-tight whitespace-nowrap relative transition-colors duration-200 cursor-pointer select-none ${
                    isActive ? "text-primary font-semibold" : "text-gray-800 hover:text-primary"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-800"}`} />
                  <span>{tab.label}</span>

                  {/* Active Red Underline Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="whyChooseActiveTab"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Tab Content Container */}
        <div className="mt-10 md:mt-14 max-w-6xl mx-auto px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center"
            >
              {/* Left Side: Image */}
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-sm aspect-4/3 w-full bg-gray-200">
                  <img
                    src={currentTab.image}
                    alt={currentTab.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Side: Text Content */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-4 md:space-y-6">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                  {currentTab.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
                  {currentTab.description1}
                </p>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
                  {currentTab.description2}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
