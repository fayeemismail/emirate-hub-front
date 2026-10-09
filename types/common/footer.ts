export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterHeadOffice {
  title?: string;
  unit?: string;
  location?: string;
  mapsUrl?: string;
}

export type FooterSocialPlatform =
  | "linkedin"
  | "twitter"
  | "instagram"
  | "facebook"
  | "youtube";

export interface FooterSocialLink {
  platform: FooterSocialPlatform;
  url: string;
}

export interface FooterData {
  logo?: string;
  logoAlt?: string;
  backgroundColor?: string;
  headingColor?: string;
  textColor?: string;
  linkColor?: string;
  copyrightColor?: string;
  description?: string;
  headOffice?: FooterHeadOffice;
  phone?: string;
  email?: string;
  workingHours?: string;
  quickLinks?: FooterLink[];
  coreServices?: FooterLink[];
  socialLinks?: FooterSocialLink[];
  copyrightText?: string;
}
