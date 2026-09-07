export interface HomeBlogCard {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  active?: boolean;
}

export interface HomeBlogData {
  active: boolean;
  title: string;
  titleHref?: string;
  subtitle: string;
  viewAllText: string;
  viewAllHref: string;
  blogs: HomeBlogCard[];
}
