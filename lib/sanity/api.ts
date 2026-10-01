import { sanityFetch } from "./client";
import {
  HOME_HERO_QUERY,
  HOME_PRICING_QUERY,
  HOME_SERVICES_QUERY,
  HOME_CONTACT_QUERY,
  HOME_BLOGS_QUERY,
  HOME_FAQ_QUERY,
  ABOUT_HERO_QUERY,
  ABOUT_VISION_QUERY,
  ABOUT_LOCATION_QUERY,
  SERVICES_HERO_QUERY,
  CORPORATE_SERVICES_QUERY,
  CORPORATE_SERVICE_BY_SLUG_QUERY,
  ADDITIONAL_SERVICES_QUERY,
  SERVICES_FAQ_QUERY,
  SERVICES_CTA_QUERY,
  BLOG_HERO_QUERY,
  BLOG_SETTINGS_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  NAVBAR_QUERY,
  FOOTER_QUERY,
  CONTACT_CONFIG_QUERY,
} from "./queries";

// Fallback static JSON imports
import defaultHeroData from "@/data/home/hero.json";
import defaultPricingData from "@/data/home/pricing.json";
import defaultServiceData from "@/data/home/service.json";
import defaultBlogData from "@/data/home/blog.json";
import defaultAboutHeroData from "@/data/about/aboutHero.json";
import defaultVisionData from "@/data/about/vision.json";
import defaultLocationData from "@/data/about/location.json";
import defaultServicesListData from "@/data/service/servicesList.json";
import defaultAdditionalServicesData from "@/data/service/additionalServices.json";
import defaultServiceFaqData from "@/data/service/faq.json";
import defaultBlogHeroData from "@/data/blog/blogHero.json";
import defaultBlogsData from "@/data/blog/blogsData.json";

// Type imports
import { HeroData } from "@/types/home/hero";
import { PricingData } from "@/types/home/pricing";
import { HomeServiceData } from "@/types/home/service";
import { HomeBlogData } from "@/types/home/blog";
import { HomeContactData } from "@/types/home/contact";
import { HomeFaqData } from "@/types/home/faq";
import { AboutHeroData } from "@/types/about/aboutHero";
import { VisionData } from "@/types/about/vision";
import { LocationData } from "@/types/about/location";
import { BlogHeroData } from "@/types/blog/blogHero";
import { BlogPost, BlogsPageData } from "@/types/blog/blog";
import { NavbarData } from "@/types/common/navbar";
import { FooterData } from "@/types/common/footer";
import { ServiceDetailData } from "@/lib/services";

// ==========================================
// HOME PAGE FETCHERS
// ==========================================

export async function getHomeHeroData(): Promise<HeroData> {
  const data = await sanityFetch<HeroData>({
    query: HOME_HERO_QUERY,
    tags: ["emirateHomeHero"],
  });
  if (data && data.active !== false && data.heading) {
    return data;
  }
  return defaultHeroData as unknown as HeroData;
}

export async function getHomePricingData(): Promise<PricingData> {
  const data = await sanityFetch<PricingData>({
    query: HOME_PRICING_QUERY,
    tags: ["emirateHomePricing"],
  });
  if (data && data.active !== false && data.cards?.length) {
    return data;
  }
  return defaultPricingData as unknown as PricingData;
}

export async function getHomeServicesData(): Promise<HomeServiceData> {
  const data = await sanityFetch<HomeServiceData>({
    query: HOME_SERVICES_QUERY,
    tags: ["emirateHomeServices"],
  });
  if (data && data.active !== false && data.services?.length) {
    return data;
  }
  return defaultServiceData as unknown as HomeServiceData;
}

export async function getHomeContactData(): Promise<HomeContactData | null> {
  const data = await sanityFetch<HomeContactData>({
    query: HOME_CONTACT_QUERY,
    tags: ["emirateHomeContact"],
  });
  return data;
}

export async function getHomeBlogSectionData(): Promise<HomeBlogData> {
  const data = await sanityFetch<HomeBlogData>({
    query: HOME_BLOGS_QUERY,
    tags: ["emirateHomeBlogSection"],
  });
  if (data && data.active !== false && data.blogs?.length) {
    return data;
  }
  return defaultBlogData as unknown as HomeBlogData;
}

export async function getHomeFaqData(): Promise<HomeFaqData | null> {
  const data = await sanityFetch<HomeFaqData>({
    query: HOME_FAQ_QUERY,
    tags: ["emirateHomeFaq"],
  });
  return data;
}

// ==========================================
// ABOUT PAGE FETCHERS
// ==========================================

export async function getAboutHeroData(): Promise<AboutHeroData> {
  const data = await sanityFetch<AboutHeroData>({
    query: ABOUT_HERO_QUERY,
    tags: ["emirateAboutHero"],
  });
  if (data && data.active !== false) {
    return data;
  }
  return defaultAboutHeroData as unknown as AboutHeroData;
}

