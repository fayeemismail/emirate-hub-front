import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiCompass } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#0d0e12] text-white flex flex-col justify-between items-center px-6 pt-32 md:pt-40 pb-16 select-none relative overflow-hidden">
      {/* Subtle Background Glow & Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)`,
          backgroundSize: "28px 28px, 28px 28px, 28px 28px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Center Content */}
      <div className="z-10 flex flex-col items-center text-center max-w-2xl mx-auto my-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-6">
          <FiCompass className="w-4 h-4 text-primary" />
          <span>ERROR 404 • PAGE NOT FOUND</span>
        </div>

        {/* Large 404 Number */}
        <div className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none mb-4 bg-gradient-to-b from-white via-white/90 to-white/20 bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(224,33,38,0.25)]">
          404
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Looks Like You&apos;ve <br className="hidden sm:block" />
          <span className="text-primary">Ventured Off Course.</span>
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-base md:text-lg font-light max-w-lg mb-9 leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us guide you back to setting up and growing your business in the UAE.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-[#c8191e] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-primary/30 active:scale-95 cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>Explore Services</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Bottom Subtle Help Link */}
      <div className="z-10 text-xs sm:text-sm text-gray-500 mt-10">
        Need immediate assistance?{" "}
        <Link
          href="/#contact-us"
          className="text-primary hover:text-white underline underline-offset-4 font-medium transition-colors"
        >
          Contact our setup advisors
        </Link>
      </div>
    </div>
  );
}
