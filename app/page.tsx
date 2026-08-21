import About from "@/components/home/About";
import ContactUs from "@/components/home/ContactUs";
import Hero from "@/components/home/Hero";
import PriceCards from "@/components/home/PriceCards";
import Service from "@/components/home/Service";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <PriceCards />
      <About />
      <ContactUs />
      <Service />
    </main>
  );
}
