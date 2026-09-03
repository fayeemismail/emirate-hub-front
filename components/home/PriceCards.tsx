"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import {
  LuGlobe,
  LuBuilding2,
  LuBadgeCheck,
  LuArrowRight,
  LuCheck,
  LuSparkles,
  LuBriefcaseBusiness,
  LuShieldCheck,
  LuLandmark,
  LuFileText,
  LuTrendingUp,
  LuZap,
} from "react-icons/lu";
import rawPricingData from "@/data/home/pricing.json";
import { PricingData } from "@/types/home/pricing";

// Dynamic icon mapping helper
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: LuBriefcaseBusiness,
  LuBriefcaseBusiness: LuBriefcaseBusiness,
  building: LuBuilding2,
  LuBuilding2: LuBuilding2,
  "badge-check": LuBadgeCheck,
  LuBadgeCheck: LuBadgeCheck,
  globe: LuGlobe,
  LuGlobe: LuGlobe,
  sparkles: LuSparkles,
  LuSparkles: LuSparkles,
  shield: LuShieldCheck,
  LuShieldCheck: LuShieldCheck,
  landmark: LuLandmark,
  LuLandmark: LuLandmark,
  file: LuFileText,
  LuFileText: LuFileText,
  zap: LuZap,
  LuZap: LuZap,
  trending: LuTrendingUp,
  LuTrendingUp: LuTrendingUp,
};

// Lightweight GPU-accelerated entrance variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function PriceCards() {
  const router = useRouter();
  const [clickedId, setClickedId] = useState<number | string | null>(null);
  const data: PricingData = rawPricingData as PricingData;

  if (!data.active) {
    return null;
  }

  const handleEnquire = (href?: string, id?: number | string) => {
    if (id !== undefined) setClickedId(id);
    setTimeout(() => {
      setClickedId(null);
      router.push(href || "/coming-soon");
    }, 250);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F6FB] overflow-hidden">
      <div className="site-container">
        {/* Subtitle Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16 px-4"
        >
          {data.badge && (
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">
              {data.badge}
            </span>
          )}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            {data.title}{" "}
            {data.highlightedTitle && (
              <span className="text-primary">{data.highlightedTitle}</span>
            )}
          </h3>
          {data.description && (
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl font-light">
              {data.description}
            </p>
          )}
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {data.cards.map((card, index) => {
            const IconComponent = ICON_MAP[card.icon] || LuBriefcaseBusiness;
            const isLastCard = index === data.cards.length - 1;
            const isClicked = clickedId === card.id;
            const isCenterOrPopular = card.isPopular;

            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                className={`group relative rounded-3xl p-7 md:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between border ${
                  isCenterOrPopular
                    ? "bg-primary text-white border-primary shadow-xl hover:shadow-[0_20px_50px_rgba(224,33,38,0.28)]"
                    : "bg-white text-gray-900 border-gray-100/90 hover:border-secondary/30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
                } ${isLastCard ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Popular / Recommended Floating Tag */}
                {card.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-white text-primary text-[11px] font-extrabold tracking-widest uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 select-none border border-primary/20">
                    <LuSparkles className="w-3.5 h-3.5 text-primary" />
                    <span>{card.badge}</span>
                  </div>
                )}

                <div>
                  {/* Top Row: Modern Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ease-in-out shadow-xs group-hover:scale-105 ${
                        isCenterOrPopular
                          ? "bg-white/15 text-white border border-white/20 backdrop-blur-xs group-hover:bg-white group-hover:text-primary"
                          : "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
                      }`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {!card.isPopular && (
                      <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors duration-300">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  {/* Title (Guaranteed Single Line) */}
                  <h4
                    className={`text-lg sm:text-xl lg:text-[17px] xl:text-xl font-bold tracking-tight truncate whitespace-nowrap mb-2 ${
                      isCenterOrPopular ? "text-white" : "text-gray-900"
                    }`}
                    title={card.title}
                  >
                    {card.title}
                  </h4>

                  {/* Short Tagline */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed font-normal mb-6 min-h-9.5 ${
                      isCenterOrPopular ? "text-white/85" : "text-gray-500"
                    }`}
                  >
                    {card.tagline}
                  </p>

                  {/* Price Block */}
                  <div
                    className={`pb-6 border-b ${
                      isCenterOrPopular ? "border-white/20" : "border-gray-100"
                    }`}
                  >
                    {/* <span
                      className={`text-xs font-semibold uppercase tracking-wider block mb-1 ${
                        isCenterOrPopular ? "text-white/75" : "text-gray-400"
                      }`}
                    >
                      {card.startingAt}
                    </span> */}
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={`text-sm sm:text-base font-semibold ${
                          isCenterOrPopular ? "text-white/90" : "text-gray-500"
                        }`}
                      >
                        {card.currency}
                      </span>
                      <span
                        className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                          isCenterOrPopular ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {card.price}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="py-6 space-y-3">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-widest block mb-1 ${
                        isCenterOrPopular ? "text-white/75" : "text-gray-400"
                      }`}
                    >
                      {card.featuresHeading || "What's Included:"}
                    </span>
                    {card.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isCenterOrPopular
                              ? "bg-white/20 text-white border border-white/30"
                              : "bg-secondary/10 text-secondary"
                          }`}
                        >
                          <LuCheck className="w-2.5 h-2.5 stroke-3 text-current" />
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-normal leading-tight ${
                            isCenterOrPopular ? "text-white/95" : "text-gray-600"
                          }`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enquire Now CTA Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleEnquire(card.buttonHref, card.id)}
                    className={`group/btn w-full py-3.5 px-6 rounded-xl font-semibold text-xs tracking-wider uppercase border transition-all duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md select-none active:scale-[0.98] ${
                      isCenterOrPopular
                        ? "bg-white text-primary border-black hover:bg-white/90 hover:text-primary font-bold"
                        : "bg-transparent border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    } ${isClicked ? "opacity-75 scale-95" : ""}`}
                  >
                    <span>{card.buttonText || "ENQUIRE NOW"}</span>
                    <LuArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300 ease-in-out" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
