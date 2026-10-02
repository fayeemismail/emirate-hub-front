// ==========================================
// HOME PAGE GROQ QUERIES
// ==========================================

export const HOME_HERO_QUERY = `*[_type == "emirateHomeHero"][0]{
  ...,
  "backgroundImage": coalesce(backgroundImage.asset->url, backgroundImage),
  "backgroundImages": coalesce(backgroundImages[].asset->url, backgroundImages)
}`;

export const HOME_PRICING_QUERY = `*[_type == "emirateHomePricing"][0]{
  ...,
  cards[]{
    ...,
    "id": coalesce(_key, title),
    "serviceSlug": coalesce(serviceSlug, slug)
  }
}`;

export const HOME_SERVICES_QUERY = `*[_type == "emirateHomeServices"][0]{
  ...,
  services[]{
    ...,
    "id": coalesce(slug, _key),
    "image": coalesce(image.asset->url, image)
  }
}`;

export const HOME_CONTACT_QUERY = `*[_type == "emirateHomeContact"][0]{
  ...,
  "advisorImage": coalesce(advisorImage.asset->url, advisorImage)
}`;

export const HOME_BLOGS_QUERY = `*[_type == "emirateHomeBlogSection"][0]{
  ...,
  featuredBlogs[]->{
    ...,
    "id": coalesce(slug.current, slug, _id),
    "slug": coalesce(slug.current, slug),
    "image": coalesce(image.asset->url, image)
  },
  blogs[]{
    ...,
    "image": coalesce(image.asset->url, image)
  }
}`;

export const HOME_FAQ_QUERY = `*[_type == "emirateHomeFaq"][0]{
  ...,
  "image": coalesce(image.asset->url, image),
  faqs[]{
    ...,
    "id": _key
  }
}`;

// ==========================================
// ABOUT PAGE GROQ QUERIES
// ==========================================

export const ABOUT_HERO_QUERY = `*[_type == "emirateAboutHero"][0]{
  ...,
  "images": {
    "topLeft": {
      "src": coalesce(images.topLeft.asset->url, images.topLeft.src, "/images/about/about-1.jpg"),
      "alt": coalesce(images.topLeft.alt, "Emirate Hub Team Collaboration")
    },
    "bottomLeft": {
      "src": coalesce(images.bottomLeft.asset->url, images.bottomLeft.src, "/images/about/about-2.jpg"),
      "alt": coalesce(images.bottomLeft.alt, "Executive Advisory Meeting")
    },
    "topRight": {
      "src": coalesce(images.topRight.asset->url, images.topRight.src, "/images/about/about-3.jpg"),
      "alt": coalesce(images.topRight.alt, "Corporate Strategy Planning")
    },
    "bottomRight": {
      "src": coalesce(images.bottomRight.asset->url, images.bottomRight.src, "/images/about/about-4.jpg"),
      "alt": coalesce(images.bottomRight.alt, "Emirate Hub Business Consultants")
    }
  }
}`;

export const ABOUT_VISION_QUERY = `*[_type == "emirateAboutVision"][0]{
  ...,
  "images": {
    "column1": {
      "src": coalesce(images.column1.asset->url, images.column1.src, "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"),
      "alt": coalesce(images.column1.alt, "Modern Dubai Skyline Landmark")
    },
    "column2": {
      "src": coalesce(images.column2.asset->url, images.column2.src, "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80"),
      "alt": coalesce(images.column2.alt, "Contemporary Commercial Architecture Dubai")
    },
    "column3": {
      "src": coalesce(images.column3.asset->url, images.column3.src, "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"),
      "alt": coalesce(images.column3.alt, "Modern Corporate Tower")
    },
    "column4": {
      "src": coalesce(images.column4.asset->url, images.column4.src, "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80"),
      "alt": coalesce(images.column4.alt, "Dubai Architectural Landmarks and Green Space")
    }
  }
}`;

export const ABOUT_LOCATION_QUERY = `*[_type == "emirateAboutLocation"][0]`;

