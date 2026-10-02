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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    closeMobileMenu();

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

  // Reset menu + scroll state on route change; honor hash links
  useEffect(() => {
    closeMobileMenu();

    if (typeof window !== "undefined") {
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

  // Always-sticky: only track scrolled style, never hide the bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside tap / swipe / page scroll
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const isOutsideNav = (target: EventTarget | null) => {
      return (
        target instanceof Node &&
        navRef.current != null &&
        !navRef.current.contains(target)
      );
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (isOutsideNav(e.target)) closeMobileMenu();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isOutsideNav(e.target)) closeMobileMenu();
    };

    const handleScroll = () => {
      closeMobileMenu();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const hasDarkHeroAtTop =
    pathname === "/" || pathname === "/services" || pathname === "/coming-soon";
  const showSolidNavbar = isScrolled || isMobileMenuOpen || !hasDarkHeroAtTop;

  return (
    <>
      <nav
        ref={navRef}
        style={colorVars}
        className={`fixed top-0 left-0 right-0 z-50 w-full pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ease-in-out ${
          showSolidNavbar
            ? "bg-[var(--nav-bg)]/85 backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-[var(--nav-bg)]/35 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <div className="site-container">
          <div className="flex h-20 sm:h-22.5 items-center justify-between">
            <div>
              <Link href="/" onClick={closeMobileMenu}>
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

            <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-6 xl:gap-8">
              {/* Phone: icon on mobile, icon + number on desktop */}
              <a
                href={phoneHref}
                aria-label={`Call ${phone}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 lg:hidden"
              >
                <FiPhone className="w-4.5 h-4.5 text-primary" />
              </a>
              <a
                href={phoneHref}
                className="hidden lg:flex text-[13px] text-[var(--nav-phone)] hover:text-primary transition-colors font-medium items-center gap-2"
              >
                <FiPhone className="w-3.5 h-3.5 text-primary" />
                <span>{phone}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact on WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366]/20 flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
              </a>

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
                      onClick={(e) => handleNavClick(e, link.href)}
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

                <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                  <a
                    href={phoneHref}
                    className="flex items-center gap-3 text-sm text-[var(--nav-phone)]/90 py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                      <FiPhone className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">{phone}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Dimmed backdrop — tap outside nav closes menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/45 lg:hidden cursor-default"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}
