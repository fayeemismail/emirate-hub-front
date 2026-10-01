export interface HomeServiceItem {
  id: number | string;
  slug: string;
  number: string;
  tag: string;
  tagColor?: string;
  cardTagColor?: string;
  image: string;
  title: string;
  titleColor?: string;
  cardTitleColor?: string;
  description: string;
  descriptionColor?: string;
  cardTextColor?: string;
  cardBackgroundColor?: string;
  buttonText?: string;
  active?: boolean;
}

export interface HomeServiceData {
  active: boolean;
  backgroundColor?: string;
  titleColor?: string;
  highlightColor?: string;
  descriptionColor?: string;
  badge: string;
  titlePrefix: string;
  highlightedTitle: string;
  titleSuffix: string;
  description: string;
  viewAllButtonText: string;
  viewAllButtonHref: string;
  services: HomeServiceItem[];
}

