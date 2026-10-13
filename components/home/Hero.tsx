"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import rawHeroData from "@/data/home/hero.json";
import { HeroData } from "@/types/home/hero";
import HeroPanoramaBackground from "./HeroPanoramaBackground";

interface HeroProps {
  data?: HeroData | null;
}

const renderHighlightedText = (
  text?: string,
  highlightColor?: string,
  boldKeyword?: string
) => {
  if (!text) return null;
  const colorStyle = highlightColor ? { color: highlightColor } : undefined;

  // 1. Support markdown syntax like "**Emirates**" if present in text
  if (text.includes("**")) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const keyword = part.slice(2, -2);
        return (
          <span key={idx} className="font-extrabold italic" style={colorStyle}>
            {keyword}
          </span>
        );
      }
      return (
        <span key={idx} style={colorStyle}>
          {part}
        </span>
      );
    });
  }

  // 2. Determine target keyword:
  // If explicitly "none", no bold effect is applied.
  // Otherwise use boldKeyword (trimmed) or fallback to "Emirates" if found in text
  const targetKeyword =
    boldKeyword === "none"
      ? null
      : boldKeyword?.trim() || (text.toLowerCase().includes("emirates") ? "Emirates" : null);

  if (targetKeyword) {
    const escaped = targetKeyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, idx) => {
      if (part.toLowerCase() === targetKeyword.toLowerCase()) {
        return (
          <span key={idx} className="font-extrabold italic" style={colorStyle}>
            {part}
          </span>
        );
      }
      return (
        <span key={idx} style={colorStyle}>
          {part}
        </span>
      );
    });
  }

  return (
    <span style={colorStyle}>
      {text}
    </span>
  );
};

