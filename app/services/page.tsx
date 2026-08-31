import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Corporate Services in Dubai & UAE | Emirate Hub",
  description:
    "Explore our complete range of corporate services in the UAE: Company Formation, Visa Services, Corporate Tax, Office Rentals, Banking, and Digital Marketing.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesList />

      {/* Bottom CTA Consultation Banner */}
      <section className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
        {/* Subtle background red glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-primary uppercase mb-3">
              START YOUR UAE JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Ready to Establish & Scale Your Business in Dubai?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8">
              Speak directly with our senior corporate setup consultants for a personalized advisory session tailored to your business activities and growth plans.
            </p>
            <Link
              href="/#contact-us"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary hover:bg-[#c8191e] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-primary/30 active:scale-95"
            >
              <span>REQUEST A FREE CONSULTATION</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
