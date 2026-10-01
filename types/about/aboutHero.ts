export interface AboutHeroBreadcrumb {
  parentLabel: string;
  parentHref: string;
  label: string;
}

export interface AboutHeroCard {
  badgeIcon?: string;
  title: string;
  description: string;
}

export interface AboutHeroImageItem {
  src: string;
  alt: string;
}

export interface AboutHeroImages {
  topLeft: AboutHeroImageItem;
  bottomLeft: AboutHeroImageItem;
  topRight: AboutHeroImageItem;
  bottomRight: AboutHeroImageItem;
}

export interface AboutHeroData {
  active: boolean;
  backgroundColor?: string;
  titleColor?: string;
  highlightColor?: string;
  descriptionColor?: string;
  cardBackgroundColor?: string;
  cardTitleColor?: string;
  cardTextColor?: string;
  breadcrumb: AboutHeroBreadcrumb;
  title: string;
  highlightedTitle?: string;
  bottomDescription: string;
  centerCard: AboutHeroCard;
  images: AboutHeroImages;
}