const Hero = ({ data: propData }: HeroProps) => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const data: HeroData =
    propData && propData.active !== false && propData.heading
      ? propData
      : (rawHeroData as unknown as HeroData);

  if (!data.active) {
    return null;
  }

  const handleClick = () => {
    setIsClicked(true);
    const serviceSlug = (data.serviceSlug || "business-incorporation").trim();
    const rawTopic = data.heading?.highlightedText?.trim() || "UAE Business License";
    const serviceTopic = rawTopic.replace(/\b\w/g, (char) => char.toUpperCase());

    window.dispatchEvent(
      new CustomEvent("select-contact-service", {
        detail: {
          slug: serviceSlug,
          title: serviceTopic,
        },
      })
    );

    setTimeout(() => {
      setIsClicked(false);
      const targetHref = `/?slug=${encodeURIComponent(serviceSlug)}&service=${encodeURIComponent(serviceTopic)}#contact-us`;
      router.push(targetHref, { scroll: false });
      const contactSection = document.getElementById("contact-us");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  // Safe background images resolution
  const heroBackgroundImage =
    data.backgroundImage || rawHeroData.backgroundImage || "/images/hero-panorama.jpg";
  const heroBackgroundImages =
    data.backgroundImages && data.backgroundImages.length > 0
      ? data.backgroundImages
      : rawHeroData.backgroundImages;

  const buttonBg = data.buttonBackgroundColor || "#E02126";
  const buttonText = data.buttonTextColor || "#FFFFFF";

  return (
    <section
      className="relative w-full overflow-hidden pt-[calc(5rem+env(safe-area-inset-top,0px))] md:pt-20 lg:pt-22"
      style={data.backgroundColor ? { backgroundColor: data.backgroundColor } : undefined}
    >
      {/* Interactive Loop Panorama Background (Supports horizontal drag/swipe, scroll-driven parallax, and ambient drift) */}
      <HeroPanoramaBackground
        imageSrc={heroBackgroundImage}
        images={heroBackgroundImages}
      />

      {/*
        ── STATIC SEAMLESS OVERLAY ──────────────────────────────────────────────
        Rules:
          • Absolutely static — sits between background and content, never tied
            to any image transition, never animates, never flickers.
          • Top 45% is FULLY transparent — zero dark shade near the navbar or
            the light-sky area of the images.
          • Below 45% the dark+blur eases in over a long soft gradient so there
            is NO visible hard edge anywhere.
          • Horizontal gradient fades right so the right side of the image stays
            clean and the overlay only darkens/blurs the left text region.
        ────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          /* Vertical mask: top 45% is fully transparent, no hard line */
          maskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(0,0,0,0.12) 52%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.88) 74%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(0,0,0,0.12) 52%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.88) 74%, black 100%)",
        }}
        aria-hidden="true"
      >
        {/* Backdrop blur — masked horizontally so only left region is blurred */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            maskImage:
              "linear-gradient(to right, black 0%, black 30%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.15) 70%, transparent 86%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 30%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.15) 70%, transparent 86%)",
          }}
        />
        {/* Black gradient overlay on top of blur */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.08) 68%, transparent 84%)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col lg:block pointer-events-none">
        {/* Text block: normal flow on mobile/tablet so it can never be covered;
            only becomes an absolutely-centered min-h-screen block at lg+ */}
        <div className="site-container flex flex-1 items-center py-20 md:py-24 lg:min-h-screen lg:py-0 pointer-events-none">
          <div className="relative w-full max-w-full lg:max-w-5xl xl:max-w-6xl flex flex-col items-start text-start pointer-events-none">
            {/* Heading */}
            <h1 className="w-full text-[28px] font-normal leading-tight tracking-[-0.5px] lg:max-w-5xl xl:max-w-6xl text-white md:text-[38px] md:leading-[1.15] md:tracking-[-1px] lg:text-[44px] lg:leading-[1.15] lg:tracking-[-1.5px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {data.heading?.boldKeyword ? (
                <>
                  <span style={data.headingColor ? { color: data.headingColor } : undefined}>
                    {data.heading.prefix?.trim()}
                  </span>{" "}
                  <span
                    className="font-extrabold italic text-white"
                    style={data.headingColor ? { color: data.headingColor } : undefined}
                  >
                    {data.heading.boldKeyword.trim()}
                  </span>
                  {data.heading.middle ? (
                    <>
                      {" "}
                      <span style={data.headingColor ? { color: data.headingColor } : undefined}>
                        {data.heading.middle.trim()}
                      </span>
                    </>
                  ) : null}
                </>
              ) : (
                <span style={data.headingColor ? { color: data.headingColor } : undefined}>
                  {data.heading?.prefix}
                </span>
              )}
              <span className="hidden lg:inline"> </span>
              <br className="block lg:hidden" />
              <span
                className="text-[#E02126]"
                style={data.highlightColor ? { color: data.highlightColor } : undefined}
              >
                {renderHighlightedText(
                  data.heading?.highlightedText,
                  data.highlightColor || "#E02126",
                  data.heading?.highlightedBoldKeyword
                )}
              </span>{" "}
              {data.heading?.suffix ? (
                <>
                  <br className="block md:hidden lg:hidden " />
                  <span style={data.headingColor ? { color: data.headingColor } : undefined}>
                    {data.heading.suffix}
                  </span>
                </>
              ) : null}
            </h1>

            {/* Sub Heading & Description */}
            <div className="mt-4 max-w-[95%] sm:max-w-[90%] md:mt-5 md:max-w-[85%] lg:mt-6 lg:max-w-212.5 space-y-3">
              <p
                className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] font-normal lg:font-medium text-white/90 leading-snug"
                style={data.subheadingColor ? { color: data.subheadingColor } : undefined}
              >
                {data.subheading}
              </p>
              <p
                className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.6] text-white/75 font-medium lg:font-light"
                style={data.descriptionColor ? { color: data.descriptionColor } : undefined}
              >
                {data.description}
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleClick}
              style={{
                "--hero-btn-bg": buttonBg,
                "--hero-btn-text": buttonText,
              } as React.CSSProperties}
              className="group relative z-10 mt-6 h-11 sm:h-12 md:h-13 inline-flex items-center gap-4 sm:gap-5 md:gap-7 lg:gap-8 pl-3 pr-6 sm:pl-4 sm:pr-7 md:pl-4 md:pr-8 cursor-pointer overflow-hidden rounded-full transition-all duration-300 active:scale-95 select-none focus:outline-none pointer-events-auto"
            >
              {/* Round Circle background that animates on hover and click */}
              <span
                style={{ backgroundColor: "var(--hero-btn-bg)" }}
                className={`absolute left-0 top-0 rounded-full transition-all duration-500 ease-in-out group-hover:w-full group-hover:h-full group-active:w-full group-active:h-full z-0 shadow-sm ${isClicked ? "w-full h-full" : "w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13"
                  }`}
              />

              {/* Button Text */}
              <span
                className={`relative z-10 text-[12px] sm:text-[13px] md:text-[14px] font-normal text-[var(--hero-btn-text)] group-hover:text-black group-active:text-black transition-colors duration-300 tracking-wider uppercase pl-2 ${isClicked ? "text-black!" : ""
                  }`}
              >
                {data.buttonText}
              </span>

              {/* Right Arrow */}
              <span
                className={`relative z-10 text-[20px] leading-none sm:text-[24px] md:text-[28px] text-[var(--hero-btn-text)] group-hover:text-black group-active:text-black group-hover:translate-x-2 group-active:translate-x-2 transition-all duration-300 ease-in-out ${isClicked ? "text-black! translate-x-2" : ""
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