import { GlobalSeoData, PageSeoData } from "@/types/seo";

export function buildOrganizationSchema(globalSeo: GlobalSeoData) {
  const socialUrls = (globalSeo.socialLinks || [])
    .map((item) => item.url)
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${globalSeo.siteUrl || "https://emiratehub.ae"}/#organization`,
    name: globalSeo.organizationName || globalSeo.siteName || "Emirate Hub Corporate Services",
    url: globalSeo.siteUrl || "https://emiratehub.ae",
    logo: globalSeo.organizationLogo || `${globalSeo.siteUrl || "https://emiratehub.ae"}/images/logo.png`,
    description: globalSeo.organizationDescription || globalSeo.defaultMetaDescription,
    telephone: globalSeo.supportPhone || "+971 50 943 2297",
    email: globalSeo.supportEmail || "contact@emiratehub.ae",
    address: {
      "@type": "PostalAddress",
      streetAddress: globalSeo.addressStreet || "Unit 2204, 22nd Floor, Iris Bay Tower",
      addressLocality: globalSeo.addressLocality || "Business Bay, Dubai",
      addressCountry: globalSeo.addressCountry || "AE",
    },
    sameAs: socialUrls.length > 0 ? socialUrls : undefined,
  };
}

export function buildWebSiteSchema(globalSeo: GlobalSeoData) {
  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: globalSeo.siteName || "Emirate Hub",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: globalSeo.locale ? globalSeo.locale.replace("_", "-") : "en-AE",
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildServiceSchema(service: any, globalSeo: GlobalSeoData) {
  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const serviceSlug = service.slug || service.id;
  const serviceUrl = `${siteUrl}/services/${serviceSlug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}/#service`,
    name: service.title,
    description: service.description,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      name: globalSeo.organizationName || "Emirate Hub Corporate Services",
      url: siteUrl,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "United Arab Emirates",
    },
    serviceType: service.title,
    image: service.image || undefined,
  };
}

export function buildArticleSchema(blog: any, globalSeo: GlobalSeoData) {
  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const postSlug = blog.slug || blog.id;
  const postUrl = `${siteUrl}/blog/${postSlug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: blog.title,
    description: blog.excerpt || blog.title,
    url: postUrl,
    image: blog.image ? [blog.image] : undefined,
    datePublished: blog.date || blog._createdAt || undefined,
    dateModified: blog._updatedAt || blog.date || undefined,
    author: {
      "@type": "Person",
      name: blog.author?.name || "Emirate Hub Advisory Team",
    },
    publisher: {
      "@type": "Organization",
      name: globalSeo.organizationName || "Emirate Hub Corporate Services",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: globalSeo.organizationLogo || `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };
}
