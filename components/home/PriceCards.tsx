"use client";

import { FiShoppingBag } from "react-icons/fi";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";

const pricingCards = [
  {
    id: 1,
    icon: FiShoppingBag,
    title: "E-commerce, ITeS and Advertising Licenses",
    startingAt: "starting at",
    price: "AED 5750",
  },
  {
    id: 2,
    icon: TbBuildingSkyscraper,
    title: "Dubai Mainland License",
    startingAt: "starting at",
    price: "AED 15000",
  },
  {
    id: 3,
    icon: BsBuildings,
    title: "Freezone License with Free Lifetime Visa",
    startingAt: "starting at",
    price: "AED 12500",
  },
];

export default function PriceCards() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F6FB]">
      <div className="site-container">
        <div className="pb-10 text-center md:text-left">
          <h3 className="relative text-7xl md:text-6xl lg:text-6xl font-bold font-sans text-primary cursor-pointer inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">
            Pricing
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pricingCards.map((card, index) => {
            const IconComponent = card.icon;
            const isLastCard = index === pricingCards.length - 1;
            return (
              <div
                key={card.id}
                className={`group bg-white rounded-2xl p-8 md:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col justify-between border border-gray-100 ${isLastCard ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
              >
                <div>
                  {/* Red Circle Icon Container */}
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300 ease-in-out">
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-8 min-h-[3.5rem] flex items-start">
                    {card.title}
                  </h4>
                </div>

                <div>
                  {/* Starting price label */}
                  <p className="text-gray-400 text-base font-normal mb-1">
                    {card.startingAt}
                  </p>

                  {/* Price */}
                  <p className="text-2xl md:text-3xl font-extrabold text-gray-700 tracking-tight mb-6">
                    {card.price}
                  </p>

                  {/* Enquire Now Button */}
                  <button className="w-fit px-6 py-3 bg-primary hover:bg-[#c8191e] text-white font-bold text-xs tracking-wider uppercase rounded-lg transition-all duration-300 ease-in-out cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02]">
                    ENQUIRE NOW
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