// ==========================================
// SERVICES PAGE GROQ QUERIES
// ==========================================

export const SERVICES_HERO_QUERY = `*[_type == "emirateServicesHero"][0]{
  ...,
  "backgroundImage": coalesce(backgroundImage.asset->url, backgroundImage)
}`;

export const CORPORATE_SERVICES_QUERY = `*[_type == "emirateCorporateService" && active != false] | order(number asc){
  ...,
  "id": coalesce(slug.current, slug, _id),
  "slug": coalesce(slug.current, slug),
  "image": coalesce(image.asset->url, image),
  "features": keyFeatures
}`;

export const CORPORATE_SERVICE_BY_SLUG_QUERY = `*[_type == "emirateCorporateService" && (slug.current == $slug || slug == $slug)][0]{
  ...,
  "id": coalesce(slug.current, slug, _id),
  "slug": coalesce(slug.current, slug),
  "image": coalesce(image.asset->url, image),
  "features": keyFeatures
}`;

export const ADDITIONAL_SERVICES_QUERY = `*[_type == "emirateAdditionalServicesSection"][0]{
  ...,
  services[]{
    ...,
    "id": coalesce(id, _key)
  }
}`;

export const SERVICES_FAQ_QUERY = `*[_type == "emirateServicesFaq"][0]{
  ...,
  "image": coalesce(image.asset->url, image)
}`;

export const SERVICES_CTA_QUERY = `*[_type == "emirateServicesCta"][0]{
  ...,
  "backgroundImage": coalesce(backgroundImage.asset->url, backgroundImage)
}`;

// ==========================================
// BLOG PAGE GROQ QUERIES
// ==========================================

export const BLOG_HERO_QUERY = `*[_type == "emirateBlogHero"][0]`;

export const BLOG_SETTINGS_QUERY = `*[_type == "emirateBlogSettings"][0]{
  ...,
  highlightedBlog->{
    ...,
    "id": coalesce(slug.current, slug, _id),
    "slug": coalesce(slug.current, slug),
    "image": coalesce(image.asset->url, image),
    author{
      ...,
      "avatar": coalesce(avatar.asset->url, avatar)
    }
  },
  orderedBlogs[]->{
    ...,
    "id": coalesce(slug.current, slug, _id),
    "slug": coalesce(slug.current, slug),
    "image": coalesce(image.asset->url, image),
    author{
      ...,
      "avatar": coalesce(avatar.asset->url, avatar)
    }
  }
}`;

export const BLOG_POSTS_QUERY = `*[_type == "emirateBlogPost" && active != false] | order(coalesce(order, 9999) asc, _createdAt desc){
  ...,
  "id": coalesce(slug.current, slug, _id),
  "slug": coalesce(slug.current, slug),
  "image": coalesce(image.asset->url, image),
  author{
    ...,
    "avatar": coalesce(avatar.asset->url, avatar)
  }
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "emirateBlogPost" && (slug.current == $slug || slug == $slug)][0]{
  ...,
  "id": coalesce(slug.current, slug, _id),
  "slug": coalesce(slug.current, slug),
  "image": coalesce(image.asset->url, image),
  author{
    ...,
    "avatar": coalesce(avatar.asset->url, avatar)
  }
}`;

// ==========================================
// COMMON / GLOBAL GROQ QUERIES
// ==========================================

export const NAVBAR_QUERY = `*[_type == "emirateNavbar"][0]{
  ...,
  "logo": logo.asset->url
}`;

export const FOOTER_QUERY = `*[_type == "emirateFooter"][0]`;

export const CONTACT_CONFIG_QUERY = `*[_type == "emirateContactConfig"][0]`;
 
export const SERVICES_SELECT_OPTIONS_QUERY = `*[_type == "emirateCorporateService" && active != false] | order(coalesce(number, "99") asc, _createdAt asc){
  "label": title,
  "title": title,
  "value": coalesce(slug.current, slug, _id),
  "slug": coalesce(slug.current, slug, _id)
}`;
