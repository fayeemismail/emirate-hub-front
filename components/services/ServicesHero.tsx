"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

interface ServicesHeroData {
  active?: boolean;
  backgroundColor?: string;
  titleColor?: string;
  highlightColor?: string;
  subheadingColor?: string;
  descriptionColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  title?: string;
  highlightedTitle?: string;
  subheading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
  breadcrumb?: {
    parentLabel?: string;
    parentHref?: string;
    label?: string;
  };
}

interface ServicesHeroProps {
  data?: ServicesHeroData | null;
}

export default function ServicesHero({ data }: ServicesHeroProps) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  if (data && data.active === false) {
    return null;
  }

  const bgImage =
    typeof data?.backgroundImage === "string" && data.backgroundImage.trim().length > 0
      ? data.backgroundImage.trim()
      : "/images/hero-bg.png";
  const parentLabel = data?.breadcrumb?.parentLabel || "Home";
  const parentHref = data?.breadcrumb?.parentHref || "/";
  const currentLabel = data?.breadcrumb?.label || "Services";

  const titleText = data?.title || "Comprehensive Corporate Services for ";
  const highlightedTitle = data?.highlightedTitle || "UAE Business Growth";
  const subheading =
    data?.subheading ||
    "Our Expertise & Solutions Tailored for Your Enterprise.";
  const description =
    data?.description ||
    "From company formation and lifetime visas to corporate tax compliance, office rentals, bank account opening, and digital branding — Emirate Hub delivers turnkey solutions to establish, scale, and manage your enterprise effortlessly.";
  const buttonText = data?.buttonText || "CONNECT WITH AN EXPERT";
  const buttonHref = data?.buttonHref || "/#contact-us";

  const buttonBg = data?.buttonBackgroundColor || "#E02126";
  const buttonTextColor = data?.buttonTextColor || "#FFFFFF";

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      router.push(buttonHref);
    }, 400);
  };

  return (
    <section
      style={data?.backgroundColor ? { backgroundColor: data.backgroundColor } : undefined}
      className="relative w-full overflow-hidden pt-[calc(5rem+env(safe-area-inset-top,0px))] md:pt-20 lg:pt-22"
    >
      {/* Background Hero Image */}
      <Image
        src={bgImage}
        alt="Emirate Hub Services"
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
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
              <Link href={parentHref} className="hover:text-white transition-colors">
                {parentLabel}
              </Link>
              <FiChevronRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-primary font-medium">{currentLabel}</span>
            </div>

            {/* Heading */}
            <h1
              style={data?.titleColor ? { color: data.titleColor } : undefined}
              className="text-[28px] font-medium leading-tight tracking-[-0.5px] lg:max-w-3xl text-white sm:text-[32px] md:text-[38px] md:leading-[1.15] md:tracking-[-1px] lg:text-[44px] lg:leading-[1.15] lg:tracking-[-1.5px]"
            >
              {titleText}
              <span
                style={data?.highlightColor ? { color: data.highlightColor } : undefined}
                className="text-[#E02126] font-bold"
              >
                {highlightedTitle}
              </span>
            </h1>

            {/* Sub Heading & Description */}
            <div className="mt-4 max-w-[95%] sm:max-w-[90%] md:mt-5 md:max-w-[85%] lg:mt-6 lg:max-w-212.5 space-y-3">
              <p
                style={data?.subheadingColor ? { color: data.subheadingColor } : undefined}
                className="text-[15px] sm:text-[16px] md:text-[18px] lg:text-[19px] font-bold lg:font-medium text-white/95 leading-snug"
              >
                {subheading}
              </p>
              <p
                style={data?.descriptionColor ? { color: data.descriptionColor } : undefined}
                className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.6] text-white/80 font-medium lg:font-light"
              >
                {description}
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleClick}
              style={{
                "--hero-btn-bg": buttonBg,
                "--hero-btn-text": buttonTextColor,
              } as React.CSSProperties}
              className="group relative z-10 mt-6 h-11 sm:h-12 md:h-13 inline-flex items-center gap-4 sm:gap-5 md:gap-7 lg:gap-8 pl-3 pr-6 sm:pl-4 sm:pr-7 md:pl-4 md:pr-8 cursor-pointer overflow-hidden rounded-full transition-all duration-300 active:scale-95 select-none focus:outline-none"
            >
              {/* Round Circle background that animates on hover and click */}
              <span
                style={{ backgroundColor: "var(--hero-btn-bg)" }}
                className={`absolute left-0 top-0 rounded-full transition-all duration-500 ease-in-out group-hover:w-full group-hover:h-full group-active:w-full group-active:h-full z-0 shadow-sm ${
                  isClicked ? "w-full h-full" : "w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13"
                }`}
              />

              {/* Button Text */}
              <span
                className={`relative z-10 text-[12px] sm:text-[13px] md:text-[14px] font-normal text-[var(--hero-btn-text)] group-hover:text-black group-active:text-black transition-colors duration-300 tracking-wider uppercase pl-2 ${
                  isClicked ? "text-black!" : ""
                }`}
              >
                {buttonText}
              </span>

              {/* Right Arrow */}
              <span
                className={`relative z-10 text-[20px] leading-none sm:text-[24px] md:text-[28px] text-[var(--hero-btn-text)] group-hover:text-black group-active:text-black group-hover:translate-x-2 group-active:translate-x-2 transition-all duration-300 ease-in-out ${
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
}
