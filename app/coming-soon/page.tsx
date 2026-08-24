"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function ComingSoon() {
  return (
    <div className="min-h-screen w-full bg-[#0d0e12] text-white flex flex-col justify-between items-center px-6 pt-36 md:pt-44 pb-12 select-none relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Center Content */}
      <main className="z-10 flex flex-col items-center text-center max-w-xl mx-auto my-auto">
        <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary uppercase mb-4">
          COMING SOON
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Something Great <br />
          <span className="text-primary">Is Under Way.</span>
        </h1>

        <p className="text-gray-400 text-sm md:text-base font-light max-w-md mb-8 leading-relaxed">
          We are preparing something exceptional for you. Stay tuned for the official launch.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium text-sm hover:bg-red-700 transition-colors duration-200 shadow-lg cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </main>

      {/* Footer */}
      <footer className="z-10 text-xs text-gray-600">
        © {new Date().getFullYear()} Emirate Hub. All rights reserved.
      </footer>
    </div>
  );
}
