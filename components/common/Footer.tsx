"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Iris+Bay+Tower+Business+Bay+Dubai";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blogs & Insights", href: "/blog" },
  { name: "Contact Us", href: "/#contact-us" },
];

const coreServices = [
  { name: "Business Incorporation", href: "/services/business-incorporation" },
  { name: "Visa Services", href: "/services/visa-services" },
  { name: "PRO & Government Liaison", href: "/services/pro-government-liaison" },
  {
    name: "Corporate Bank Account",
    href: "/services/corporate-bank-account-opening",
  },
  {
    name: "Corporate Tax & VAT",
    href: "/services/corporate-tax-vat-compliance",
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-10 border-t border-gray-900">
      <div className="site-container">
        {/* Main Grid: 4 Clean, Well-Aligned Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-gray-800/80">
          {/* Column 1: Brand & Office Location (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Logo */}
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Emirate Hub"
                  width={180}
                  height={60}
                  className="h-auto w-36 md:w-44"
                />
              </Link>
              <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm mb-6">
                Dubai&apos;s leading corporate advisory and business setup firm.
                Empowering entrepreneurs and global enterprises to establish and
                scale across the UAE.
              </p>

              {/* Office Location Card */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5 max-w-md">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <FiMapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-1">
                      Our Head Office
                    </h4>
                    <p className="text-gray-200 text-xs sm:text-sm font-medium leading-snug">
                      Unit 2204, 22nd Floor, Iris Bay Tower
                    </p>
                    <p className="text-gray-400 text-xs leading-normal mt-0.5">
                      Business Bay, Dubai, United Arab Emirates
                    </p>
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary font-medium mt-2 hover:underline group"
                    >
                      <span>View on Google Maps</span>
                      <FiExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs sm:text-sm text-gray-300 font-light pt-2">
              <a
                href="tel:+971000000"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FiPhone className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>+971 000 000</span>
              </a>
              <span className="hidden sm:inline text-gray-700">•</span>
              <a
                href="mailto:info@emiratehub.com"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FiMail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>info@emiratehub.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-primary text-sm sm:text-base font-semibold uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="inline-block text-xs sm:text-sm text-gray-300 hover:text-white hover:translate-x-1.5 transition-all duration-200 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Services (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-primary text-sm sm:text-base font-semibold uppercase tracking-wider mb-5">
              Core Services
            </h3>
            <ul className="space-y-3">
              {coreServices.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="inline-block text-xs sm:text-sm text-gray-300 hover:text-white hover:translate-x-1.5 transition-all duration-200 font-light"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Working Hours & Consult (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-primary text-sm sm:text-base font-semibold uppercase tracking-wider mb-5">
                Working Hours
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-light mb-6">
                <div>
                  <p className="text-white font-medium">Mon – Fri:</p>
                  <p className="text-gray-400">9:00 AM – 6:00 PM</p>
                </div>
                <div>
                  <p className="text-white font-medium">Saturday:</p>
                  <p className="text-gray-400">10:00 AM – 3:00 PM</p>
                </div>
                <div>
                  <p className="text-white font-medium">Sunday:</p>
                  <p className="text-gray-500">Closed</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">
                Legal
              </h4>
              <div className="flex flex-col space-y-1.5 text-xs text-gray-400 font-light">
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-xs sm:text-sm text-gray-400 font-light">
          {/* Copyright */}
          <p className="text-center md:text-left">
            © 2026 Emirate Hub. All Rights Reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline text-xs text-gray-500">
              Connect with us:
            </span>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-primary transition-all duration-200 transform hover:scale-110"
              >
                <FaInstagram className="w-4 h-4 md:w-4.5 md:h-4.5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-gray-400 hover:text-primary transition-all duration-200 transform hover:scale-110"
              >
                <FaYoutube className="w-4 h-4 md:w-4.5 md:h-4.5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-primary transition-all duration-200 transform hover:scale-110"
              >
                <FaLinkedinIn className="w-4 h-4 md:w-4.5 md:h-4.5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-primary transition-all duration-200 transform hover:scale-110"
              >
                <FaFacebookF className="w-4 h-4 md:w-4.5 md:h-4.5" />
              </a>
              <a
                href="#"
                aria-label="X Twitter"
                className="text-gray-400 hover:text-primary transition-all duration-200 transform hover:scale-110"
              >
                <FaXTwitter className="w-4 h-4 md:w-4.5 md:h-4.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
