"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import rawServiceData from "@/data/home/service.json";
import { HomeServiceData } from "@/types/home/service";

interface ServiceProps {
  data?: HomeServiceData | null;
}

export default function Service({ data: propData }: ServiceProps) {
  const router = useRouter();
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const data: HomeServiceData =
    propData && propData.active !== false && propData.services?.length
      ? propData
      : (rawServiceData as unknown as HomeServiceData);

  if (!data.active) {
    return null;
  }

  const activeServices = data.services.filter(
    (service) => service.active !== false
  );

  if (activeServices.length === 0) {
    return null;
  }

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });

    setActiveMobileIndex(closestIdx);
  }, []);

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveMobileIndex(index);
    }
  };

  return (
    <section
      className="py-16 md:py-24 lg:py-28 bg-[#F2F3EE]/50 overflow-hidden"
      style={data.backgroundColor ? { backgroundColor: data.backgroundColor } : undefined}
    >
      <div className="site-container">
        {/* Subtitle Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-14 px-4">
          {/* Small Top Subtitle */}
          {data.badge && (
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">
              {data.badge}
            </span>
          )}

          {/* Main Title with Emirate Hub in Red */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4"
            style={data.titleColor ? { color: data.titleColor } : undefined}
          >
            {data.titlePrefix}
            <span
              className="text-primary"
              style={data.highlightColor ? { color: data.highlightColor } : undefined}
            >
              {data.highlightedTitle}
            </span>
            {data.titleSuffix}
          </h2>

          {/* Descriptive Subtitle Text */}
          <p
            className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl font-light"
            style={data.descriptionColor ? { color: data.descriptionColor } : undefined}
          >
            {data.description}
          </p>
        </div>

        {/* View All Services Top Right Button (Desktop / Tablet) */}
        {data.viewAllButtonText && (
          <div className="hidden md:flex justify-end items-center mb-8 md:mb-10">
            <button
              type="button"
              onClick={() => router.push(data.viewAllButtonHref || "/services")}
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
            >
              <span>{data.viewAllButtonText}</span>
              <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </button>
          </div>
        )}

        {/* 1. Desktop Alternating Services Rows (lg and above) */}
        <div className="hidden lg:block space-y-24">
          {activeServices.map((service, index) => {
            const isEven = index % 2 === 1; // 2nd row: Image Left, Details Right
            const serviceImage =
              service.image || `/images/service-${(index % 3) + 1}.jpg`;

            return (
              <div key={service.id || service.slug || index}>
                <div className="grid grid-cols-12 gap-14 items-center">
                  {/* Image Column - Alternating on desktop */}
                  <div
                    className={`col-span-6 ${
                      isEven ? "order-1" : "order-2"
                    }`}
                  >
                    <div
                      onClick={() => router.push(`/services#${service.slug}`)}
                      className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] group bg-gray-100 cursor-pointer"
                    >
                      <Image
                        src={serviceImage}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="50vw"
                      />
                    </div>
                  </div>

                  {/* Details Column - Alternating on desktop */}
                  <div
                    className={`col-span-6 flex flex-col justify-center ${
                      isEven ? "order-2" : "order-1"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-primary tracking-widest">
                        {service.number}
                      </span>
                      <span className="h-px w-8 bg-primary/40" />
                      <span
                        className="text-xs font-semibold uppercase tracking-widest text-gray-400"
                        style={service.cardTagColor ? { color: service.cardTagColor } : undefined}
                      >
                        {service.tag}
                      </span>
                    </div>

                    <Link href={`/services/${service.slug}`}>
                      <h3
                        style={{
                          "--service-title-color": service.cardTitleColor || "#111827",
                        } as React.CSSProperties}
                        className="text-4xl font-bold text-[var(--service-title-color)] tracking-tight leading-tight mb-4 hover:text-primary transition-colors cursor-pointer"
                      >
                        {service.title}
                      </h3>
                    </Link>

                    <p
                      className="text-gray-600 text-lg leading-relaxed font-light mb-6 max-w-xl"
                      style={service.cardTextColor ? { color: service.cardTextColor } : undefined}
                    >
                      {service.description}
                    </p>

                    {/* Action Link */}
                    <div>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group inline-flex items-center gap-2.5 text-primary hover:text-[#c8191e] font-bold text-sm tracking-wider uppercase transition-colors duration-200 cursor-pointer"
                      >
                        <span className="relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary group-hover:after:w-full after:transition-all after:duration-300">
                          {service.buttonText || "LEARN MORE"}
                        </span>
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Small Screens Horizontal Scroll (< lg) with Smooth Snap and Dynamic Animation */}
        <div className="block lg:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-5 sm:gap-6 -mx-4 px-4 sm:-mx-6 sm:px-6 pb-4 pt-1 [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {activeServices.map((service, index) => {
              const serviceImage =
                service.image || `/images/service-${(index % 3) + 1}.jpg`;
              const isActive = index === activeMobileIndex;

              return (
                <div
                  key={service.id || service.slug || index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`w-[85vw] sm:w-[70vw] md:w-[60vw] max-w-[420px] shrink-0 snap-center flex flex-col transition-all duration-500 ease-out ${
                    isActive ? "scale-100 opacity-100" : "scale-[0.97] opacity-85"
                  }`}
                >
                  {/* Image Column */}
                  <div
                    onClick={() => router.push(`/services#${service.slug}`)}
                    className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] group bg-gray-100 cursor-pointer mb-5"
                  >
                    <Image
                      src={serviceImage}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 85vw, 50vw"
                    />
                  </div>

                  {/* Details Column */}
                  <div className="flex flex-col flex-1 px-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-primary tracking-widest">
                        {service.number}
                      </span>
                      <span className="h-px w-8 bg-primary/40" />
                      <span
                        className="text-xs font-semibold uppercase tracking-widest text-gray-400"
                        style={service.cardTagColor ? { color: service.cardTagColor } : undefined}
                      >
                        {service.tag}
                      </span>
                    </div>

                    <Link href={`/services/${service.slug}`}>
                      <h3
                        style={{
                          "--service-title-color": service.cardTitleColor || "#111827",
                        } as React.CSSProperties}
                        className="text-2xl sm:text-3xl font-bold text-[var(--service-title-color)] tracking-tight leading-tight mb-3 hover:text-primary transition-colors cursor-pointer"
                      >
                        {service.title}
                      </h3>
                    </Link>

                    <p
                      className="text-gray-600 text-sm sm:text-base leading-relaxed font-light mb-5"
                      style={service.cardTextColor ? { color: service.cardTextColor } : undefined}
                    >
                      {service.description}
                    </p>

                    {/* Action Link */}
                    <div className="mt-auto">
                      <Link
                        href={`/services/${service.slug}`}
                        className="group inline-flex items-center gap-2.5 text-primary hover:text-[#c8191e] font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors duration-200 cursor-pointer"
                      >
                        <span className="relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary group-hover:after:w-full after:transition-all after:duration-300">
                          {service.buttonText || "LEARN MORE"}
                        </span>
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Smooth Pagination Indicator Dots for small screens */}
          {activeServices.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {activeServices.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollToCard(dotIdx)}
                  aria-label={`Go to service ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === activeMobileIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile View All Services Bottom Button */}
        {data.viewAllButtonText && (
          <div className="flex md:hidden justify-center items-center mt-12 sm:mt-14">
            <button
              type="button"
              onClick={() => router.push(data.viewAllButtonHref || "/services")}
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
            >
              <span>{data.viewAllButtonText}</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
