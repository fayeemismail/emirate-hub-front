export interface NavLinkItem {
  name: string;
  href: string;
}

export interface NavbarData {
  backgroundColor?: string;
  linkColor?: string;
  phoneColor?: string;
  phone?: string;
  whatsappUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  navLinks?: NavLinkItem[];
}
