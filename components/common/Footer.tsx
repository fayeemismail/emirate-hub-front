"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const footerData = [
  {
    title: "Free zone",
    links: [
      { name: "Overview", href: "#" },
      { name: "Business Activities", href: "#" },
      { name: "Free Zone License Locations and Pricing", href: "#" },
      { name: "UAE Visas", href: "#" },
      { name: "Registration Process", href: "#" },
      { name: "Our solution", href: "#" },
    ],
  },
  {
    title: "Mainland",
    links: [
      { name: "Overview", href: "#" },
      { name: "Sponsorship", href: "#" },
      { name: "Dubai Mainland License", href: "#" },
      { name: "Mainland Visas", href: "#" },
      { name: "Mainland Activities", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Support Services", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Our Partners", href: "#" },
      { name: "Citizenship & Residency", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Business Setup Blog", href: "#" },
      { name: "Emirate Hub in the Press", href: "#" },
      { name: "Trade License Dubai", href: "#" },
      { name: "How to Start a Business in Dubai", href: "#" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { name: "About Us", href: "#" },
      { name: "Sitemap", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-10 border-t border-gray-900">
      <div className="site-container">
        {/* Logo Section */}
        <div className="mb-12">
          <Image
            src="/images/logo.png"
            alt="Emirate Hub"
            width={180}
            height={60}
            className="h-auto w-36 md:w-44"
          />
        </div>

        {/* 5 Columns Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 pb-16 border-b border-gray-800/80">
          {footerData.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-primary text-base md:text-lg font-semibold mb-4 tracking-wide">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="inline-block text-xs md:text-sm text-gray-300 hover:text-white hover:translate-x-1.5 transition-all duration-200 ease-in-out font-light"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs md:text-sm text-gray-400 font-light">
          {/* Left Copyright */}
          <div>
            <p>© 2026 Emirate Hub. All Rights Reserved.</p>
          </div>

          {/* Right Social Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span>Stay connected by following us on our social networks.</span>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-white hover:text-primary transition-all duration-200 transform hover:scale-110"
              >
                <FaInstagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-white hover:text-primary transition-all duration-200 transform hover:scale-110"
              >
                <FaYoutube className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-white hover:text-primary transition-all duration-200 transform hover:scale-110"
              >
                <FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-white hover:text-primary transition-all duration-200 transform hover:scale-110"
              >
                <FaFacebookF className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                aria-label="X Twitter"
                className="text-white hover:text-primary transition-all duration-200 transform hover:scale-110"
              >
                <FaXTwitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
