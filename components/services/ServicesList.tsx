"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export interface ServiceItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  image: string;
  description: string;
  keyFeatures: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "business-incorporation",
    number: "01",
    tag: "COMPANY FORMATION",
    title: "Business Incorporation",
    image: "/images/service-1.jpg",
    description:
      "We have streamlined the complexities of incorporating a company in Dubai so entrepreneurs and businesses can quickly establish their presence. From initial name reservation to final trade license issuance, our specialists deliver seamless guidance.",
    keyFeatures: [
      "Mainland, Free Zone & Offshore Company Licensing",
      "100% Foreign Ownership Structuring",
      "Department of Economy and Tourism (DET) Approvals",
      "Memorandum of Association (MOA) Drafting & Legal Typing",
    ],
  },
  {
    id: "visa-services",
    number: "02",
    tag: "VISA & IMMIGRATION",
    title: "Visa Services",
    image: "/images/service-2.jpg",
    description:
      "We offer end‑to‑end visa and immigration services for companies in UAE mainland and free zones, handling employment visas, family sponsorship, visit visas, Emirates ID, medical coordination and establishment card renewals. Our team manages all government liaison with GDRFA, ICP, MOHRE and free zone authorities, from document preparation and application submission to status tracking and final delivery, ensuring compliance, timely processing and minimal disruption to your business.",
    keyFeatures: [
      "Investor & Partner Golden Visas (10-Year Residency)",
      "Employee & Employment Visa Quota Allocations",
      "Family & Dependent Visa Sponsorship Facilitation",
      "Emirates ID Biometrics & Medical Fitness VIP Typing",
    ],
  },
  {
    id: "tax-readiness",
    number: "03",
    tag: "TAX & COMPLIANCE",
    title: "Tax Readiness",
    image: "/images/service-3.jpg",
    description:
      "We provide corporate tax consulting services tailored for businesses operating in UAE mainland and free zones, guiding you through corporate tax registration, return filings, compliance assessments, and strategic planning to ensure full regulatory alignment.",
    keyFeatures: [
      "UAE Corporate Tax Registration & Compliance Review",
      "Value Added Tax (VAT) Registration & Periodic Filings",
      "Qualifying Free Zone Person (QFZP) Optimization",
      "Bookkeeping, Financial Reporting & Audit Preparation",
    ],
  },
  {
    id: "office-rentals",
    number: "04",
    tag: "COMMERCIAL SPACES",
    title: "Office Rentals",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    description:
      "We offer end‑to‑end office rental agreement services for businesses setting up or relocating in UAE mainland and free zones.",
    keyFeatures: [
      "Ejari Attestation & Tenancy Contract Approvals",
      "Flexi-Desks, Coworking & Shared Business Spaces",
      "Furnished Private Offices & Commercial Suites in Prime Hubs",
      "Virtual Office Solutions with Dedicated Mail Handling",
    ],
  },
  {
    id: "banking",
    number: "05",
    tag: "FINANCIAL SERVICES",
    title: "Banking",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    description:
      "We help businesses open corporate bank accounts, set up payment gateways and access a full range of banking services in the UAE. From KYC and documentation to liaison with banks and payment providers, we ensure a smooth, compliant onboarding so you can start transacting quickly and focus on growing your business.",
    keyFeatures: [
      "Corporate Bank Account Opening with Top UAE Tier-1 Banks",
      "Multi-Currency Merchant Accounts (AED, USD, EUR, GBP)",
      "Payment Gateway Integration for E-Commerce & Retail",
      "Source of Funds, KYC & Compliance Advisory",
    ],
  },
  {
    id: "digital-marketing",
    number: "06",
    tag: "DIGITAL & MEDIA",
    title: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    description:
      "We help you create a professional website for your company and leverage digital marketing and social media to reach more customers. From design and content to targeted campaigns and social media management, we build your online presence to support your business growth in the UAE and beyond.",
    keyFeatures: [
      "Custom Modern Website Design & High-Converting Landing Pages",
      "Search Engine Optimization (SEO) & Google Ads (PPC)",
      "Social Media Management & Paid Ads (Meta, LinkedIn, TikTok)",
      "Corporate Brand Identity, Logo Design & Content Strategy",
    ],
  },
];

export default function ServicesList() {
  const router = useRouter();
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const targetId = window.location.hash.replace("#", "");
        setActiveHash(targetId);

        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const navOffset = 96;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 150);
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  const handlePillClick = (id: string) => {
    setActiveHash(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#F2F3EE]/60 overflow-hidden">
      <div className="site-container">
        {/* Category Pills Navigation Bar */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-2 gap-2.5 sm:gap-3 no-scrollbar">
            {servicesData.map((service) => {
              const isActive = activeHash === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handlePillClick(service.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider whitespace-nowrap transition-all duration-300 border cursor-pointer select-none ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-md scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary shadow-xs"
                  }`}
                >
                  <span className="opacity-70 mr-1.5">{service.number}.</span>
                  <span>{service.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alternating Services Cards List */}
        <div className="space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16">
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 1; // 2nd, 4th, 6th rows: Image Left, Details Right
            const isTargeted = activeHash === service.id;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`scroll-mt-24 md:scroll-mt-28 rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-500 ${
                  isTargeted
                    ? "bg-white ring-2 ring-primary/40 shadow-xl"
                    : "bg-transparent"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                  {/* Image Column */}
                  <div
                    className={`order-1 lg:col-span-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative w-full max-w-lg mx-auto lg:max-w-none aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.08)] group bg-gray-200">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {/* Number Overlay Badge */}
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full border border-white/20">
                        {service.number}
                      </div>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div
                    className={`order-2 lg:col-span-6 flex flex-col justify-center ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Header Tag */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="text-sm font-bold text-primary tracking-widest">
                        {service.number}
                      </span>
                      <span className="h-px w-8 bg-primary/40" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        {service.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-3 sm:mb-4">
                      {service.title}
                    </h2>

                    {/* Full Description */}
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-5">
                      {service.description}
                    </p>

                    {/* Key Features Bullet List */}
                    <div className="space-y-2 mb-6 sm:mb-7">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        What&apos;s Included:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.keyFeatures.map((feature, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-gray-700"
                          >
                            <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                              <FiCheck className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enquire CTA Button */}
                    <div>
                      <button
                        type="button"
                        onClick={() => router.push("/#contact-us")}
                        className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-primary bg-primary text-white hover:bg-[#c8191e] font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                      >
                        <span>ENQUIRE FOR THIS SERVICE</span>
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Divider Line between services */}
                {index !== servicesData.length - 1 && (
                  <div className="w-full h-px bg-gray-300/50 mt-10 sm:mt-12 md:mt-14" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
