"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface ServicesCtaProps {
  tag?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function ServicesCta({
  tag = "START YOUR UAE JOURNEY",
  title = "Ready to Establish & Scale Your Business in Dubai?",
  description = "Speak directly with our senior corporate setup consultants for a personalized advisory session tailored to your business activities and growth plans.",
  buttonText = "REQUEST A FREE CONSULTATION",
  buttonHref = "/#contact-us",
}: ServicesCtaProps) {
  return (
    <section className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
      {/* Subtle background red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {tag && (
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-primary uppercase mb-3">
              {tag}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8">
            {description}
          </p>
          <Link
            href={buttonHref}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary hover:bg-[#c8191e] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-primary/30 active:scale-95 cursor-pointer"
          >
            <span>{buttonText}</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
