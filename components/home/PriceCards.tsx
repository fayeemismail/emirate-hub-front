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
} from "react-icons/lu";

const pricingCards = [
  {
    id: 1,
    badge: "FAST SETUP",
    isPopular: false,
    icon: LuBriefcaseBusiness,
    title: "Business License",
    tagline: "Launch your business in the UAE with ease",
    startingAt: "Starting at",
    currency: "AED",
    price: "3,999",
    features: [
      "100% Foreign Ownership",
      "10 Business Activities",
      "Fast Processing",
      "Bank Account Opening Assistance",
    ],
  },
  {
    id: 2,
    badge: "MOST POPULAR",
    isPopular: true,
    icon: LuBuilding2,
    title: "Dubai Mainland License",
    tagline: "Direct access to UAE local & global markets",
    startingAt: "Starting at",
    currency: "AED",
    price: "15,000",
    features: [
      "Trade Anywhere in the UAE & Worldwide",
      "No Minimum Paid-Up Capital Required",
      "Dedicated Corporate Banking Support",
      "Unlimited Employment Visa Quotas",
    ],
  },
  {
    id: 3,
    badge: "BEST VALUE",
    isPopular: false,
    icon: LuBadgeCheck,
    title: "Freezone & Lifetime Visa",
    tagline: "All-in-one package with residency for life",
    startingAt: "Starting at",
    currency: "AED",
    price: "12,500",
    features: [
      "Free Lifetime Investor Residency Visa",
      "0% Personal & Corporate Tax Benefits",
      "100% Capital & Profit Repatriation",
      "Fast-Track Emirates ID & Medicals",
    ],
  },
];

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
  const [clickedId, setClickedId] = useState<number | null>(null);

  const handleEnquire = (id: number) => {
    setClickedId(id);
    setTimeout(() => {
      setClickedId(null);
      router.push("/coming-soon");
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
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">
            PRICING PACKAGES
          </span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            Transparent Pricing for{" "}
            <span className="text-primary">Your Success</span>
          </h3>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl font-light">
            Choose the ideal license package designed to fast-track your
            business setup in Dubai and across the UAE with zero hidden costs.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {pricingCards.map((card, index) => {
            const IconComponent = card.icon;
            const isLastCard = index === pricingCards.length - 1;
            const isClicked = clickedId === card.id;

            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                className={`group relative bg-white rounded-3xl p-7 md:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between border ${
                  card.isPopular
                    ? "border-primary/40 ring-1 ring-primary/20 hover:shadow-[0_20px_45px_rgba(224,33,38,0.12)]"
                    : "border-gray-100/90 hover:border-secondary/30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
                } ${isLastCard ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Popular / Recommended Tag */}
                {card.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-primary text-white text-[11px] font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 select-none">
                    <LuSparkles className="w-3.5 h-3.5" />
                    <span>{card.badge}</span>
                  </div>
                )}

                <div>
                  {/* Top Row: Modern Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ease-in-out shadow-xs group-hover:scale-105 ${
                        card.isPopular
                          ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
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
                    className="text-lg sm:text-xl lg:text-[17px] xl:text-xl font-bold text-gray-900 tracking-tight truncate whitespace-nowrap mb-2"
                    title={card.title}
                  >
                    {card.title}
                  </h4>

                  {/* Short Tagline */}
                  <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed font-normal mb-6 min-h-9.5">
                    {card.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="pb-6 border-b border-gray-100">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">
                      {card.startingAt}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm sm:text-base font-semibold text-gray-500">
                        {card.currency}
                      </span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        {card.price}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="py-6 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                      What&apos;s Included:
                    </span>
                    {card.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            card.isPopular
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary/10 text-secondary"
                          }`}
                        >
                          <LuCheck className="w-2.5 h-2.5 stroke-3" />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 font-normal leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enquire Now Bordered CTA Button (Popular gets Primary, others get Secondary) */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleEnquire(card.id)}
                    className={`group/btn w-full py-3.5 px-6 rounded-xl font-semibold text-xs tracking-wider uppercase border bg-transparent transition-all duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md select-none active:scale-[0.98] ${
                      card.isPopular
                        ? "border-primary text-primary hover:bg-primary hover:text-white"
                        : "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    } ${isClicked ? "opacity-75 scale-95" : ""}`}
                  >
                    <span>ENQUIRE NOW</span>
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
