export interface BlogHeroBreadcrumb {
  parentLabel: string;
  parentHref: string;
  label: string;
}

export interface BlogHeroQuickTag {
  label: string;
  category: string;
}

export interface BlogHeroSpotlight {
  tag: string;
  title: string;
  readTime: string;
  targetId: string;
  image: string;
}

export interface BlogHeroStat {
  value: string;
  label: string;
}

export interface BlogHeroData {
  active: boolean;
  breadcrumb?: BlogHeroBreadcrumb;
  badge?: string;
  title: string;
  highlightedTitle?: string;
  subtitle?: string;
  description?: string;
  featuredSpotlight?: BlogHeroSpotlight;
  stats?: BlogHeroStat[];
  quickTags?: BlogHeroQuickTag[];
}
