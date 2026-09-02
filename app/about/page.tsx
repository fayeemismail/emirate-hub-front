import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OurVision from "@/components/about/OurVision";
import ServicesCta from "@/components/services/ServicesCta";
import aboutHeroData from "@/data/about/aboutHero.json";
import visionData from "@/data/about/vision.json";

export const metadata: Metadata = {
  title: "About Us | Emirate Hub Dubai",
  description:
    "Discover Emirate Hub - Dubai's leading corporate advisory and business setup firm. Learn about our passionate team, mission, and turnkey UAE enterprise solutions.",
};

export default function AboutPage() {
  return (
    <main>
      {aboutHeroData.active && <AboutHero />}
      {visionData.active && <OurVision />}
      <ServicesCta />
    </main>
  );
}
