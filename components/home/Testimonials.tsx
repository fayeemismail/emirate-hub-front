"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuStar } from "react-icons/lu";
import { useRouter } from "next/navigation";
import rawTestimonialsData from "@/data/home/testimonials.json";
import { TestimonialsData } from "@/types/home/testimonials";

export default function Testimonials() {
  const router = useRouter();
  const data: TestimonialsData = rawTestimonialsData as TestimonialsData;

  if (!data.active) {
    return null;
  }

  const activeTestimonials = data.testimonials.filter(
    (item) => item.active !== false
  );

  if (activeTestimonials.length === 0) {
    return null;
  }

  return <TestimonialsContent data={data} testimonials={activeTestimonials} router={router} />;
}

function TestimonialsContent({
  data,
  testimonials,
  router,
}: {
  data: TestimonialsData;
  testimonials: typeof data.testimonials;
  router: ReturnType<typeof useRouter>;
}) {
  const defaultIndex = Math.min(3, Math.max(0, Math.floor(testimonials.length / 2)));
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const safeIndex = activeIndex >= testimonials.length ? 0 : activeIndex;
  const activeTestimonial = testimonials[safeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [testimonials.length]);

  // Smooth scroll active item into center view on mobile screens
  useEffect(() => {
    const activeEl = avatarRefs.current[safeIndex];
    const container = scrollContainerRef.current;
    if (activeEl && container && window.innerWidth < 768) {
      const containerWidth = container.clientWidth;
      const elementLeft = activeEl.offsetLeft;
      const elementWidth = activeEl.clientWidth;
      const scrollPosition = elementLeft - containerWidth / 2 + elementWidth / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [safeIndex]);

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-white overflow-hidden select-none">
      <div className="site-container px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-3 sm:mb-4">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-gray-500 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mb-6 px-2">
              {data.description}
            </p>
          )}

          {/* Book Now Pill Button */}
          {data.buttonText && (
            <button
              type="button"
              onClick={() => router.push(data.buttonHref || "/coming-soon")}
              className="px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-black text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-primary transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              {data.buttonText}
            </button>
          )}
        </div>

        {/* Sinusoidal Wave Track & Floating Avatars */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto md:overflow-visible pb-12 pt-6 px-2 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="relative min-w-[680px] md:min-w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] max-w-5xl lg:max-w-6xl mx-auto">
            {/* Background Sinusoidal Dotted SVG Path */}
            <svg
              viewBox="0 0 1000 300"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {/* Sinusoidal Dotted Curve Line */}
              <path
                d="M 0 120 C 30 105, 45 95, 60 95 C 100 95, 150 220, 200 220 C 260 220, 300 75, 350 75 C 410 75, 450 160, 500 160 C 550 160, 600 70, 650 70 C 710 70, 750 225, 800 225 C 860 225, 900 85, 940 85 C 970 85, 985 110, 1000 130"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeDasharray="4 6"
                fill="none"
              />

              {/* Decorative Intermediate Node Dots */}
              <circle cx="130" cy="160" r="4.5" fill="#111827" />
              <circle cx="275" cy="145" r="4" fill="#111827" />
              <circle cx="425" cy="120" r="4" fill="#111827" />
              <circle cx="575" cy="115" r="4" fill="#111827" />
              <circle cx="725" cy="150" r="4" fill="#111827" />
              <circle cx="870" cy="155" r="4.5" fill="#111827" />
            </svg>

            {/* Positioned Avatars along the Curve */}
            {testimonials.map((item, index) => {
              const isActive = index === safeIndex;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    avatarRefs.current[index] = el;
                  }}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    left: `${item.leftPercent}%`,
                    top: `${item.topPercent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center cursor-pointer z-10 select-none group"
                >
                  {/* Interactive Avatar Container with Smooth Zoom in place */}
                  <motion.div
                    whileHover={{ scale: isActive ? 1.15 : 1.1 }}
                    animate={{
                      scale: isActive ? 1.14 : 0.95,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 25,
                    }}
                    className={`relative rounded-full transition-all duration-300 ease-in-out p-0.5 sm:p-1 ${
                      isActive
                        ? "ring-2 ring-primary ring-offset-2 sm:ring-offset-4 ring-offset-white shadow-xl"
                        : "ring-1 ring-gray-200 hover:ring-gray-400 hover:shadow-md opacity-80 hover:opacity-100"
                    }`}
                  >
                    {/* Active Double Red Ring Accent */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border border-primary/40 -m-1 sm:-m-1.5 animate-pulse pointer-events-none" />
                    )}

                    <div
                      className={`relative overflow-hidden rounded-full aspect-square bg-gray-100 ${item.sizeClass}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isActive ? "scale-105" : "grayscale-15 group-hover:grayscale-0"
                        }`}
                      />
                    </div>
                  </motion.div>

                  {/* Customer Name below the Avatar */}
                  <div className="mt-2 sm:mt-2.5 max-w-[85px] sm:max-w-[110px] md:max-w-[130px] pointer-events-none">
                    <p
                      className={`text-[11px] sm:text-xs md:text-sm font-semibold tracking-tight transition-colors duration-300 truncate ${
                        isActive ? "text-primary font-bold scale-105" : "text-gray-600 group-hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-gray-400 truncate hidden sm:block">
                      {item.company}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Testimonial Display Bar with Navigation Arrows */}
        {activeTestimonial && (
          <div className="relative max-w-4xl mx-auto mt-4 sm:mt-6 md:mt-10 flex items-center justify-between gap-3 sm:gap-6 md:gap-8 px-2 sm:px-4">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-white hover:bg-primary hover:border-primary shadow-xs hover:shadow-md flex items-center justify-center shrink-0 transition-all duration-300 ease-in-out cursor-pointer active:scale-90"
            >
              <LuChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Animated Testimonial Quote & Info */}
            <div className="flex-1 text-center min-h-[100px] sm:min-h-[115px] flex items-center justify-center px-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-amber-400 mb-1.5 sm:mb-2">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <LuStar key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-gray-700 leading-relaxed max-w-2xl">
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </p>

                  {/* Author Info */}
                  <div className="mt-2.5 sm:mt-3 flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm">
                    <span className="font-bold text-gray-900">
                      {activeTestimonial.name}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">
                      {activeTestimonial.role}, {activeTestimonial.company}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-white hover:bg-primary hover:border-primary shadow-xs hover:shadow-md flex items-center justify-center shrink-0 transition-all duration-300 ease-in-out cursor-pointer active:scale-90"
            >
              <LuChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
