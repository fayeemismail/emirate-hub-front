"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

const services = [
  {
    id: 1,
    image: "/images/service-1.jpg",
    title: "Business Incorporation",
    description:
      "We have streamlined the complexities of incorporating a company in Dubai so entrepreneurs and businesses can quickly get to where they want to be, wherever their starting point may be.",
  },
  {
    id: 2,
    image: "/images/service-2.jpg",
    title: "Professional Partnership",
    description:
      "EMIRATE HUB Dubai operates on a unique Business to Business (B2B) Model. We work hand-in-hand with our Professional Partners towards a common goal: long-term business relationships and continuing success.",
  },
  {
    id: 3,
    image: "/images/service-3.jpg",
    title: "Discover the Benefits of Being our Partner",
    description:
      "If you are a business formation specialist, a law firm, or an agency located in the UAE or internationally, Emirate Hub offers a world of opportunities as an Emirate Hub Referrer or a Professional Partner.",
  },
];

// Framer Motion animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Service() {
  return (
    <section className="py-16 md:py-24 bg-[#F2F3EE]/50 overflow-hidden">
      <div className="site-container">
        {/* Section Heading - Matching About and PriceCards style */}
        <div className="pb-8 text-center md:text-left">
          <h2 className="relative text-5xl md:text-6xl lg:text-6xl font-bold font-sans text-primary cursor-pointer inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.75 after:bg-primary hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">
            Service
          </h2>
        </div>

        {/* Subtitle Header Section like the Reference Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 px-4"
        >
          {/* Small Top Subtitle */}
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase mb-3">
            SERVICES
          </span>

          {/* Main Title with Emirate Hub in Red */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            What <span className="text-primary">Emirate Hub</span> can do for you
          </h3>

          {/* Descriptive Subtitle Text */}
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl font-light">
            Emirate Hub provides premium standards of business setup solutions for SMEs through our wide network of Professional Partners and Business Communities.
          </p>
        </motion.div>

        {/* Cards Grid Container with Stagger Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] transition-shadow duration-300 flex flex-col justify-between border border-gray-100/80"
            >
              <div>
                {/* Image Container with Zoom Effect */}
                <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-100">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-4 min-h-14 flex items-start">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light mb-6">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer with Animated Button */}
              <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="group/btn relative inline-flex items-center gap-3 px-6 py-3.5 bg-primary hover:bg-[#c8191e] text-white font-semibold text-xs tracking-wider uppercase rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer select-none"
                >
                  <span>LEARN MORE</span>
                  <FiArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1.5 transition-transform duration-300 ease-in-out" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
