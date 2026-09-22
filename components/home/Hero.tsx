"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import rawHeroData from "@/data/home/hero.json";
import { HeroData } from "@/types/home/hero";
import Hero3DCanvas from "./Hero3DCanvas";

const Hero = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
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
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-20 md:pt-20 lg:pt-22 select-none"
    >
      {/* Background Image */}
      <Image
        src={data.backgroundImage || "/images/hero-bg.png"}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />

      {/* 3D Celestial Gyroscope & Interactive Particle Nexus */}
      <Hero3DCanvas sectionRef={sectionRef} />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col lg:block pointer-events-none">
        {/* Text block: normal flow on mobile/tablet so it can never be covered;
            only becomes an absolutely-centered min-h-screen block at lg+ */}
        <div className="site-container flex flex-1 items-center py-20 md:py-24 lg:min-h-screen lg:py-0">
          <div className="w-full flex flex-col items-center md:items-start lg:items-start text-start md:text-start lg:text-start">
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[28px] font-medium leading-tight tracking-[-0.5px] lg:max-w-3xl text-white md:text-[38px] md:leading-[1.15] md:tracking-[-1px] lg:text-[44px] lg:leading-[1.15] lg:tracking-[-1.5px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            >
              {data.heading.prefix}
              <br className="" />
              <span className="text-[#E02126] font-bold">
                {data.heading.highlightedText}
              </span>{" "}
              <br className="block md:hidden lg:hidden " />
              {data.heading.suffix}
            </motion.h1>

            {/* Sub Heading & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-[95%] sm:max-w-[90%] md:mt-5 md:max-w-[85%] lg:mt-6 lg:max-w-212.5 space-y-3"
            >
              <p className="text-[15px] sm:text-[16px] md:text-[18px] lg:text-[19px] font-bold lg:font-medium text-white/95 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                {data.subheading}
              </p>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.6] text-white/80 font-medium lg:font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                {data.description}
              </p>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto"
            >
            <button
              type="button"
              onClick={handleClick}
              className="group relative z-10 mt-6 h-11 sm:h-12 md:h-13 inline-flex items-center gap-4 sm:gap-5 md:gap-7 lg:gap-8 pl-3 pr-6 sm:pl-4 sm:pr-7 md:pl-4 md:pr-8 cursor-pointer overflow-hidden rounded-full transition-all duration-300 active:scale-95 select-none focus:outline-none"
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;