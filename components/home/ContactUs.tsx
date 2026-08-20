"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ContactForm from "@/components/common/ContactForm";

export default function ContactUs() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8F6FB] to-white overflow-hidden">
            <div className="site-container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    {/* Left Column - Image (Hidden on Small Screens) */}
                    <div className="hidden lg:block lg:col-span-5 relative min-h-[600px] rounded-3xl overflow-hidden shadow-lg">
                        <Image
                            src="/images/contact-person.jpg"
                            alt="Contact Us - Business Consultation"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Right Column - Contact Info & Form */}
                    <div className="lg:col-span-7 flex flex-col justify-between py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                            {/* Left Part: Title & Details */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h2 className="text-5xl text-center md:text-start lg:text-start font-normal text-primary leading-tight mb-8">
                                        Contact Us <br />
                                        today
                                    </h2>

                                    <div className="space-y-6 text-sm text-gray-600">
                                        {/* Call Landline */}
                                        <div>
                                            <p className="font-normal text-gray-500">
                                                Call Landline: <span className="text-gray-900 font-medium">+971 000 000</span>
                                            </p>
                                            <p className="font-normal text-gray-500 mt-1">
                                                Local Toll Free: <span className="text-gray-900 font-medium">800-4392</span>
                                            </p>
                                        </div>

                                        {/* Reception Hours */}
                                        <div>
                                            <h4 className="font-medium text-gray-900 text-base mb-1">Reception Hours</h4>
                                            <p className="text-gray-500">Monday - Friday: 8:30AM to 8:00PM</p>
                                            <p className="text-gray-500">Sunday: 10:00AM to 4:00PM</p>
                                        </div>

                                        {/* Call Centre Hours */}
                                        <div>
                                            <h4 className="font-medium text-gray-900 text-base mb-1">Call Centre Hours</h4>
                                            <p className="text-gray-500">Monday - Friday: 8:30AM to 9:00PM</p>
                                            <p className="text-gray-500">Sunday: 10:00AM to 4:00PM</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media Icons */}
                                <div className="flex items-center gap-4 pt-8">
                                    <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
                                        <FaFacebookF className="w-4 h-4 text-blue-600" />
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
                                        <FaInstagram className="w-4 h-4 text-pink-600" />
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
                                        <FaLinkedinIn className="w-4 h-4 text-blue-700" />
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
                                        <FaXTwitter className="w-4 h-4 text-gray-900" />
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
                                        <FaYoutube className="w-4 h-4 text-red-600" />
                                    </a>
                                </div>
                            </div>

                            {/* Right Part: Reusable Contact Form Component */}
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

