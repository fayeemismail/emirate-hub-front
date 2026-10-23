import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageLoader from "@/components/common/PageLoader";
import Analytics, { AnalyticsHead, AnalyticsBody } from "@/components/analytics/Analytics";
import StructuredData from "@/components/seo/StructuredData";
import { getFooterData, getNavbarData, getGlobalSeoData } from "@/lib/sanity/api";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/schemaOrg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const globalSeo = await getGlobalSeoData();
  const siteUrl = globalSeo.siteUrl || "https://emiratehub.ae";
  const defaultTitle =
    globalSeo.defaultSeoTitle || "Emirate Hub | Business Setup & Company Formation Dubai, UAE";
  const titleTemplate = `%s ${globalSeo.titleSeparator || "|"} ${globalSeo.siteName || "Emirate Hub"}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: titleTemplate,
    },
    description: globalSeo.defaultMetaDescription,
    keywords: globalSeo.defaultKeywords,
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title: defaultTitle,
      description: globalSeo.defaultMetaDescription,
      url: siteUrl,
      siteName: globalSeo.siteName || "Emirate Hub",
      locale: globalSeo.locale || "en_AE",
      type: "website",
      images: globalSeo.defaultOgImage
        ? [
            {
              url: globalSeo.defaultOgImage,
              alt: globalSeo.defaultOgImageAlt || defaultTitle,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
    twitter: {
      card: (globalSeo.twitterCardType || "summary_large_image") as "summary" | "summary_large_image",
      title: defaultTitle,
      description: globalSeo.defaultMetaDescription,
      images: globalSeo.defaultOgImage ? [globalSeo.defaultOgImage] : undefined,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: globalSeo.siteName || "Emirate Hub",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navbarData, footerData, globalSeo] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getGlobalSeoData(),
  ]);

  const organizationSchema = buildOrganizationSchema(globalSeo);
  const webSiteSchema = buildWebSiteSchema(globalSeo);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black`}
    >
      <head>
        <AnalyticsHead seoData={globalSeo} />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Meta Pixel Code */}
        <script
          id="meta-pixel"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1473858871551456');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1473858871551456&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <AnalyticsBody seoData={globalSeo} />
        <StructuredData data={[organizationSchema, webSiteSchema]} />
        <PageLoader />
        <Navbar data={navbarData} />
        <main>{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
