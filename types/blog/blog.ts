export interface BlogAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  category?: string;
  date?: string;
  readTime?: string;
  author?: BlogAuthor;
  image?: string;
  featured?: boolean;
  active: boolean;
  tags?: string[];
  sections?: BlogSection[];
  keyTakeaways?: string[];
  summaryQuote?: string;
}

export interface BlogCategory {
  id: string;
  label: string;
}

export interface BlogsPageData {
  active: boolean;
  categories?: BlogCategory[];
  blogs: BlogItem[];
}
