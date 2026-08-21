"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const statsData = [
  { end: 17, suffix: "+", label: "Years In The Business" },
  { end: 1540, suffix: "+", label: "Happy Customers" },
  { end: 25, suffix: "+", label: "Team Members" },
  { end: 14, suffix: "+", label: "Languages Spoken" },
  { end: 10, suffix: "+", label: "Industry Awards" },
];

function AnimatedCounter({ end, duration = 2000, suffix = "+" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Smooth deceleration easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const Hero = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <section className="relative w-full overflow-hidden pt-40 md:pt-35 lg:pt-22">
      {/* Background Image */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col  lg:block">
        {/* Text block: normal flow on mobile/tablet so it can never be covered;
            only becomes an absolutely-centered min-h-screen block at lg+ */}
        <div className="site-container flex flex-1 items-center  py-20 md:py-24 lg:min-h-screen lg:py-0">
          <div className="w-full flex flex-col items-center md:items-start lg:items-start text-center  md:text-start lg:text-start">
            {/* Heading */}
            <h1 className="text-[26px] font-normal leading-tight tracking-[-0.5px] lg:w-2/3 text-white sm:text-[28px] md:text-[32px] md:leading-[1.15] md:tracking-[-1px] lg:text-[40px] lg:leading-[1.1] lg:tracking-[-1.5px]">
              Build Your Company within our
              <br className="hidden md:block" /> Global{" "}
              <span className="text-[#E02126]">Emirate Hub</span> Business
              Community
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[95%] text-[14px] leading-[1.55] text-white/90 sm:max-w-[90%] sm:text-[15px] md:mt-5 md:max-w-[80%] md:text-[17px] md:leading-normal lg:mt-6 lg:max-w-212.5 lg:text-[16px] lg:leading-[1.45]">
              EMIRATE HUB provides business setup services with world-class
              infrastructure, state-of-
              <br className="hidden" /> the-art facilities, and business
              friendly regulations, making it an ideal destination
              <br className="hidden" /> for foreign investors looking to set up
              and grow their business.
            </p>

            {/* Button */}
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
                REQUEST INFORMATION
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

        {/* Stats Cards: sits in normal document flow (below the text) on
            mobile/tablet so it never overlaps the hero content; switches to
            an absolutely-positioned overlay bar only at lg+ to match the
            original desktop design. */}
        <div className="w-full bg-black/40 backdrop-blur-[2px] lg:mt-0">
          <div className="site-container">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 sm:gap-y-8 md:grid-cols-3 md:gap-y-10 md:py-10 lg:grid-cols-5 lg:gap-0 lg:py-12">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center ${index === statsData.length - 1 ? "col-span-2 md:col-span-1" : ""
                    }`}
                >
                  <span className="text-[24px] font-medium text-[#E02126] sm:text-[28px] md:text-[32px] lg:text-[36px]">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </span>
                  <span className="mt-1 text-[12px] text-white/80 sm:text-[13px] md:text-[14px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;