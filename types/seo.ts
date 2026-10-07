export interface SocialLink {
  platform: string;
  url: string;
}

export interface GlobalSeoData {
  siteName?: string;
  siteUrl?: string;
  titleSeparator?: string;
  locale?: string;
  defaultSeoTitle?: string;
  defaultMetaDescription?: string;
  defaultKeywords?: string[];
  defaultOgImage?: string;
  defaultOgImageAlt?: string;
  twitterCardType?: 'summary_large_image' | 'summary';
  organizationName?: string;
  organizationDescription?: string;
  organizationLogo?: string;
  addressStreet?: string;
  addressLocality?: string;
  addressCountry?: string;
  supportPhone?: string;
  supportEmail?: string;
  workingHours?: string;
  googleMapsUrl?: string;
  socialLinks?: SocialLink[];
  gaEnabled?: boolean;
  gaMeasurementId?: string;
  gaAnonymizeIp?: boolean;
  gtmEnabled?: boolean;
  gtmContainerId?: string;
  disallowedPaths?: string[];
}

export interface PageSeoData {
  pageName?: string;
  route?: string;
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  twitterCardType?: 'summary_large_image' | 'summary';
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  jsonLdType?: string;
}
