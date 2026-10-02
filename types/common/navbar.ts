export interface NavLinkItem {
  name: string;
  href: string;
}

export interface NavbarData {
  logo?: string;
  logoAlt?: string;
  backgroundColor?: string;
  linkColor?: string;
  activeLinkColor?: string;
  phoneColor?: string;
  phone?: string;
  whatsappUrl?: string;
  mobileIconColor?: string;
  whatsappIconColor?: string;
  ctaText?: string;
  ctaHref?: string;
  navLinks?: NavLinkItem[];
}
