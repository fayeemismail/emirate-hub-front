export interface PricingCardItem {
  id?: number | string;
  _key?: string;
  badge: string;
  isPopular?: boolean;
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
  cardBackgroundColor?: string;
  cardTextColor?: string;
  cardTitleColor?: string;
  featuresTextColor?: string;
  priceColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  buttonBorderColor?: string;
}

export interface PricingData {
  active: boolean;
  backgroundColor?: string;
  titleColor?: string;
  highlightColor?: string;
  descriptionColor?: string;
  highlightedCardColor?: string;
  highlightedCardTextColor?: string;
  badge: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  cards: PricingCardItem[];
}

