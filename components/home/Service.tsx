"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

const services = [
  {
    id: 1,
    number: "01",
    tag: "COMPANY FORMATION",
    image: "/images/service-1.jpg",
    title: "Business Incorporation",
    description:
      "We have streamlined the complexities of incorporating a company in Dubai so entrepreneurs and businesses can quickly establish their presence. From initial name reservation to final trade license issuance, our specialists deliver seamless guidance.",
  },
  {
    id: 2,
    number: "02",
    tag: "VISA & IMMIGRATION",
    image: "/images/service-2.jpg",
    title: "Visa Services",
    description:
      "We offer end‑to‑end visa and immigration services for companies in UAE mainland and free zones, handling employment visas, family sponsorship, visit visas, Emirates ID, medical coordination and establishment card renewals. Our team manages all government liaison with GDRFA, ICP, MOHRE...",
  },
  {
    id: 3,
    number: "03",
    tag: "TAX & COMPLIANCE",
    image: "/images/service-3.jpg",
    title: "Tax Readiness",
    description:
      "We provide comprehensive corporate tax consulting services tailored for businesses operating in UAE mainland and free zones, guiding you through corporate tax registration, return filings, compliance assessments, and strategic planning to ensure full regulatory alignment.",
  },
];

export default function Service() {
  const router = useRouter();

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-[#F2F3EE]/50 overflow-hidden">
      <div className="site-container">
        {/* Subtitle Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-14 px-4">
          {/* Small Top Subtitle */}
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">
            SERVICES
          </span>

          {/* Main Title with Emirate Hub in Red */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            What <span className="text-primary">Emirate Hub</span> can do for you
          </h2>

          {/* Descriptive Subtitle Text */}
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl font-light">
            Emirate Hub provides premium standards of business setup solutions for SMEs through our wide network of Professional Partners and Business Communities.
          </p>
        </div>

        {/* View All Services Top Right Button (Desktop / Tablet) */}
        <div className="hidden md:flex justify-end items-center mb-8 md:mb-10">
          <button
            type="button"
            onClick={() => router.push("/coming-soon")}
            className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
          >
            <span>VIEW ALL SERVICES</span>
            <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
          </button>
        </div>

        {/* Alternating Services Rows */}
        <div className="space-y-14 md:space-y-16 lg:space-y-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 1; // 2nd row: Image Left, Details Right
            const isLast = index === services.length - 1;

            return (
              <div key={service.id}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Image Column - First on small screens (order-1), Alternating on desktop */}
                  <div
                    className={`order-1 lg:col-span-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative w-full max-w-lg mx-auto lg:max-w-none aspect-4/3 sm:aspect-16/10 md:aspect-16/10 lg:aspect-4/3 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] group bg-gray-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Details Column - Second on small screens (order-2), Alternating on desktop */}
                  <div
                    className={`order-2 lg:col-span-6 flex flex-col justify-center ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-primary tracking-widest">
                        {service.number}
                      </span>
                      <span className="h-px w-8 bg-primary/40" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-6 max-w-xl">
                      {service.description}
                    </p>

                    {/* Action Button */}
                    <div>
                      <button
                        type="button"
                        onClick={() => router.push("/coming-soon")}
                        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                      >
                        <span>LEARN MORE</span>
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtle low opacity divider line between services on small screens only */}
                {!isLast && (
                  <div className="w-full h-px bg-gray-400/25 mt-14 md:mt-16 lg:hidden" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile View All Services Bottom Button */}
        <div className="flex md:hidden justify-center items-center mt-12 sm:mt-14">
          <button
            type="button"
            onClick={() => router.push("/coming-soon")}
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
          >
            <span>VIEW ALL SERVICES</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
          </button>
        </div>
      </div>
    </section>
  );
}

