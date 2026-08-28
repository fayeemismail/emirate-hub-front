"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { LuSparkles, LuClock, LuShieldCheck } from "react-icons/lu";
import ContactForm from "@/components/common/ContactForm";

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ContactUs() {
  return (
    <section
      id="contact-us"
      className="py-16 md:py-24 bg-linear-to-b from-[#F8F6FB] via-white to-[#F8F6FB] overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      <div className="site-container px-4 sm:px-6 md:px-8">
        {/* Top Heading Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={headerVariants}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          {/* Subtitle Badge */}
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3 flex items-center gap-1.5">
            <LuSparkles className="w-3.5 h-3.5 text-primary" />
            <span>LET&apos;S TALK BUSINESS</span>
          </span>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            Connect With Our <span className="text-primary">Experts</span>
          </h2>

          {/* Descriptive Subtitle */}
          <p className="text-gray-500 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
            Have questions about setting up your company in the UAE? Send us a message and our certified setup advisors will get back to you promptly.
          </p>
        </motion.div>

        {/* 2-Column Grid: Photo + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          {/* Photo Column */}
          <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-full rounded-3xl overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.08)] group">
            <Image
              src="/images/contact-person.jpg"
              alt="Connect With Us - Business Consultation"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Soft Dark Gradient Overlay at bottom for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Floating Glassmorphic Badge / Advisor Info */}
            <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Advisors Available Online
                </span>
              </div>
              <p className="text-sm sm:text-base font-medium text-white/95 leading-snug">
                Get free 1-on-1 personalized advisory tailored to your business goals.
              </p>
              <div className="flex items-center gap-4 text-xs text-white/80 pt-1">
                <span className="flex items-center gap-1">
                  <LuClock className="w-3.5 h-3.5" /> 24h Response
                </span>
                <span className="flex items-center gap-1">
                  <LuShieldCheck className="w-3.5 h-3.5" /> 100% Confidential
                </span>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100/90 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-light">
                Fill out the form below and our team will get in touch with you shortly.
              </p>
            </div>
            <ContactForm subtitle="" />
          </div>
        </div>
      </div>
    </section>
  );
}


