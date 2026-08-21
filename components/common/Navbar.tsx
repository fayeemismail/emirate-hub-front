"use client";

import Image from "next/image";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="site-container border-b border-white/20">
        <div className="flex h-22.5 items-center justify-between">

          {/* Logo */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Emirate Hub"
              width={150}
              height={50}
              priority
              className="h-auto w-27.5 md:w-30 lg:w-37.5"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-9 lg:flex">
            <a
              href="#"
              className="text-[13px] text-[#ef2727]"
            >
              Home
            </a>

            <a
              href="#"
              className="text-[13px] text-white/80 transition-colors hover:text-white"
            >
              Business Setup
            </a>

            <a
              href="#"
              className="text-[13px] text-white/80 transition-colors hover:text-white"
            >
              About Us
            </a>

            <a
              href="#"
              className="text-[13px] text-white/80 transition-colors hover:text-white"
            >
              Services
            </a>

            <a
              href="#"
              className="text-[13px] text-white/80 transition-colors hover:text-white"
            >
              Why Choose Us
            </a>

            <a
              href="#"
              className="text-[13px] text-white/80 transition-colors hover:text-white"
            >
              Blogs
            </a>

            <a
              href="#"
              className="text-[13px] text-white/80 transition-colors hover:text-white"
            >
              Contact Us
            </a>
          </div>

          {/* Right Side */}
          <div className="hidden items-center gap-10 lg:flex">
            <button className="text-[13px] text-white/80">
              EN
            </button>

            <span className="text-[13px] text-white">
              +971 000 000
            </span>
          </div>

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label="Open menu"
            className="flex items-center justify-center text-white lg:hidden"
          >
            <FiMenu size={26} />
          </button>

        </div>
      </div>
    </nav>
  );
}