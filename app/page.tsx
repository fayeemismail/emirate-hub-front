import BlogsAndNews from "@/components/home/BlogsAndNews";
import ContactUs from "@/components/home/ContactUs";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import PriceCards from "@/components/home/PriceCards";
import Service from "@/components/home/Service";
// import Testimonials from "@/components/home/Testimonials";

import {
  getHomeHeroData,
  getHomePricingData,
  getHomeServicesData,
  getHomeContactData,
  getHomeBlogSectionData,
  getHomeFaqData,
} from "@/lib/sanity/api";

export const revalidate = 60;

export default async function Home() {
  const [heroData, pricingData, serviceData, contactData, blogData, faqData] =
    await Promise.all([
      getHomeHeroData(),
      getHomePricingData(),
      getHomeServicesData(),
      getHomeContactData(),
      getHomeBlogSectionData(),
      getHomeFaqData(),
    ]);

  return (
    <main>
      {heroData?.active !== false && <Hero data={heroData} />}
      {pricingData?.active !== false && <PriceCards data={pricingData} />}
      {serviceData?.active !== false && <Service data={serviceData} />}
      {contactData?.active !== false && <ContactUs data={contactData} />}
      {/* Testimonials remains commented until active */}
      {blogData?.active !== false && <BlogsAndNews data={blogData} />}
      {faqData?.active !== false && <Faq data={faqData} />}
    </main>
  );
}
