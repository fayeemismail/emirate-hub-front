"use client";

import { useState } from "react";
import {
  FiMapPin,
  FiClock,
  FiExternalLink,
  FiPlus,
  FiMinus,
  FiRotateCcw,
} from "react-icons/fi";
import { LuSparkles, LuBuilding2 } from "react-icons/lu";
import rawLocationData from "@/data/about/location.json";
import { LocationData } from "@/types/about/location";

interface OfficeLocationMapProps {
  data?: LocationData | null;
}

export default function OfficeLocationMap({ data: propData }: OfficeLocationMapProps) {
  const data: LocationData =
    propData && propData.active !== false && propData.header
      ? propData
      : (rawLocationData as unknown as LocationData);

  const [zoom, setZoom] = useState(data.defaultZoom || 16);

  if (!data.active) {
    return null;
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, data.maxZoom || 19));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, data.minZoom || 12));
  };

  const handleResetZoom = () => {
    setZoom(data.defaultZoom || 16);
  };

  const mapSrc = (data.mapEmbedUrl || rawLocationData.mapEmbedUrl).replace(
    "{zoom}",
    zoom.toString()
  );

  const cards = data.cards || rawLocationData.cards;
  const headOffice = cards.headOffice || rawLocationData.cards.headOffice;
  const accessibility =
    cards.accessibility || rawLocationData.cards.accessibility;
  const workingHours =
    cards.workingHours || rawLocationData.cards.workingHours;
  const schedule =
    workingHours.schedule || rawLocationData.cards.workingHours.schedule;

  return (
    <section
      style={data.backgroundColor ? { backgroundColor: data.backgroundColor } : undefined}
      className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100 overflow-hidden"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          {data.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
              <LuSparkles className="w-3.5 h-3.5" />
              <span>{data.badge}</span>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <span className="w-1.5 h-7 sm:h-9 bg-primary rounded-full shrink-0" />
            <h2
              style={data.titleColor ? { color: data.titleColor } : undefined}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight"
            >
              {data.header.titlePrefix}
              <span
                style={data.highlightColor ? { color: data.highlightColor } : undefined}
                className="text-primary"
              >
                {data.header.highlight}
              </span>
            </h2>
          </div>

          <p
            style={data.descriptionColor ? { color: data.descriptionColor } : undefined}
            className="text-gray-500 text-sm sm:text-base md:text-lg font-light leading-relaxed pl-4.5 sm:pl-5.5"
          >
            {data.header.description}
          </p>
        </div>

        {/* 2-Column Layout: Details on left, Interactive Map on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Office Details Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            {/* 1. Head Office Address Card */}
            <div
              style={data.cardBackgroundColor ? { backgroundColor: data.cardBackgroundColor } : undefined}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    style={data.cardTextColor ? { color: data.cardTextColor } : undefined}
                    className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
                  >
                    {headOffice.badge}
                  </h3>
                  <p
                    style={data.cardTitleColor ? { color: data.cardTitleColor } : undefined}
                    className="text-gray-900 font-bold text-base sm:text-lg leading-snug"
                  >
                    {headOffice.unit}
                  </p>
                  <p className="text-gray-700 text-sm font-medium">
                    {headOffice.building}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                    {headOffice.location}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Accessibility & Transit Card */}
            <div
              style={data.cardBackgroundColor ? { backgroundColor: data.cardBackgroundColor } : undefined}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 shrink-0">
                  <LuBuilding2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    style={data.cardTextColor ? { color: data.cardTextColor } : undefined}
                    className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
                  >
                    {accessibility.badge}
                  </h3>
                  <p
                    style={data.cardTitleColor ? { color: data.cardTitleColor } : undefined}
                    className="text-gray-900 text-sm sm:text-base font-semibold"
                  >
                    {accessibility.title}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed">
                    {accessibility.description}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Working Hours Card */}
            <div
              style={data.cardBackgroundColor ? { backgroundColor: data.cardBackgroundColor } : undefined}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 shrink-0">
                  <FiClock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    style={data.cardTextColor ? { color: data.cardTextColor } : undefined}
                    className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
                  >
                    {workingHours.badge}
                  </h3>
                  <div className="text-xs sm:text-sm space-y-1.5">
                    {schedule.map((item, idx) => (
                      <p key={idx} className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">{item.days}</span>
                        <span
                          className={
                            item.isClosed
                              ? "text-gray-400 font-light"
                              : "text-gray-700 font-normal"
                          }
                        >
                          {item.hours}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button: Open in Google Maps */}
            <div className="pt-2">
              <a
                href={data.googleMapsUrl || rawLocationData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-[#c8191e] transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]"
              >
                <FiExternalLink className="w-4 h-4" />
                <span>{data.buttonText || rawLocationData.buttonText}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Interactive Google Map */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative w-full h-[420px] sm:h-[480px] lg:h-full min-h-[420px] rounded-3xl overflow-hidden border border-gray-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.06)] bg-gray-100">
              {/* Embedded Google Map */}
              <iframe
                title="Emirate Hub Office Location - Iris Bay Tower, Business Bay, Dubai"
                src={mapSrc}
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Custom Interactive Zoom & Control Panel (Top Right) */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 shadow-lg rounded-xl overflow-hidden bg-white/95 backdrop-blur-md border border-gray-200/80 p-1">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  aria-label="Zoom in"
                  title="Zoom In (+)"
                  className="w-9 h-9 flex items-center justify-center text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
                <div className="w-full h-px bg-gray-200" />
                <button
                  type="button"
                  onClick={handleZoomOut}
                  aria-label="Zoom out"
                  title="Zoom Out (-)"
                  className="w-9 h-9 flex items-center justify-center text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <div className="w-full h-px bg-gray-200" />
                <button
                  type="button"
                  onClick={handleResetZoom}
                  aria-label="Reset zoom"
                  title="Reset Zoom"
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-xs font-semibold"
                >
                  <FiRotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
