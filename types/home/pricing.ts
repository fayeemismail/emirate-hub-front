export interface PricingCardItem {
  id: number;
  badge: string;
  isPopular: boolean;
  icon: string;
  title: string;
  tagline: string;
  startingAt: string;
  currency: string;
  price: string;
  featuresHeading?: string;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
}

export interface PricingData {
  active: boolean;
  badge: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  cards: PricingCardItem[];
}
