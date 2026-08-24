"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function BlogsAndNews() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="site-container">
        {/* Main Section Heading - Matching About and PriceCards style */}
        <div className="pb-4 text-center md:text-left">
          <h2 className="relative text-5xl md:text-6xl lg:text-6xl font-bold font-sans text-primary cursor-pointer inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.75 after:bg-primary hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">
            Blogs & News
          </h2>
        </div>

        {/* Subtitle */}
        <div className="mb-10 text-center md:text-left">
          <p className="text-gray-600 text-lg md:text-xl font-light">
            Keep up with the latest news
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* CARD 1: Top Left - Featured Dark Overlay Card */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl md:rounded-[24px] h-full min-h-[380px] md:min-h-[420px] flex flex-col justify-end p-6 md:p-8 group cursor-pointer shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop"
                alt="VAT Registration in Dubai 2026"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />

              <div className="relative z-10 max-w-xl">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug mb-3">
                  VAT Registration in Dubai 2026: A Practical Guide for UAE Businesses
                </h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                  If you are starting or growing a business in Dubai, VAT (Value Added Tax) registration is one of those compliance...
                </p>
                <span className="inline-block text-white text-xs md:text-sm font-semibold underline underline-offset-4 decoration-primary hover:text-primary transition-colors">
                  Read More
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2: Top Right - Vertical Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl md:rounded-[24px] border border-gray-200/80 overflow-hidden shadow-sm flex flex-col h-full group cursor-pointer hover:shadow-md transition-all duration-300">
              <div className="h-48 md:h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
                  alt="Compliance Obligations"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors">
                    When Your Business Changes, Your Compliance Obligations May Change Too
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                    When launching a new business in the UAE, the excitement of getting started can often overshadow the details of compliance...
                  </p>
                </div>
                <div>
                  <span className="inline-block text-primary text-xs md:text-sm font-semibold underline underline-offset-4 decoration-primary">
                    Read More
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: Bottom Left - Horizontal Split Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl md:rounded-[24px] border border-gray-200/80 overflow-hidden shadow-sm grid grid-cols-1 sm:grid-cols-12 h-full group cursor-pointer hover:shadow-md transition-all duration-300">
              <div className="sm:col-span-5 h-56 sm:h-full relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop"
                  alt="Strategic Partnership"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="sm:col-span-7 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors">
                    <span className="text-primary font-bold">Emirate Hub</span> and AIM Launch Strategic Partnership to Accelerate Cross-Border Investment & Business Growth
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                    Strategic partnership will strengthen international business engagement and connect innovation-led companies with global investors and stakeholders through AIM Congress 2026 ...
                  </p>
                </div>
                <div>
                  <span className="inline-block text-primary text-xs md:text-sm font-semibold underline underline-offset-4 decoration-primary">
                    Read More
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 4: Bottom Right - Vertical Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl md:rounded-[24px] border border-gray-200/80 overflow-hidden shadow-sm flex flex-col h-full group cursor-pointer hover:shadow-md transition-all duration-300">
              <div className="h-48 md:h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop"
                  alt="Corporate Tax Relief"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors">
                    UAE Corporate Tax: Small Business Relief Explained
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                    The UAE introduced Small Business Relief (SBR) to support small businesses during the initial implementation of the Corporate Tax regime. The relief...
                  </p>
                </div>
                <div>
                  <span className="inline-block text-primary text-xs md:text-sm font-semibold underline underline-offset-4 decoration-primary">
                    Read More
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated View All Button */}
        <div className="mt-10 md:mt-14 flex items-center">
          <button
            type="button"
            onClick={handleClick}
            className="group relative z-10 h-14 md:h-16 inline-flex items-center gap-6 pl-4 pr-8 cursor-pointer overflow-hidden rounded-full transition-all duration-300 active:scale-95 select-none focus:outline-none"
          >
            {/* Red Round Circle background that animates on hover and click */}
            <span
              className={`absolute left-0 top-0 rounded-full bg-primary transition-all duration-500 ease-in-out group-hover:w-full group-hover:h-full group-active:w-full group-active:h-full z-0 shadow-sm ${isClicked ? "w-full h-full" : "w-14 h-14 md:w-16 md:h-16"
                }`}
            />

            {/* Button Text */}
            <span
              className={`relative z-10 text-base md:text-lg tracking-widest font-normal text-gray-800 group-hover:text-white group-active:text-white transition-colors duration-300 uppercase pl-3 ${isClicked ? "text-white!" : ""
                }`}
            >
              VIEW ALL
            </span>

            {/* Red Right Arrow */}
            <FiArrowRight
              className={`relative z-10 w-7 h-7 text-primary group-hover:text-white group-active:text-white group-hover:translate-x-2 group-active:translate-x-2 transition-all duration-300 ease-in-out ${isClicked ? "text-white! translate-x-2" : ""
                }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
