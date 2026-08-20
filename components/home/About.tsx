"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

export default function About() {
    return (
        <section className="py-16 md:py-24 bg-[#FFFFF]">
            <div className="site-container flex flex-col items-center text-center">
                {/* Main Section Heading */}
                <div className="pb-10 w-full text-center md:text-start lg:text-start">
                    <h2 className="relative text-6xl md:text-6xl lg:text-6xl font-bold font-sans text-primary cursor-pointer inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">
                        About Us
                    </h2>
                </div>

                {/* About Hero Image Container */}
                <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl mb-12">
                    <Image
                        src="/images/about-bg.png"
                        alt="About Hero"
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover"
                        priority
                    />
                    {/* Watermark Staggered Overlay Text */}
                    <div className="absolute inset-0 flex flex-col justify-start pt-6 md:pt-12 px-6 md:px-16 pointer-events-none select-none text-4xl md:text-7xl lg:text-8xl font-black tracking-tight text-gray-400/40 uppercase leading-[0.9]">
                        {/* Line 1: LET'S */}
                        <span className="self-center translate-x-8 md:translate-x-1">
                            LET&apos;S
                        </span>
                        {/* Line 2: CREATE */}
                        <span className="self-end pr-8 md:pr-16 lg:pr-4">
                            CREATE
                        </span>
                        {/* Line 3: SUCCESS */}
                        <span className="self-start pl-10 md:pl-10 lg:pl-4">
                            SUCCESS
                        </span>
                    </div>
                </div>

                {/* 4 Line Description Centered */}
                <p className="max-w-4xl text-gray-600 text-lg md:text-xl leading-relaxed font-light mb-10 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>

                {/* Animated Discover Emirate Hub Button Centered */}
                <div className="flex justify-center items-center">
                    <button className="group relative h-14 md:h-16 inline-flex items-center gap-6 pl-4 pr-8 cursor-pointer overflow-hidden rounded-full transition-all duration-300">
                        {/* Red Round Circle background that animates on hover */}
                        <span className="absolute left-0 top-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary transition-all duration-500 ease-in-out group-hover:w-full group-hover:h-full -z-0 shadow-sm" />

                        {/* Button Text */}
                        <span className="relative z-10 text-base md:text-lg tracking-widest font-normal text-gray-800 group-hover:text-white transition-colors duration-300 uppercase pl-3">
                            DISCOVER EMIRATE HUB
                        </span>

                        {/* Red Right Arrow */}
                        <FiArrowRight className="relative z-10 w-7 h-7 text-primary group-hover:text-white group-hover:translate-x-2 transition-all duration-300 ease-in-out" />
                    </button>
                </div>
            </div>
        </section>
    );
}

