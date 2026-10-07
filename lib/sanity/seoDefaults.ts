import { GlobalSeoData, PageSeoData } from "@/types/seo";

export const DEFAULT_GLOBAL_SEO: GlobalSeoData = {
  siteName: "Emirate Hub",
  siteUrl: "https://emiratehub.ae",
  titleSeparator: "|",
  locale: "en_AE",
  defaultSeoTitle: "Emirate Hub | Business Setup & Company Formation Dubai",
  defaultMetaDescription:
    "Emirate Hub provides executive corporate advisory, UAE mainland and freezone company formation, trade licensing, investor visas, and corporate banking in Dubai.",
  defaultKeywords: [
    "Emirate Hub",
    "Business Setup Dubai",
    "Company Formation UAE",
    "Corporate Advisory Dubai",
    "Trade License UAE",
    "Mainland Business Setup",
    "Free Zone License",
    "Investor Visa Dubai",
  ],
  defaultOgImageAlt: "Emirate Hub Corporate Business Setup in Dubai UAE",
  twitterCardType: "summary_large_image",
  organizationName: "Emirate Hub Corporate Services",
  organizationDescription:
    "Emirate Hub is a premier UAE business setup and corporate advisory firm headquartered in Business Bay, Dubai. The firm specializes in mainland and free zone company incorporation, trade licensing, residency visas, banking support, and statutory compliance.",
  addressStreet: "Unit 2204, 22nd Floor, Iris Bay Tower",
  addressLocality: "Business Bay, Dubai",
  addressCountry: "United Arab Emirates",
  supportPhone: "+971 50 943 2297",
  supportEmail: "contact@emiratehub.ae",
  workingHours: "Mon – Fri: 9:00 AM – 6:00 PM; Saturday: 10:00 AM – 3:00 PM; Sunday: Closed",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Iris+Bay+Tower+Business+Bay+Dubai",
  socialLinks: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/company/emiratehub" },
    { platform: "Instagram", url: "https://www.instagram.com/emiratehub" },
    { platform: "X (Twitter)", url: "https://x.com/emiratehub" },
    { platform: "Facebook", url: "https://www.facebook.com/emiratehub" },
  ],
  gaEnabled: true,
  gaMeasurementId: "G-F8TZMCWK75",
  gaAnonymizeIp: true,
  gtmEnabled: true,
  gtmContainerId: "GTM-KR8LLVTJ",
  disallowedPaths: ["/studio", "/api/", "/coming-soon"],
};

export const DEFAULT_HOME_SEO: PageSeoData = {
  pageName: "Home Page (/)",
  route: "/",
  seoTitle: "Emirate Hub | Business Setup & Company Formation Dubai, UAE",
  metaDescription:
    "Launch your UAE enterprise with Emirate Hub. Streamlined mainland and free zone company formation, licensing, corporate tax registration, and investor visas.",
  keywords: [
    "Business Setup Dubai",
    "Company Formation UAE",
    "Trade License Dubai",
    "Mainland Business Setup",
    "Free Zone License",
    "Emirate Hub",
    "Corporate Tax UAE",
    "Investor Visa Dubai",
  ],
  ogTitle: "Emirate Hub | Business Setup & Company Formation in Dubai",
  ogDescription:
    "Cost-effective mainland and free zone business setup in Dubai with verified corporate advisors. Commercial licensing, Golden Visas, and banking assistance.",
  ogImageAlt: "Emirate Hub Executive Corporate Advisory and UAE Panorama View",
  ogType: "website",
  twitterCardType: "summary_large_image",
  canonicalUrl: "https://emiratehub.ae/",
  noIndex: false,
  noFollow: false,
  jsonLdType: "WebPage",
};

export const DEFAULT_ABOUT_SEO: PageSeoData = {
  pageName: "About Us Page (/about)",
  route: "/about",
  seoTitle: "About Emirate Hub | Certified UAE Corporate Advisory & Setup",
  metaDescription:
    "Discover Emirate Hub, Dubai's premier corporate advisory. Headquartered at Iris Bay Tower, Business Bay, guiding entrepreneurs to business success across the UAE.",
  keywords: [
    "About Emirate Hub",
    "Business Setup Consultants Dubai",
    "Iris Bay Tower Business Bay",
    "UAE Corporate Services",
    "Company Formation Experts",
  ],
  ogTitle: "About Emirate Hub | Corporate Advisory & UAE Company Setup Experts",
  ogDescription:
    "Meet Dubai's premier business incorporation specialists. Turnkey company formation, commercial licensing, and strategic corporate services.",
  ogImageAlt: "Emirate Hub Corporate Advisory Headquarters at Iris Bay Tower Business Bay",
  ogType: "website",
  twitterCardType: "summary_large_image",
  canonicalUrl: "https://emiratehub.ae/about",
  noIndex: false,
  noFollow: false,
  jsonLdType: "AboutPage",
};

