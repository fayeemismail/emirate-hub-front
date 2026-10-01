export interface HomeBlogCard {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  active?: boolean;
  cardTitleColor?: string;
  cardTextColor?: string;
}

export interface HomeBlogData {
  active: boolean;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  cardTitleColor?: string;
  cardTextColor?: string;
  title: string;
  titleHref?: string;
  subtitle: string;
  viewAllText: string;
  viewAllHref: string;
  blogs: HomeBlogCard[];
}

