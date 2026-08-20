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
    enquiry: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    request: "",
    consentData: false,
    consentMarketing: false,
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
          {/* Enquiry Dropdown */}
          <div>
            <select
              value={formData.enquiry}
              onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
              className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-700 bg-transparent outline-none focus:border-primary cursor-pointer"
            >
              <option value="">Select your enquiry</option>
              <option value="business-setup">Business Setup</option>
              <option value="licensing">Licensing & Visas</option>
              <option value="banking">Banking Assistance</option>
              <option value="general">General Enquiry</option>
            </select>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-700 outline-none focus:border-primary placeholder-gray-400"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-700 outline-none focus:border-primary placeholder-gray-400"
                required
              />
            </div>
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
            <span className="text-sm">🇺🇸 ▾</span>
            <input
              type="tel"
              placeholder="(201) 555-0123"
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

          {/* Consent Checkboxes */}
          <div className="space-y-3 pt-2">
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

            <label className="flex items-start gap-2.5 text-xs text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consentMarketing}
                onChange={(e) => setFormData({ ...formData, consentMarketing: e.target.checked })}
                className="mt-0.5 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
              />
              <span>
                I consent to receiving marketing communications as outlined in the{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>{" "}
                [Optional].
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-primary hover:bg-[#c8191e] text-white font-bold text-sm tracking-wide rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              Submit <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
