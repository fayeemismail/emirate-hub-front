"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import rawHeroData from "@/data/home/hero.json";
import { HeroData } from "@/types/home/hero";
import HeroPanoramaBackground from "./HeroPanoramaBackground";

const Hero = () => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const data: HeroData = rawHeroData as HeroData;

  if (!data.active) {
    return null;
  }

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      router.push(data.buttonHref || "/coming-soon");
    }, 400);
  };

  return (
    <section className="relative w-full overflow-hidden pt-[calc(5rem+env(safe-area-inset-top,0px))] md:pt-20 lg:pt-22">
      {/* Interactive Loop Panorama Background (Supports horizontal drag/swipe, scroll-driven parallax, and ambient drift) */}
      <HeroPanoramaBackground
        imageSrc={data.backgroundImage || "/images/hero-panorama.jpg"}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col lg:block pointer-events-none">
        {/* Text block: normal flow on mobile/tablet so it can never be covered;
            only becomes an absolutely-centered min-h-screen block at lg+ */}
        <div className="site-container flex flex-1 items-center py-20 md:py-24 lg:min-h-screen lg:py-0 pointer-events-none">
          <div className="w-full flex flex-col items-center md:items-start lg:items-start text-start md:text-start lg:text-start pointer-events-none">
            {/* Heading */}
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.5px] lg:max-w-3xl text-white md:text-[38px] md:leading-[1.15] md:tracking-[-1px] lg:text-[44px] lg:leading-[1.15] lg:tracking-[-1.5px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {data.heading.boldKeyword ? (
                <>
                  <span>{data.heading.prefix?.trim()}</span>{" "}
                  <span className="relative inline font-bold text-white">
                    {data.heading.boldKeyword.trim()}
                    {data.heading.hasSparkle ? (
                      <span
                        className="pointer-events-none absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 inline-flex items-center justify-center select-none"
                        aria-hidden="true"
                      >
                        {/* Soft ambient glow */}
                        <span className="absolute h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-white/30 blur-[2px] animate-pulse" />
                        {/* 4-point twinkling sparkle star */}
                        <svg
                          className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 text-white animate-sparkle"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
                        </svg>
                        {/* Pinpoint bright core */}
                        <span className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_4px_#ffffff]" />
                      </span>
                    ) : null}
                  </span>
                  {data.heading.middle ? (
                    <>
                      {" "}
                      <span>{data.heading.middle.trim()}</span>
                    </>
                  ) : null}
                </>
              ) : (
                data.heading.prefix
              )}
              <br className="" />
              <span className="text-[#E02126] font-bold">
                {data.heading.highlightedText}
              </span>{" "}
              <br className="block md:hidden lg:hidden " />
              {data.heading.suffix}
            </h1>

            {/* Sub Heading & Description */}
            <div className="mt-4 max-w-[95%] sm:max-w-[90%] md:mt-5 md:max-w-[85%] lg:mt-6 lg:max-w-212.5 space-y-3">
              <p className="text-[15px] sm:text-[16px] md:text-[18px] lg:text-[19px] font-bold lg:font-medium text-white/95 leading-snug">
                {data.subheading}
              </p>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.6] text-white/80 font-medium lg:font-light">
                {data.description}
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleClick}
              className="group relative z-10 mt-6 h-11 sm:h-12 md:h-13 inline-flex items-center gap-4 sm:gap-5 md:gap-7 lg:gap-8 pl-3 pr-6 sm:pl-4 sm:pr-7 md:pl-4 md:pr-8 cursor-pointer overflow-hidden rounded-full transition-all duration-300 active:scale-95 select-none focus:outline-none pointer-events-auto"
            >
              {/* Red Round Circle background that animates on hover and click */}
              <span
                className={`absolute left-0 top-0 rounded-full bg-[#E02126] transition-all duration-500 ease-in-out group-hover:w-full group-hover:h-full group-active:w-full group-active:h-full z-0 shadow-sm ${
                  isClicked ? "w-full h-full" : "w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13"
                }`}
              />

              {/* Button Text */}
              <span
                className={`relative z-10 text-[12px] sm:text-[13px] md:text-[14px] font-normal text-white group-hover:text-black group-active:text-black transition-colors duration-300 tracking-wider uppercase pl-2 ${
                  isClicked ? "text-black!" : ""
                }`}
              >
                {data.buttonText}
              </span>

              {/* Right Arrow */}
              <span
                className={`relative z-10 text-[20px] leading-none sm:text-[24px] md:text-[28px] text-white group-hover:text-black group-active:text-black group-hover:translate-x-2 group-active:translate-x-2 transition-all duration-300 ease-in-out ${
                  isClicked ? "text-black! translate-x-2" : ""
                }`}
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;