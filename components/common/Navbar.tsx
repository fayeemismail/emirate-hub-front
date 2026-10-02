"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiPhone, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarData } from "@/types/common/navbar";

const defaultNavLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/#contact-us" },
];

const DEFAULT_PHONE = "+971 50 943 2297";
const DEFAULT_WHATSAPP_URL = "https://wa.me/971509432297";

interface NavbarProps {
  data?: NavbarData | null;
}

export default function Navbar({ data }: NavbarProps) {
  const navLinks = data?.navLinks?.length
    ? data.navLinks
        .filter((link) => link.name && link.href)
        .map((link) => ({ label: link.name, href: link.href }))
    : defaultNavLinks;
  const phone = data?.phone || DEFAULT_PHONE;
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const whatsappUrl = data?.whatsappUrl || DEFAULT_WHATSAPP_URL;
  const colorVars = {
    "--nav-bg": data?.backgroundColor || "#000000",
    "--nav-link": data?.linkColor || "#FFFFFF",
    "--nav-phone": data?.phoneColor || "#FFFFFF",
  } as React.CSSProperties;

  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith("/#") || href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace(/^\/?#/, "");

      if (pathname === "/") {
        setTimeout(() => {
          scrollToSection(targetId);
        }, 150);
      } else {
        router.push(`/#${targetId}`);
      }
    }
  };

  // Scroll to hash on page transition or direct load and reset visibility
  useEffect(() => {
    setIsVisible(true);
    setIsMobileMenuOpen(false);

    if (typeof window !== "undefined") {
      lastScrollY.current = window.scrollY;
      setIsScrolled(window.scrollY > 20);

      if (window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        const timer = setTimeout(() => {
          scrollToSection(hash);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  // Close mobile menu on outside touch/click or background scroll
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleBackgroundScroll = () => {
      setIsMobileMenuOpen(false);
    };

    // Close when user scrolls window or touches outside
    window.addEventListener("scroll", handleBackgroundScroll, { passive: true });
    window.addEventListener("wheel", handleBackgroundScroll, { passive: true });
    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleBackgroundScroll);
      window.removeEventListener("wheel", handleBackgroundScroll);
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
    };
  }, [isMobileMenuOpen]);

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

  // Pages with a full-bleed dark hero banner at the very top
  const hasDarkHeroAtTop =
    pathname === "/" || pathname === "/services" || pathname === "/coming-soon";
  const showSolidNavbar = isScrolled || isMobileMenuOpen || !hasDarkHeroAtTop;

  return (
    <>
      {/* Outside Background Overlay - Closes navbar on touch or scroll */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            onTouchStart={() => setIsMobileMenuOpen(false)}
            onTouchMove={() => setIsMobileMenuOpen(false)}
            onWheel={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden cursor-pointer"
          />
        )}
      </AnimatePresence>

      <nav
        ref={navRef}
        style={colorVars}
        className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ease-in-out ${
          isVisible || isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-full transition-colors duration-300 ${
            showSolidNavbar
              ? "bg-[var(--nav-bg)]/85 backdrop-blur-md shadow-lg border-b border-white/10"
              : "bg-[var(--nav-bg)]/35 backdrop-blur-md border-b border-white/10"
          }`}
        >
          <div className="site-container">
            <div className="flex h-20 sm:h-22.5 items-center justify-between">
              {/* Logo */}
              <div>
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src={data?.logo || "/images/logo.png"}
                    alt={data?.logoAlt || "Emirate Hub"}
                    width={150}
                    height={50}
                    priority
                    className="h-auto w-27.5 md:w-30 lg:w-37.5 cursor-pointer"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden items-center gap-7 xl:gap-9 lg:flex">
                {navLinks.map((link, index) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : link.href.startsWith("/#")
                      ? false
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={index}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`text-[13px] tracking-wide transition-colors ${
                        isActive
                          ? "text-[#E02126] font-semibold"
                          : "text-[var(--nav-link)]/80 hover:text-[var(--nav-link)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Right Side Info & Mobile Actions */}
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
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
                className="lg:hidden bg-[var(--nav-bg)]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden shadow-2xl"
              >
                <div className="site-container py-5 flex flex-col space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : link.href.startsWith("/#")
                        ? false
                        : pathname.startsWith(link.href);

                    return (
                      <Link
                        key={index}
                        href={link.href}
                        onClick={(e) => {
                          setIsMobileMenuOpen(false);
                          handleNavClick(e, link.href);
                        }}
                        className={`text-sm font-medium py-2.5 px-3.5 rounded-xl transition-all duration-200 flex items-center justify-between ${
                          isActive
                            ? "text-primary font-semibold bg-white/5"
                            : "text-[var(--nav-link)]/85 hover:text-[var(--nav-link)] hover:bg-white/5"
                        }`}
                      >
                        <span>{link.label}</span>
                        <FiArrowRight className="w-4 h-4 opacity-40" />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Sticky Quick Contact Icons - WhatsApp & Mobile (Phone) in 2 rows at bottom right */}
      <aside
        aria-label="Quick contact"
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-5 sm:bottom-6 sm:right-6 z-30 flex flex-col gap-3 items-end pointer-events-auto"
      >
        {/* Row 1: WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={data?.whatsappIconColor ? { backgroundColor: data.whatsappIconColor } : undefined}
          className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white shadow-[0_4px_18px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" />

          {/* Tooltip on desktop */}
          <span className="hidden sm:inline-block pointer-events-none absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-lg bg-gray-950/90 text-white text-xs font-medium shadow-lg backdrop-blur-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 border border-white/10">
            WhatsApp
          </span>
        </a>

        {/* Row 2: Mobile / Phone Call */}
        <a
          href={phoneHref}
          aria-label={`Call ${phone}`}
          style={data?.mobileIconColor ? { backgroundColor: data.mobileIconColor } : undefined}
          className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#E02126] text-white shadow-[0_4px_18px_rgba(224,33,38,0.45)] hover:shadow-[0_6px_24px_rgba(224,33,38,0.65)] hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <FiPhone className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />

          {/* Tooltip on desktop */}
          <span className="hidden sm:inline-block pointer-events-none absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-lg bg-gray-950/90 text-white text-xs font-medium shadow-lg backdrop-blur-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 border border-white/10">
            Call {phone}
          </span>
        </a>
      </aside>
    </>
  );
}

