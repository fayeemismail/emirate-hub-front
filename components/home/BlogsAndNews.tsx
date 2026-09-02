"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import rawBlogsData from "@/data/blog/blogsData.json";
import { BlogsPageData } from "@/types/blog/blog";

export default function BlogsAndNews() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const data: BlogsPageData = rawBlogsData as BlogsPageData;

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      router.push("/blog");
    }, 400);
  };

  const blog1 = data.blogs[0];
  const blog2 = data.blogs[1];
  const blog3 = data.blogs[2];
  const blog4 = data.blogs[3];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="site-container">
        {/* Main Section Heading - Matching About and PriceCards style */}
        <div className="pb-4 text-center md:text-left">
          <Link href="/blog">
            <h2 className="relative text-5xl md:text-6xl lg:text-6xl font-bold font-sans text-primary cursor-pointer inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.75 after:bg-primary hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">
              Blogs & News
            </h2>
          </Link>
        </div>

        {/* Subtitle */}
        <div className="mb-10 text-center md:text-left">
          <p className="text-gray-600 text-lg md:text-xl font-light">
            Keep up with the latest news
          </p>
        </div>

        {/* News Grid / Mobile Horizontal Scroll */}
        <div className="flex lg:grid lg:grid-cols-12 overflow-x-auto lg:overflow-visible gap-5 sm:gap-6 lg:gap-8 pb-4 lg:pb-0 -mx-5 px-5 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:mx-0 lg:px-0 snap-x snap-mandatory lg:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* CARD 1: Top Left - Featured Dark Overlay Card */}
          {blog1 && (
            <div className="w-[85vw] max-w-[340px] sm:w-[360px] sm:max-w-[360px] md:w-[400px] md:max-w-[400px] lg:w-auto lg:max-w-none shrink-0 lg:shrink lg:col-span-7 snap-start">
              <Link
                href={`/blog#${blog1.id}`}
                className="relative overflow-hidden rounded-2xl md:rounded-[24px] h-full min-h-[380px] md:min-h-[420px] flex flex-col justify-end p-6 md:p-8 group cursor-pointer shadow-sm block"
              >
                <img
                  src={blog1.image}
                  alt={blog1.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />

                <div className="relative z-10 max-w-xl">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug mb-3">
                    {blog1.title}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                    {blog1.excerpt}
                  </p>
                  <span className="inline-block text-white text-xs md:text-sm font-semibold underline underline-offset-4 decoration-primary hover:text-primary transition-colors">
                    Read More
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* CARD 2: Top Right - Vertical Card */}
          {blog2 && (
            <div className="w-[85vw] max-w-[340px] sm:w-[360px] sm:max-w-[360px] md:w-[400px] md:max-w-[400px] lg:w-auto lg:max-w-none shrink-0 lg:shrink lg:col-span-5 snap-start">
              <Link
                href={`/blog#${blog2.id}`}
                className="bg-white rounded-2xl md:rounded-[24px] border border-gray-200/80 overflow-hidden shadow-sm flex flex-col h-full min-h-[380px] md:min-h-[420px] group cursor-pointer hover:shadow-md transition-all duration-300 block"
              >
                <div className="h-48 md:h-56 overflow-hidden relative shrink-0">
                  <img
                    src={blog2.image}
                    alt={blog2.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {blog2.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog2.excerpt}
                    </p>
                  </div>
                  <div>
                    <span className="inline-block text-primary text-xs md:text-sm font-semibold underline underline-offset-4 decoration-primary">
                      Read More
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* CARD 3: Bottom Left - Horizontal Split Card */}
          {blog3 && (
            <div className="w-[85vw] max-w-[340px] sm:w-[360px] sm:max-w-[360px] md:w-[400px] md:max-w-[400px] lg:w-auto lg:max-w-none shrink-0 lg:shrink lg:col-span-7 snap-start">
              <Link
                href={`/blog#${blog3.id}`}
                className="bg-white rounded-2xl md:rounded-[24px] border border-gray-200/80 overflow-hidden shadow-sm flex flex-col lg:grid lg:grid-cols-12 h-full min-h-[380px] md:min-h-[420px] group cursor-pointer hover:shadow-md transition-all duration-300 block"
              >
                <div className="h-48 md:h-56 lg:h-full lg:col-span-5 relative overflow-hidden shrink-0">
                  <img
                    src={blog3.image}
                    alt={blog3.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8 lg:col-span-7 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {blog3.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog3.excerpt}
                    </p>
                  </div>
                  <div>
                    <span className="inline-block text-primary text-xs md:text-sm font-semibold underline underline-offset-4 decoration-primary">
                      Read More
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* CARD 4: Bottom Right - Vertical Card */}
          {blog4 && (
            <div className="w-[85vw] max-w-[340px] sm:w-[360px] sm:max-w-[360px] md:w-[400px] md:max-w-[400px] lg:w-auto lg:max-w-none shrink-0 lg:shrink lg:col-span-5 snap-start">
              <Link
                href={`/blog#${blog4.id}`}
                className="bg-white rounded-2xl md:rounded-[24px] border border-gray-200/80 overflow-hidden shadow-sm flex flex-col h-full min-h-[380px] md:min-h-[420px] group cursor-pointer hover:shadow-md transition-all duration-300 block"
              >
                <div className="h-48 md:h-56 overflow-hidden relative shrink-0">
                  <img
                    src={blog4.image}
                    alt={blog4.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {blog4.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog4.excerpt}
                    </p>
                  </div>
                  <div>
                    <span className="inline-block text-primary text-xs md:text-sm font-semibold underline underline-offset-4 decoration-primary">
                      Read More
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Animated View All Button */}
        <div className="mt-10 md:mt-14 flex items-center">
          <button
            type="button"
            onClick={handleClick}
            className="group relative z-10 h-14 md:h-16 inline-flex items-center gap-6 pl-4 pr-8 cursor-pointer overflow-hidden rounded-full transition-all duration-300 active:scale-95 select-none focus:outline-none"
          >
            {/* Red Round Circle background that animates on hover and click */}
            <span
              className={`absolute left-0 top-0 rounded-full bg-primary transition-all duration-500 ease-in-out group-hover:w-full group-hover:h-full group-active:w-full group-active:h-full z-0 shadow-sm ${
                isClicked ? "w-full h-full" : "w-14 h-14 md:w-16 md:h-16"
              }`}
            />

            {/* Button Text */}
            <span
              className={`relative z-10 text-base md:text-lg tracking-widest font-normal text-gray-800 group-hover:text-white group-active:text-white transition-colors duration-300 uppercase pl-3 ${
                isClicked ? "text-white!" : ""
              }`}
            >
              VIEW ALL
            </span>

            {/* Red Right Arrow */}
            <FiArrowRight
              className={`relative z-10 w-7 h-7 text-primary group-hover:text-white group-active:text-white group-hover:translate-x-2 group-active:translate-x-2 transition-all duration-300 ease-in-out ${
                isClicked ? "text-white! translate-x-2" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
