"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

interface ContactFormProps {
  subtitle?: string;
  className?: string;
}

export default function ContactForm({
  subtitle = "Let us know how we can help! Fill out our contact form and we will get back to you as soon as possible.",
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    businessActivity: "",
    name: "",
    email: "",
    phone: "",
    request: "",
    consentData: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={`flex flex-col justify-between ${className}`}>
      <div>
        {subtitle && (
          <p className="text-xs md:text-sm text-gray-500 mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Business Activity Dropdown */}
          <div>
            <select
              value={formData.businessActivity}
              onChange={(e) => setFormData({ ...formData, businessActivity: e.target.value })}
              className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-700 bg-transparent outline-none focus:border-primary cursor-pointer whitespace-nowrap truncate block"
            >
              <option value="" className="whitespace-nowrap">Select</option>
              <option value="e-commerce" className="whitespace-nowrap">E-Commerce & Digital Trade</option>
              <option value="it-software" className="whitespace-nowrap">IT, Tech & Software Services</option>
              <option value="consulting" className="whitespace-nowrap">Management & Business Consulting</option>
              <option value="trading" className="whitespace-nowrap">General Trading & Commercial</option>
              <option value="marketing" className="whitespace-nowrap">Advertising & Digital Media</option>
              <option value="real-estate" className="whitespace-nowrap">Real Estate & Property</option>
              <option value="other" className="whitespace-nowrap">Other Business Activity</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-700 outline-none focus:border-primary placeholder-gray-400"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-700 outline-none focus:border-primary placeholder-gray-400"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex items-center border-b border-gray-300 py-2.5 gap-2">
            <span className="text-sm">🇦🇪 ▾</span>
            <input
              type="tel"
              placeholder="+971 50 000 0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full text-sm text-gray-700 outline-none focus:border-primary placeholder-gray-400"
            />
          </div>

          {/* Your Request */}
          <div>
            <input
              type="text"
              placeholder="Your Request"
              value={formData.request}
              onChange={(e) => setFormData({ ...formData, request: e.target.value })}
              className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-700 outline-none focus:border-primary placeholder-gray-400"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 text-xs text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consentData}
                onChange={(e) => setFormData({ ...formData, consentData: e.target.checked })}
                className="mt-0.5 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                required
              />
              <span>
                I consent to the processing of my personal data as outlined in the{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-primary hover:bg-[#c8191e] text-white font-bold text-sm tracking-wide rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
            >
              Submit <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

