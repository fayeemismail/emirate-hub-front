"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX, FiPhone, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/coming-soon" },
  { label: "Services", href: "/coming-soon" },
  { label: "Blogs", href: "/coming-soon" },
  { label: "Contact Us", href: "/#contact-us" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled past top
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll direction detection
      if (currentScrollY <= 20) {
        // At the very top, always show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling DOWN -> Hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP -> Reveal navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isVisible || isMobileMenuOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
        } ${isScrolled || isMobileMenuOpen
          ? "bg-black/75 backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-transparent border-b border-white/20"
        }`}
    >
      <div className="site-container">
        <div className="flex h-20 sm:h-22.5 items-center justify-between">
          {/* Logo */}
          <div>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/images/logo.png"
                alt="Emirate Hub"
                width={150}
                height={50}
                priority
                className="h-auto w-27.5 md:w-30 lg:w-37.5 cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[13px] tracking-wide transition-colors ${index === 0
                    ? "text-[#E02126] font-semibold"
                    : "text-white/80 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Info & Mobile Actions */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
            {/* WhatsApp Link - Always visible (Desktop & Mobile before menu) */}
            <a
              href="https://wa.me/971000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366]/20 flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
            </a>

            {/* Phone Link - Desktop only */}
            <a
              href="tel:+971000000"
              className="hidden lg:flex text-[13px] text-white hover:text-primary transition-colors font-medium items-center gap-2"
            >
              <FiPhone className="w-3.5 h-3.5 text-primary" />
              <span>+971 000 000</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors lg:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="site-container py-5 flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className={`text-sm font-medium py-2.5 px-3.5 rounded-xl transition-all duration-200 flex items-center justify-between ${index === 0
                      ? "text-primary font-semibold bg-white/5"
                      : "text-white/85 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span>{link.label}</span>
                  <FiArrowRight className="w-4 h-4 opacity-40" />
                </Link>
              ))}

              {/* Bottom Details for Mobile */}
              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="tel:+971000000"
                  className="flex items-center gap-3 text-sm text-white/90 py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    <FiPhone className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">+971 000 000</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

