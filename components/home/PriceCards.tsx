"use client";

export default function PriceCards() {
  return (
    <section className="min-h-[75vh] py-20">
      <div className="site-container ">
        <div className="pb-10">
        <h3 className="text-7xl font-sans text-primary ">Pricing</h3>
        </div>
        <div className="flex flex-col md:flex lg:flex-row gap-5">
          <div className="w-full lg:w-1/3 p-5 rounded-lg border drop-shadow-2xl shadow-xl border-black/10  ">card one</div>
          <div className="w-full lg:w-1/3 p-5 rounded-lg border drop-shadow-2xl shadow-xl border-black/10  ">card two</div>
          <div className="w-full lg:w-1/3 p-5 rounded-lg border drop-shadow-2xl shadow-xl border-black/10  ">card three</div>
        </div>
      </div>
    </section>
  );
}
