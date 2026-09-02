"use client";

import Image from "next/image";
import rawVisionData from "@/data/about/vision.json";
import { VisionData } from "@/types/about/vision";

export default function OurVision() {
  const data: VisionData = rawVisionData as VisionData;

  if (!data.active) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-[#F8F6FB] via-white to-[#F8F6FB] overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12 md:mb-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <span className="w-1.5 h-7 sm:h-9 bg-primary rounded-full shrink-0" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              {data.header.title}
            </h2>
          </div>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg font-light leading-relaxed pl-4.5 sm:pl-5.5">
            {data.header.subtitle}
          </p>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {/* Column 1: Image on Top, Vision Text on Bottom */}
          <div className="flex flex-col justify-between h-full">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group bg-gray-100 border border-gray-200/80">
              <Image
                src={data.images.column1.src}
                alt={data.images.column1.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="pt-5 sm:pt-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-2">
                {data.vision.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                {data.vision.description}
              </p>
            </div>
          </div>

          {/* Column 2: Full-Height Tall Image */}
          <div className="flex flex-col h-full">
            <div className="relative h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group bg-gray-100 border border-gray-200/80">
              <Image
                src={data.images.column2.src}
                alt={data.images.column2.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Column 3: Mission Text on Top, Image on Bottom */}
          <div className="flex flex-col justify-between h-full">
            <div className="pb-5 sm:pb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-2">
                {data.mission.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                {data.mission.description}
              </p>
            </div>
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group bg-gray-100 border border-gray-200/80 mt-auto">
              <Image
                src={data.images.column3.src}
                alt={data.images.column3.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Column 4: Full-Height Tall Image */}
          <div className="flex flex-col h-full">
            <div className="relative h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group bg-gray-100 border border-gray-200/80">
              <Image
                src={data.images.column4.src}
                alt={data.images.column4.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
