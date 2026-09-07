import BlogsAndNews from "@/components/home/BlogsAndNews";
import ContactUs from "@/components/home/ContactUs";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import PriceCards from "@/components/home/PriceCards";
import Service from "@/components/home/Service";
import Testimonials from "@/components/home/Testimonials";
import pricingData from "@/data/home/pricing.json";
import serviceData from "@/data/home/service.json";
import testimonialsData from "@/data/home/testimonials.json";
import heroData from "@/data/home/hero.json";
import blogData from "@/data/home/blog.json";

export default function Home() {
  return (
    <main>
      {heroData.active && <Hero />}
      {pricingData.active && <PriceCards />}
      {serviceData.active && <Service />}
      <ContactUs />
      {testimonialsData.active && <Testimonials />}
      {blogData.active && <BlogsAndNews />}
      <Faq />
    </main>
  );
}
