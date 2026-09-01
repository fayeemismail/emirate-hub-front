export interface FaqItem {
  id: number;
  number: string;
  category: string;
  question: string;
  answer: string;
}

export interface FaqSectionHeader {
  badge: string;
  titlePrefix: string;
  highlightedTitle: string;
  description: string;
  searchPlaceholder: string;
}

export interface FaqHelpBox {
  active: boolean;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  whatsappText: string;
  whatsappHref: string;
}

export interface FaqData {
  active: boolean;
  sectionHeader: FaqSectionHeader;
  helpBox: FaqHelpBox;
  items: FaqItem[];
}