export const DEFAULT_SERVICES_SEO: PageSeoData = {
  pageName: "Services Overview Page (/services)",
  route: "/services",
  seoTitle: "Corporate Services & Solutions | Emirate Hub Dubai",
  metaDescription:
    "Explore end-to-end corporate solutions by Emirate Hub: mainland & freezone company formation, visa processing, PRO government relations, banking, and office rentals.",
  keywords: [
    "Mainland License Dubai",
    "Freezone Business Setup",
    "UAE Visa Services",
    "PRO Services Dubai",
    "Corporate Bank Account Opening",
    "Dubai Office Rentals",
    "Company Formation Services",
    "Emirate Hub Services",
  ],
  ogTitle: "Corporate Services & Business Setup Solutions | Emirate Hub Dubai",
  ogDescription:
    "Comprehensive business incorporation, immigration, corporate tax, PRO clearing, and commercial office rentals across Dubai and the UAE.",
  ogImageAlt: "Emirate Hub Corporate Business Setup Services in Dubai",
  ogType: "website",
  twitterCardType: "summary_large_image",
  canonicalUrl: "https://emiratehub.ae/services",
  noIndex: false,
  noFollow: false,
  jsonLdType: "CollectionPage",
};

export const DEFAULT_BLOG_SEO: PageSeoData = {
  pageName: "Blog & Insights Page (/blog)",
  route: "/blog",
  seoTitle: "Business Insights & Advisory Blog | Emirate Hub Dubai",
  metaDescription:
    "Stay informed with regulatory updates, UAE corporate tax guides, VAT compliance insights, and strategic company formation advice from Emirate Hub advisors.",
  keywords: [
    "Dubai Business Blog",
    "UAE Corporate Tax Guide",
    "VAT Registration Dubai",
    "Business News UAE",
    "Company Formation Guides",
    "ESR Compliance UAE",
    "Emirate Hub Articles",
  ],
  ogTitle: "UAE Business Insights & Corporate Regulatory Articles | Emirate Hub",
  ogDescription:
    "Expert analysis on UAE corporate tax, VAT registration, ESR compliance, corporate banking, and free zone regulations.",
  ogImageAlt: "Emirate Hub Business Advisory and Corporate Regulatory Insights",
  ogType: "website",
  twitterCardType: "summary_large_image",
  canonicalUrl: "https://emiratehub.ae/blog",
  noIndex: false,
  noFollow: false,
  jsonLdType: "Blog",
};

export const DEFAULT_CONTACT_SEO: PageSeoData = {
  pageName: "Contact Advisory Section (/#contact-us)",
  route: "/#contact-us",
  seoTitle: "Contact Our Setup Advisors | Emirate Hub Business Bay Dubai",
  metaDescription:
    "Connect with certified UAE business setup advisors at Emirate Hub. Schedule a 1-on-1 consultation at Iris Bay Tower, Business Bay, Dubai, or send an inquiry online.",
  keywords: [
    "Contact Emirate Hub",
    "Business Setup Consultation Dubai",
    "Company Formation Experts Iris Bay",
    "UAE Business Advisory Office",
    "Dubai PRO Advisory",
  ],
  ogTitle: "Contact Emirate Hub | Certified UAE Business Setup Advisors",
  ogDescription:
    "Get 1-on-1 confidential corporate setup advisory tailored to your business goals. Headquartered in Business Bay, Dubai.",
  ogImageAlt: "Emirate Hub Senior Business Setup Advisors Available Online",
  ogType: "website",
  twitterCardType: "summary_large_image",
  canonicalUrl: "https://emiratehub.ae/#contact-us",
  noIndex: false,
  noFollow: false,
  jsonLdType: "ContactPage",
};
