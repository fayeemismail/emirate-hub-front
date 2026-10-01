import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OurVision from "@/components/about/OurVision";
import OfficeLocationMap from "@/components/about/OfficeLocationMap";
import {
  getAboutHeroData,
  getAboutVisionData,
  getAboutLocationData,
} from "@/lib/sanity/api";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us | Emirate Hub Dubai",
  description:
    "Discover Emirate Hub - Dubai's leading corporate advisory and business setup firm. Learn about our passionate team, mission, and turnkey UAE enterprise solutions.",
};

export default async function AboutPage() {
  const [heroData, visionData, locationData] = await Promise.all([
    getAboutHeroData(),
    getAboutVisionData(),
    getAboutLocationData(),
  ]);

  return (
    <main>
      {heroData?.active !== false && <AboutHero data={heroData} />}
      {visionData?.active !== false && <OurVision data={visionData} />}
      {locationData?.active !== false && (
        <OfficeLocationMap data={locationData} />
      )}
    </main>
  );
}