export async function getAboutVisionData(): Promise<VisionData> {
  const data = await sanityFetch<VisionData>({
    query: ABOUT_VISION_QUERY,
    tags: ["emirateAboutVision"],
  });
  if (data && data.active !== false) {
    return data;
  }
  return defaultVisionData as unknown as VisionData;
}

export async function getAboutLocationData(): Promise<LocationData> {
  const data = await sanityFetch<LocationData>({
    query: ABOUT_LOCATION_QUERY,
    tags: ["emirateAboutLocation"],
  });
  if (data && data.active !== false) {
    return data;
  }
  return defaultLocationData as unknown as LocationData;
}

// ==========================================
// SERVICES PAGE FETCHERS
// ==========================================

export async function getServicesHeroData(): Promise<any> {
  const data = await sanityFetch({
    query: SERVICES_HERO_QUERY,
    tags: ["emirateServicesHero"],
  });
  return data;
}

export async function getCorporateServicesData(): Promise<ServiceDetailData[]> {
  const data = await sanityFetch<ServiceDetailData[]>({
    query: CORPORATE_SERVICES_QUERY,
    tags: ["emirateCorporateService"],
  });
  if (data && data.length > 0) {
    return data;
  }
  return defaultServicesListData.services as unknown as ServiceDetailData[];
}

export async function getCorporateServiceBySlug(
  slug: string
): Promise<ServiceDetailData | null> {
  const data = await sanityFetch<ServiceDetailData>({
    query: CORPORATE_SERVICE_BY_SLUG_QUERY,
    params: { slug },
    tags: ["emirateCorporateService"],
  });
  return data;
}

export async function getAdditionalServicesData() {
  const data = await sanityFetch({
    query: ADDITIONAL_SERVICES_QUERY,
    tags: ["emirateAdditionalServicesSection"],
  });
  if (data) return data;
  return defaultAdditionalServicesData;
}

export async function getServicesFaqData() {
  const data = await sanityFetch({
    query: SERVICES_FAQ_QUERY,
    tags: ["emirateServicesFaq"],
  });
  if (data) return data;
  return defaultServiceFaqData;
}

export interface ServicesCtaData {
  active?: boolean;
  tag?: string;
  badge?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  tagColor?: string;
}

export async function getServicesCtaData(): Promise<ServicesCtaData | null> {
  const data = await sanityFetch<ServicesCtaData>({
    query: SERVICES_CTA_QUERY,
    tags: ["emirateServicesCta"],
  });
  return data;
}

// ==========================================
// BLOG PAGE FETCHERS
// ==========================================

export async function getBlogHeroData(): Promise<BlogHeroData> {
  const data = await sanityFetch<BlogHeroData>({
    query: BLOG_HERO_QUERY,
    tags: ["emirateBlogHero"],
  });
  if (data && data.active !== false) {
    return data;
  }
  return defaultBlogHeroData as unknown as BlogHeroData;
}

const localBlogPosts = defaultBlogsData.blogs as unknown as BlogPost[];

function backfillArticleSections(post: BlogPost): BlogPost {
  if (post.sections && post.sections.length > 0) return post;

  const local = localBlogPosts.find(
    (item) =>
      item.id === post.id ||
      item.title.trim().toLowerCase() === post.title?.trim().toLowerCase()
  );

  if (!local?.sections?.length) return post;
  return { ...post, sections: local.sections };
}

export async function getBlogPageData(): Promise<BlogsPageData> {
  const [settings, posts] = await Promise.all([
    sanityFetch<{ active?: boolean; categories?: { id: string; label: string }[]; backgroundColor?: string }>({
      query: BLOG_SETTINGS_QUERY,
      tags: ["emirateBlogSettings"],
    }),
    sanityFetch<BlogPost[]>({
      query: BLOG_POSTS_QUERY,
      tags: ["emirateBlogPost"],
    }),
  ]);

  if (posts && posts.length > 0) {
    return {
      active: settings?.active ?? true,
      backgroundColor: settings?.backgroundColor,
      categories: settings?.categories || (defaultBlogsData.categories as any),
      blogs: posts.map(backfillArticleSections),
    };
  }

  return defaultBlogsData as unknown as BlogsPageData;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await sanityFetch<BlogPost>({
    query: BLOG_POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ["emirateBlogPost"],
  });
  if (post && post.active !== false) return backfillArticleSections(post);

  const local = localBlogPosts.find((b) => b.id === slug && b.active !== false);
  return local || null;
}

// ==========================================
// COMMON FETCHERS
// ==========================================

export async function getNavbarData(): Promise<NavbarData | null> {
  return sanityFetch<NavbarData>({
    query: NAVBAR_QUERY,
    tags: ["emirateNavbar"],
  });
}

export async function getFooterData(): Promise<FooterData | null> {
  return sanityFetch<FooterData>({
    query: FOOTER_QUERY,
    tags: ["emirateFooter"],
  });
}

export async function getContactConfigData() {
  const data = await sanityFetch({
    query: CONTACT_CONFIG_QUERY,
    tags: ["emirateContactConfig"],
  });
  return data;
}
