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
import type { IconType } from "react-icons";
import {
  FooterData,
  FooterLink,
  FooterSocialLink,
  FooterSocialPlatform,
} from "@/types/common/footer";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Iris+Bay+Tower+Business+Bay+Dubai";

const DEFAULT_DESCRIPTION =
  "Dubai's leading corporate advisory and business setup firm. Empowering entrepreneurs and global enterprises to establish and scale across the UAE.";

const defaultQuickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact Us", href: "/#contact-us" },
];

const defaultCoreServices = [
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

const DEFAULT_OFFICE_TITLE = "Head Office";
const DEFAULT_OFFICE_UNIT = "2204, 22nd Floor, Iris Bay Tower";
const DEFAULT_OFFICE_LOCATION = "Business Bay, Dubai, United Arab Emirates";
const DEFAULT_PHONE = "+971 50 943 2297";
const DEFAULT_EMAIL = "info@emiratehub.ae";
const DEFAULT_WORKING_HOURS = "Mon - Fri: 9:00 AM - 6:00 PM";
const DEFAULT_COPYRIGHT_TEXT = "© 2026 Emirate Hub Corporate Services. All rights reserved.";

// Color defaults aligned with active Sanity data
const DEFAULT_FOOTER_BG = "#E2E8F0";
const DEFAULT_COLUMN_TITLE_COLOR = "#E02126";
const DEFAULT_HEADING_COLOR = "#000000";
const DEFAULT_TEXT_COLOR = "#141414";
const DEFAULT_LINK_COLOR = "#000000";
const DEFAULT_CONTACT_TEXT_COLOR = "#000000";
const DEFAULT_CONTACT_ICON_COLOR = "#000000";
const DEFAULT_OFFICE_CARD_BG = "#E2E8F0";
const DEFAULT_COPYRIGHT_COLOR = "#000000";
const DEFAULT_SOCIAL_ICON_COLOR = "#000000";

const defaultSocialLinks: FooterSocialLink[] = [
  { platform: "instagram", url: "#" },
  { platform: "youtube", url: "#" },
  { platform: "linkedin", url: "#" },
  { platform: "facebook", url: "#" },
  { platform: "twitter", url: "#" },
];

const socialIcons: Record<FooterSocialPlatform, { icon: IconType; label: string }> = {
  instagram: { icon: FaInstagram, label: "Instagram" },
  youtube: { icon: FaYoutube, label: "YouTube" },
  linkedin: { icon: FaLinkedinIn, label: "LinkedIn" },
  facebook: { icon: FaFacebookF, label: "Facebook" },
  twitter: { icon: FaXTwitter, label: "X Twitter" },
};

function normalizeHref(href: string) {
  if (/^(https?:|mailto:|tel:|\/|#)/.test(href)) return href;
  return `/${href}`;
}

function toLinks(links: FooterLink[] | undefined, fallback: FooterLink[]) {
  const valid = (links || []).filter((link) => link.name && link.href);
  if (valid.length === 0) return fallback;
  return valid.map((link) => ({ name: link.name, href: normalizeHref(link.href) }));
}

function splitHours(value?: string) {
  const index = value?.indexOf(": ") ?? -1;
  if (!value || index === -1) return null;
  return { label: value.slice(0, index + 1), hours: value.slice(index + 2) };
}

function isLightColor(hex?: string): boolean {
  if (!hex || !hex.startsWith("#")) return false;
  const clean = hex.replace("#", "");
  if (clean.length < 6) return false;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

interface FooterProps {
  data?: FooterData | null;
}

export default function Footer({ data }: FooterProps) {
  const quickLinks = toLinks(data?.quickLinks, defaultQuickLinks);
  const coreServices = toLinks(data?.coreServices, defaultCoreServices);
  const socialLinks = data?.socialLinks?.filter(
    (link) => link.url && socialIcons[link.platform]
  ).length
    ? data.socialLinks.filter((link) => link.url && socialIcons[link.platform])
    : defaultSocialLinks;

  const description = data?.description || DEFAULT_DESCRIPTION;
  const officeTitle = data?.headOffice?.title || DEFAULT_OFFICE_TITLE;
  const officeUnit = data?.headOffice?.unit || DEFAULT_OFFICE_UNIT;
  const officeLocation =
    data?.headOffice?.location || DEFAULT_OFFICE_LOCATION;
  const mapsUrl = data?.headOffice?.mapsUrl || GOOGLE_MAPS_URL;
  const phone = data?.phone || DEFAULT_PHONE;
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const email = data?.email || DEFAULT_EMAIL;
  const weekdayHours = splitHours(data?.workingHours || DEFAULT_WORKING_HOURS) || {
    label: "Mon – Fri:",
    hours: "9:00 AM – 6:00 PM",
  };
  const copyrightText =
    data?.copyrightText || DEFAULT_COPYRIGHT_TEXT;

  // Active Sanity color values with Sanity-matched fallbacks
  const backgroundColor = data?.backgroundColor || DEFAULT_FOOTER_BG;
  const isLightBg = isLightColor(backgroundColor);

  const columnTitleColor = data?.columnTitleColor || DEFAULT_COLUMN_TITLE_COLOR;
  const headingColor = data?.headingColor || DEFAULT_HEADING_COLOR;
  const textColor = data?.textColor || DEFAULT_TEXT_COLOR;
  const linkColor = data?.linkColor || DEFAULT_LINK_COLOR;
  const contactTextColor = data?.contactTextColor || DEFAULT_CONTACT_TEXT_COLOR;
  const contactIconColor = data?.contactIconColor || DEFAULT_CONTACT_ICON_COLOR;
  const copyrightColor = data?.copyrightColor || DEFAULT_COPYRIGHT_COLOR;
  const socialIconColor = data?.socialIconColor || DEFAULT_SOCIAL_ICON_COLOR;

  const columnTitleStyle = { color: columnTitleColor };
  const headingStyle = { color: headingColor };
  const textStyle = { color: textColor };
  const linkStyle = { color: linkColor };
  const contactTextStyle = { color: contactTextColor };
  const contactIconStyle = { color: contactIconColor };
  const copyrightStyle = { color: copyrightColor };
  const socialIconStyle = { color: socialIconColor };

  const officeCardStyle = {
    backgroundColor:
      data?.officeCardBg || (isLightBg ? DEFAULT_OFFICE_CARD_BG : "rgba(255, 255, 255, 0.05)"),
    borderColor:
      data?.officeCardBorder || (isLightBg ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"),
  };

  const dividerBorderColor = isLightBg ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.1)";

  return (
    <footer
      style={{
        backgroundColor,
        borderTopColor: dividerBorderColor,
      }}
      className="pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-10 border-t"
    >
      <div className="site-container">
        {/* Main Grid: Split 2-col on mobile, 4 columns on desktop */}
        <div
          style={{ borderBottomColor: dividerBorderColor }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-14 border-b"
        >
          {/* Column 1: Brand & Office Location (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div>
              {/* Logo */}
              <Link href="/" className="inline-block mb-3 sm:mb-4">
                <Image
                  src={data?.logo || "/images/logo.png"}
                  alt={data?.logoAlt || "Emirate Hub"}
                  width={180}
                  height={60}
                  className="h-auto w-32 sm:w-36 md:w-44"
                />
              </Link>
              <p
                style={textStyle}
                className="text-xs sm:text-sm font-light leading-relaxed max-w-sm mb-4 sm:mb-6"
              >
                {description}
              </p>

              {/* Office Location Card */}
              <div
                style={officeCardStyle}
                className="rounded-2xl p-3.5 sm:p-5 max-w-md border transition-colors"
              >
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div
                    style={{
                      backgroundColor: `${contactIconColor}20`,
                      color: contactIconColor,
                    }}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <FiMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      style={headingStyle}
                      className="text-xs font-semibold uppercase tracking-wider mb-0.5 sm:mb-1"
                    >
                      {officeTitle}
                    </h4>
                    <p
                      style={textStyle}
                      className="text-xs sm:text-sm font-medium leading-snug"
                    >
                      {officeUnit}
                    </p>
                    <p
                      style={textStyle}
                      className="text-xs leading-normal mt-0.5 opacity-90"
                    >
                      {officeLocation}
                    </p>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: contactIconColor }}
                      className="inline-flex items-center gap-1.5 text-xs font-medium mt-1.5 sm:mt-2 hover:underline group"
                    >
                      <span>View on Google Maps</span>
                      <FiExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-light pt-1 sm:pt-2">
              <a
                href={phoneHref}
                style={contactTextStyle}
                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <FiPhone style={contactIconStyle} className="w-3.5 h-3.5 shrink-0" />
                <span>{phone}</span>
              </a>
              <span
                style={{ color: contactTextColor, opacity: 0.4 }}
                className="hidden sm:inline"
              >
                •
              </span>
              <a
                href={`mailto:${email}`}
                style={contactTextStyle}
                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <FiMail style={contactIconStyle} className="w-3.5 h-3.5 shrink-0" />
                <span>{email}</span>
              </a>
            </div>
          </div>

          {/* Split View Container: Side-by-side on mobile (grid-cols-2), unnested on desktop (lg:contents) */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:contents">
            {/* Column 2: Quick Links (lg:col-span-2) */}
            <div className="lg:col-span-2 flex flex-col">
              <h3
                style={columnTitleStyle}
                className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider mb-3 sm:mb-5"
              >
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      style={linkStyle}
                      className="inline-block text-xs sm:text-sm hover:translate-x-1.5 hover:opacity-80 transition-all duration-200 font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Core Services (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col">
              <h3
                style={columnTitleStyle}
                className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider mb-3 sm:mb-5"
              >
                Core Services
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {coreServices.map((service, idx) => (
                  <li key={idx}>
                    <Link
                      href={service.href}
                      style={linkStyle}
                      className="inline-block text-xs sm:text-sm hover:translate-x-1.5 hover:opacity-80 transition-all duration-200 font-light"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Working Hours (hidden on mobile, visible on lg screens) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col justify-between">
            <div>
              <h3
                style={columnTitleStyle}
                className="text-sm sm:text-base font-semibold uppercase tracking-wider mb-5"
              >
                Working Hours
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm font-light mb-6">
                <div>
                  <p style={headingStyle} className="font-medium">
                    {weekdayHours.label}
                  </p>
                  <p style={textStyle}>{weekdayHours.hours}</p>
                </div>
                <div>
                  <p style={headingStyle} className="font-medium">
                    Saturday:
                  </p>
                  <p style={textStyle}>10:00 AM – 3:00 PM</p>
                </div>
                <div>
                  <p style={headingStyle} className="font-medium">
                    Sunday:
                  </p>
                  <p style={{ ...textStyle, opacity: 0.7 }}>Closed</p>
                </div>
              </div>
            </div>

            <div>
              <h4
                style={headingStyle}
                className="text-xs font-semibold uppercase tracking-wider mb-2"
              >
                Legal
              </h4>
              <div className="flex flex-col space-y-1.5 text-xs font-light">
                <Link
                  href="/coming-soon"
                  style={linkStyle}
                  className="hover:opacity-80 transition-opacity"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/coming-soon"
                  style={linkStyle}
                  className="hover:opacity-80 transition-opacity"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 text-xs sm:text-sm font-light">
          {/* Copyright & Mobile Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center md:text-left">
            <p style={copyrightStyle} className="text-xs sm:text-sm font-light">
              {copyrightText}
            </p>
            <div className="flex lg:hidden items-center gap-3 text-xs">
              <Link
                href="/coming-soon"
                style={linkStyle}
                className="hover:opacity-80 transition-opacity"
              >
                Privacy Policy
              </Link>
              <span style={{ color: linkColor, opacity: 0.4 }}>•</span>
              <Link
                href="/coming-soon"
                style={linkStyle}
                className="hover:opacity-80 transition-opacity"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 sm:gap-5">
            <span
              style={socialIconStyle}
              className="hidden sm:inline text-xs font-light"
            >
              Connect with us:
            </span>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => {
                const { icon: Icon, label } = socialIcons[social.platform];
                const isExternal = social.url.startsWith("http");
                return (
                  <a
                    key={idx}
                    href={social.url}
                    aria-label={label}
                    style={socialIconStyle}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="hover:opacity-75 transition-all duration-200 transform hover:scale-110"
                  >
                    <Icon className="w-4 h-4 md:w-4.5 md:h-4.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
