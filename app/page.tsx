import BlogsAndNews from "@/components/home/BlogsAndNews";
import ContactUs from "@/components/home/ContactUs";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import PriceCards from "@/components/home/PriceCards";
import Service from "@/components/home/Service";
import Testimonials from "@/components/home/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <PriceCards />
      <Service />
      <ContactUs />
      <Testimonials />
      <BlogsAndNews />
      <Faq />
    </main>
  );
}
