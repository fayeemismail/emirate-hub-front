"use client";

import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiUsers } from "react-icons/fi";
import rawAboutHeroData from "@/data/about/aboutHero.json";
import { AboutHeroData } from "@/types/about/aboutHero";

export default function AboutHero() {
  const data: AboutHeroData = rawAboutHeroData as AboutHeroData;

  if (!data.active) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-white pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-18 md:pb-20">
      <div className="site-container relative z-10">
        {/* Top Centered Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-4 bg-gray-100 border border-gray-200 px-4 py-1.5 rounded-full shadow-xs">
            <Link
              href={data.breadcrumb.parentHref}
              className="hover:text-gray-900 transition-colors"
            >
              {data.breadcrumb.parentLabel}
            </Link>
            <FiChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-primary font-semibold">
              {data.breadcrumb.label}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-gray-900 tracking-tight leading-tight">
            {data.title}{" "}
            {data.highlightedTitle && (
              <span className="text-primary">{data.highlightedTitle}</span>
            )}
          </h1>
        </div>

        {/* 3-Column Image & Center Impact Card Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch max-w-6xl mx-auto">
          {/* Left Column: 2 Stacked Images */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-5 lg:gap-6 justify-between">
            {/* Top Left Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group bg-gray-100 border border-gray-200/80">
              <Image
                src={data.images.topLeft.src}
                alt={data.images.topLeft.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Bottom Left Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group bg-gray-100 border border-gray-200/80">
              <Image
                src={data.images.bottomLeft.src}
                alt={data.images.bottomLeft.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Center Column: Dark Impact Feature Card */}
          <div className="md:col-span-4 flex">
            <div className="w-full rounded-2xl sm:rounded-3xl bg-[#0d1015] border border-white/10 shadow-2xl p-6 sm:p-8 lg:p-9 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[360px] md:min-h-full">
              {/* Geometric Background Pattern SVG Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
                    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px, 24px 24px, 24px 24px",
                }}
              />

              {/* Radial Center Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

              {/* Icon Badge */}
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white mb-5 sm:mb-6 shadow-inner">
                <FiUsers className="w-6 h-6 text-white" />
              </div>

              {/* Card Title */}
              <h2 className="relative z-10 text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3.5 sm:mb-4">
                {data.centerCard.title}
              </h2>

              {/* Card Description */}
              <p className="relative z-10 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {data.centerCard.description}
              </p>
            </div>
          </div>

          {/* Right Column: 2 Stacked Images */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-5 lg:gap-6 justify-between">
            {/* Top Right Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group bg-gray-100 border border-gray-200/80">
              <Image
                src={data.images.topRight.src}
                alt={data.images.topRight.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Bottom Right Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group bg-gray-100 border border-gray-200/80">
              <Image
                src={data.images.bottomRight.src}
                alt={data.images.bottomRight.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Bottom Description (Positioned below the images grid) */}
        <div className="mt-8 sm:mt-10 md:mt-12 max-w-3xl mx-auto text-center px-4">
          <p className="text-gray-600 text-sm sm:text-base md:text-[17px] font-normal leading-relaxed tracking-wide">
            {data.bottomDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
