"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      router.push("/coming-soon");
    }, 400);
  };

  return (
    <section className="relative w-full overflow-hidden pt-20 md:pt-20 lg:pt-22">
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
      <div className="relative z-10 flex min-h-screen flex-col lg:block">
        {/* Text block: normal flow on mobile/tablet so it can never be covered;
            only becomes an absolutely-centered min-h-screen block at lg+ */}
        <div className="site-container flex flex-1 items-center py-20 md:py-24 lg:min-h-screen lg:py-0">
          <div className="w-full flex flex-col items-center md:items-start lg:items-start text-center md:text-start lg:text-start">
            {/* Heading */}
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.5px] lg:max-w-3xl text-white sm:text-[32px] md:text-[38px] md:leading-[1.15] md:tracking-[-1px] lg:text-[44px] lg:leading-[1.15] lg:tracking-[-1.5px]">
              Your search for the right{" "} 
              <br className="" />
              <span className="text-[#E02126] font-bold">UAE business license</span> 
              <br className="block md:hidden lg:hidden " /> ends here.
            </h1>

            {/* Sub Heading & Description */}
            <div className="mt-4 max-w-[95%] sm:max-w-[90%] md:mt-5 md:max-w-[85%] lg:mt-6 lg:max-w-212.5 space-y-3">
              <p className="text-[15px] sm:text-[16px] md:text-[18px] lg:text-[19px] font-bold lg:font-medium text-white/95 leading-snug">
                Get the most cost-effective mainland or free zone setup with a partner you can trust.
              </p>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.6] text-white/80 font-medium lg:font-light">
                We deliver comprehensive, end-to-end solutions spanning business setup, licensing, visa processing, compliance, and corporate service equipping you to establish, expand, and maintain a thriving business in the UAE.
              </p>
            </div>

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
      </div>
    </section>
  );
};

export default Hero;