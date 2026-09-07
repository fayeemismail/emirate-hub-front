export interface HomeServiceItem {
  id: number | string;
  slug: string;
  number: string;
  tag: string;
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  active?: boolean;
}

export interface HomeServiceData {
  active: boolean;
  badge: string;
  titlePrefix: string;
  highlightedTitle: string;
  titleSuffix: string;
  description: string;
  viewAllButtonText: string;
  viewAllButtonHref: string;
  services: HomeServiceItem[];
}
