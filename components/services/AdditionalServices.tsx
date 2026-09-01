"use client";

import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import additionalServicesData from "@/data/service/additionalServices.json";
import { AdditionalServicesData } from "@/types/service/additionalServices";

export default function AdditionalServices() {
  const data: AdditionalServicesData = additionalServicesData;

  if (!data.active) {
    return null;
  }

  const { sectionHeader, services } = data;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-200/70 overflow-hidden">
      <div className="site-container">
        {/* Section Header - pulled entirely from JSON */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
          {sectionHeader.badge && (
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary uppercase mb-3 flex items-center gap-1.5">
              <LuSparkles className="w-3.5 h-3.5" />
              <span>{sectionHeader.badge}</span>
            </span>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            {sectionHeader.titlePrefix}{" "}
            <span className="text-primary">{sectionHeader.highlightedTitle}</span>
          </h2>

          <p className="text-gray-500 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
            {sectionHeader.description}
          </p>
        </div>

        {/* Services Cards Container: Mobile Horizontal Scroll / Desktop 3-Col Grid */}
        <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible gap-5 sm:gap-6 lg:gap-8 pb-4 lg:pb-0 -mx-5 px-5 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:mx-0 lg:px-0 snap-x snap-mandatory lg:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-width:none">
          {services.map((item) => (
            <div
              key={item.id}
              className="w-[85vw] max-w-85 sm:w-90 sm:max-w-90 md:w-95 md:max-w-95 lg:w-auto lg:max-w-none shrink-0 lg:shrink snap-start group bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 hover:border-primary/40 shadow-xs hover:shadow-xl transition-all duration-300 ease-out flex flex-col justify-between"
            >
              <div>
                {/* Card Top Row: Number & Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="text-sm font-bold text-primary tracking-widest">
                    {item.number}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-snug mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light mb-6">
                  {item.description}
                </p>

                {/* Feature Bullet Points */}
                <div className="space-y-2.5 pb-6 border-t border-gray-100 pt-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    {item.featuresHeading}
                  </span>
                  {item.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                      <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <FiCheck className="w-2.5 h-2.5 stroke-3" />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Action Button */}
              <div className="pt-2">
                <Link
                  href={item.buttonHref}
                  className="group/btn w-full py-3 px-5 rounded-xl font-semibold text-xs tracking-wider uppercase border border-gray-200 group-hover:border-primary text-gray-700 group-hover:text-primary hover:bg-primary hover:text-white! transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <span>{item.buttonText}</span>
                  <FiArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300 ease-in-out" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
