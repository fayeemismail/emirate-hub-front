import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageLoader from "@/components/common/PageLoader";
import { getFooterData, getNavbarData } from "@/lib/sanity/api";

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

export const metadata: Metadata = {
  title: "Emirate Hub",
  description: "Emirate Hub",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Emirate Hub",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [navbarData, footerData] = await Promise.all([
    getNavbarData(),
    getFooterData(),
  ]);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black`}
    >
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <PageLoader />
        <Navbar data={navbarData} />
        <main>
          {children}
        </main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
