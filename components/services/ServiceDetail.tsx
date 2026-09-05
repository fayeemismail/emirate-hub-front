"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiClock,
  FiGlobe,
  FiShield,
  FiHeadphones,
  FiChevronRight,
} from "react-icons/fi";
import { ServiceDetailData } from "@/lib/services";

interface ServiceDetailProps {
  service: ServiceDetailData;
  relatedServices: ServiceDetailData[];
}

export default function ServiceDetail({
  service,
  relatedServices,
}: ServiceDetailProps) {
  const router = useRouter();

  return (
    <div className="bg-[#FAF9F6]/80 min-h-screen pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24">
      <div className="site-container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Navigation & Breadcrumbs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 hover:text-primary hover:border-primary/40 shadow-xs transition-all duration-300 group"
          >
            <FiArrowLeft className="w-3.5 h-3.5 text-gray-500 group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
            <span>Back to All Services</span>
          </Link>

          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-400"
          >
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <FiChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link
              href="/services"
              className="hover:text-gray-900 transition-colors"
            >
              Services
            </Link>
            <FiChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-primary font-semibold truncate max-w-[180px] sm:max-w-xs">
              {service.title}
            </span>
          </nav>
        </div>

        {/* Header Section */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
              {service.number} • {service.tag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            {service.title}
          </h1>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl">
            {service.description}
          </p>
        </div>

        {/* Main Content Layout: 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Visuals & Core Information (8 Cols) */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* Featured Image */}
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 bg-gray-100 group">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full border border-white/20">
                Service {service.number}
              </div>
            </div>

            {/* Inclusions & Highlights Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  {service.featuresHeading || "What's Included"}
                </h2>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                  Included Features
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {service.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-primary/30 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works (Simple 3 Steps) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-2">
                How It Works
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-light mb-6">
                Our clear, streamlined 3-step execution process for guaranteed turnaround.
              </p>

              <div className="space-y-4">
                {service.steps.map((stepItem, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all bg-white"
                  >
                    <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                      {stepItem.step}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight mb-1">
                        {stepItem.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                        {stepItem.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Action & Details Card (4 Cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            {/* Quick Specs Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 tracking-tight mb-5 pb-3 border-b border-gray-100">
                Service Overview
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiClock className="w-4 h-4 text-primary" />
                    <span>Estimated Turnaround</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {service.timeline}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiGlobe className="w-4 h-4 text-primary" />
                    <span>Jurisdiction</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-right max-w-[150px] truncate">
                    {service.jurisdiction}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiShield className="w-4 h-4 text-primary" />
                    <span>Compliance</span>
                  </div>
                  <span className="font-semibold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full text-[11px]">
                    100% Guaranteed
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiHeadphones className="w-4 h-4 text-primary" />
                    <span>Advisory</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    Dedicated Manager
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-7 pt-5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => router.push(service.buttonHref || "/#contact-us")}
                  className="w-full py-3.5 px-5 rounded-xl bg-primary hover:bg-[#c8191e] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span>{service.buttonText || "ENQUIRE NOW"}</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-gray-400 text-center mt-2.5 font-light">
                  Free 1-on-1 strategic consultation included
                </p>
              </div>
            </div>

            {/* Direct Support Card */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-[#0e121a] to-[#1a1f2c] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
              <span className="text-[10px] font-bold tracking-widest text-primary uppercase block mb-1.5">
                EXPERT ASSISTANCE
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2">
                Have specific questions?
              </h4>
              <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">
                Our Dubai-based corporate specialists are ready to guide you through licenses, visas, and banking setups.
              </p>
              <Link
                href="/#contact-us"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-white transition-colors"
              >
                <span>Speak with an advisor</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Explore Other Services */}
        {relatedServices.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-12 border-t border-gray-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-primary tracking-widest uppercase block mb-1">
                  MORE SOLUTIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Explore Other Corporate Services
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-gray-900 transition-colors"
              >
                <span>View All Services</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className="group bg-white rounded-3xl p-5 border border-gray-200/90 hover:border-primary/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                        {item.number}
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                      {item.tag}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 tracking-tight mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-light mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary pt-2 border-t border-gray-100 group-hover:translate-x-1 transition-transform">
                    <span>View Service Details</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
