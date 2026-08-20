"use client";

import Image from "next/image";

const Hero = () => {
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
              className="mt-6 flex h-11 items-center gap-4 rounded-full bg-[#E02126] px-5 text-[12px] font-normal text-white transition-transform duration-300 hover:scale-[1.03] sm:h-12 sm:gap-5 sm:px-6 sm:text-[13px] md:mt-7 md:h-13 md:gap-7 md:px-7 md:text-[14px] lg:gap-8"
            >
              <span>REQUEST INFORMATION</span>
              <span className="text-[20px] leading-none sm:text-[24px] md:text-[28px]">
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
          <div className="site-container ">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 sm:gap-y-8 md:grid-cols-3 md:gap-y-10 md:py-10 lg:grid-cols-5 lg:gap-0 lg:py-12">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-[24px] font-medium text-[#E02126] sm:text-[28px] md:text-[32px] lg:text-[36px]">
                  17+
                </span>
                <span className="mt-1 text-[12px] text-white/80 sm:text-[13px] md:text-[14px]">
                  Years In The Business
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-[24px] font-medium text-[#E02126] sm:text-[28px] md:text-[32px] lg:text-[36px]">
                  80,000+
                </span>
                <span className="mt-1 text-[12px] text-white/80 sm:text-[13px] md:text-[14px]">
                  Happy Customers
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-[24px] font-medium text-[#E02126] sm:text-[28px] md:text-[32px] lg:text-[36px]">
                  250+
                </span>
                <span className="mt-1 text-[12px] text-white/80 sm:text-[13px] md:text-[14px]">
                  Team Members
                </span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-[24px] font-medium text-[#E02126] sm:text-[28px] md:text-[32px] lg:text-[36px]">
                  40+
                </span>
                <span className="mt-1 text-[12px] text-white/80 sm:text-[13px] md:text-[14px]">
                  Languages Spoken
                </span>
              </div>

              {/* Stat 5 */}
              <div className="col-span-2 flex flex-col items-center text-center md:col-span-1">
                <span className="text-[24px] font-medium text-[#E02126] sm:text-[28px] md:text-[32px] lg:text-[36px]">
                  25+
                </span>
                <span className="mt-1 text-[12px] text-white/80 sm:text-[13px] md:text-[14px]">
                  Industry Awards
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;