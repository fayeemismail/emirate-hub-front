"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import rawContactFormData from "@/data/common/contactForm.json";
import { ContactFormData, SelectOption } from "@/types/common/contactForm";
import { ALL_COUNTRIES, CountryOption } from "@/lib/countries";
import { submitContactLead } from "@/lib/api/leads";
import { ServiceSelectOption } from "@/lib/sanity/api";

interface ContactFormProps {
  subtitle?: string;
  className?: string;
  serviceOptions?: ServiceSelectOption[];
}

const contactFormData: ContactFormData = rawContactFormData as ContactFormData;
const DEFAULT_OPTIONS: SelectOption[] = contactFormData.options || [];
const COUNTRY_OPTIONS: CountryOption[] = ALL_COUNTRIES;

const normalizeKey = (str?: string | null): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const normalizeLabel = (str?: string | null): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
};

function ServiceParamListener({
  onSelectService,
}: {
  onSelectService: (service: string | { slug?: string; title?: string }) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const slugParam = searchParams.get("slug");
    const serviceParam = searchParams.get("service");
    if (slugParam || serviceParam) {
      onSelectService({
        slug: slugParam || undefined,
        title: serviceParam || undefined,
      });
      setTimeout(() => {
        const contactSection = document.getElementById("contact-us");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [searchParams, onSelectService]);

  return null;
}

export default function ContactForm({
  subtitle = "Let us know how we can help! Fill out our contact form and we will get back to you as soon as possible.",
  className = "",
  serviceOptions,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    businessActivity: "",
    name: "",
    email: "",
    phone: "",
    request: "",
    consentData: false,
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(
    COUNTRY_OPTIONS[0]
  );
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const [customOptions, setCustomOptions] = useState<SelectOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = COUNTRY_OPTIONS.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const baseOptions = useMemo<SelectOption[]>(() => {
    let list: SelectOption[] = [];
    if (serviceOptions && serviceOptions.length > 0) {
      list = serviceOptions.map((s) => ({
        label: s.label || s.title,
        value: s.slug || s.value,
        slug: s.slug || s.value,
        title: s.title || s.label,
      }));
    } else {
      list = DEFAULT_OPTIONS.map((opt) => ({
        label: opt.label,
        value: opt.value,
        slug: opt.value,
        title: opt.label,
      }));
    }

    const seenSlugs = new Set<string>();
    const seenLabels = new Set<string>();
    const dedupedList: SelectOption[] = [];

    for (const opt of list) {
      const slugKey = normalizeKey(opt.slug || opt.value);
      const labelKey = normalizeLabel(opt.label || opt.title);
      if (!slugKey && !labelKey) continue;
      if (!seenSlugs.has(slugKey) && !seenLabels.has(labelKey)) {
        seenSlugs.add(slugKey);
        seenLabels.add(labelKey);
        dedupedList.push(opt);
      }
    }

    const hasOther = dedupedList.some(
      (opt) =>
        normalizeKey(opt.slug || opt.value) === "other-business" ||
        normalizeLabel(opt.label || opt.title) === "other business"
    );

    if (!hasOther) {
      dedupedList.push({
        label: "Other Business",
        value: "other-business",
        slug: "other-business",
        title: "Other Business",
      });
    }

    return dedupedList;
  }, [serviceOptions]);

  const applyServiceSelection = useCallback(
    (detail: string | { slug?: string; title?: string }) => {
      let rawSlug = "";
      let rawTitle = "";

      if (typeof detail === "string") {
        const trimmed = detail.trim();
        if (/\s|[A-Z]/.test(trimmed)) {
          rawTitle = trimmed;
          rawSlug = normalizeKey(trimmed);
        } else {
          rawSlug = normalizeKey(trimmed);
          rawTitle = trimmed.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        }
      } else if (detail && typeof detail === "object") {
        rawSlug = (detail.slug || "").trim();
        rawTitle = (detail.title || "").trim();
        if (!rawSlug && rawTitle) {
          rawSlug = normalizeKey(rawTitle);
        }
        if (!rawTitle && rawSlug) {
          rawTitle = rawSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        }
      }

      if (!rawSlug && !rawTitle) return;

      const normSlug = normalizeKey(rawSlug);
      const normTitle = normalizeLabel(rawTitle);

      // 1. Try to find an existing match in baseOptions
      const matched = baseOptions.find((opt: SelectOption) => {
        const oSlug = normalizeKey(opt.slug || opt.value);
        const oLabel = normalizeLabel(opt.label || opt.title);

        return (
          (normSlug && oSlug === normSlug) ||
          (normTitle && oLabel === normTitle) ||
          (normSlug && oLabel === normalizeLabel(rawSlug)) ||
          (normTitle && oSlug === normalizeKey(rawTitle))
        );
      });

      if (matched) {
        // If matched in base options, select it and ensure no duplicate custom option exists
        setCustomOptions((prev) =>
          prev.filter((o) => {
            const sKey = normalizeKey(o.slug || o.value);
            const lKey = normalizeLabel(o.label || o.title);
            return sKey !== normSlug && lKey !== normTitle;
          })
        );
        setFormData((prev) => ({
          ...prev,
          businessActivity: matched.slug || matched.value,
        }));
      } else {
        // 2. Service does not exist in base options; add it uniquely to custom options
        const finalSlug = normSlug;
        const finalLabel =
          rawTitle ||
          rawSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        setCustomOptions((prev) => {
          const filtered = prev.filter((o) => {
            const sKey = normalizeKey(o.slug || o.value);
            const lKey = normalizeLabel(o.label || o.title);
            return sKey !== finalSlug && lKey !== normalizeLabel(finalLabel);
          });
          return [
            { label: finalLabel, value: finalSlug, slug: finalSlug, title: finalLabel },
            ...filtered,
          ];
        });

        setFormData((prev) => ({
          ...prev,
          businessActivity: finalSlug,
        }));
      }
    },
    [baseOptions]
  );

  useEffect(() => {
    const handleCustomSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string | { slug?: string; title?: string }>;
      if (customEvent.detail) {
        applyServiceSelection(customEvent.detail);
      }
    };

    window.addEventListener("select-contact-service", handleCustomSelect);
    return () => {
      window.removeEventListener("select-contact-service", handleCustomSelect);
    };
  }, [applyServiceSelection]);

  // Combined options guaranteed to have NO duplicate slugs and NO duplicate labels
  const allOptions = useMemo<SelectOption[]>(() => {
    const combined = [...customOptions, ...baseOptions];
    const seenSlugs = new Set<string>();
    const seenLabels = new Set<string>();
    const result: SelectOption[] = [];

    for (const opt of combined) {
      const slugKey = normalizeKey(opt.slug || opt.value);
      const labelKey = normalizeLabel(opt.label || opt.title);

      if (!slugKey && !labelKey) continue;

      if (!seenSlugs.has(slugKey) && !seenLabels.has(labelKey)) {
        seenSlugs.add(slugKey);
        seenLabels.add(labelKey);
        result.push(opt);
      }
    }

    return result;
  }, [customOptions, baseOptions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmitting(true);

    try {
      const selectedOption = allOptions.find(
        (opt: SelectOption) => (opt.slug || opt.value) === formData.businessActivity
      );
      const resolvedService =
        selectedOption?.label ||
        selectedOption?.title ||
        formData.businessActivity.trim() ||
        "General Inquiry";
      const resolvedSlug =
        selectedOption?.slug ||
        selectedOption?.value ||
        formData.businessActivity.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

      const rawPhone = formData.phone.trim();
      const formattedPhone = rawPhone
        ? rawPhone.startsWith("+")
          ? rawPhone
          : `${selectedCountry.dialCode} ${rawPhone}`
        : undefined;

      await submitContactLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        ...(formattedPhone && { phone: formattedPhone }),
        service: resolvedService,
        serviceSlug: resolvedSlug,
        slug: resolvedSlug,
        ...(formData.request.trim() && { message: formData.request.trim() }),
      });

      setSubmitSuccess(
        "Thank you! Your inquiry has been received. Our team will get back to you shortly."
      );
      setFormData({
        businessActivity: "",
        name: "",
        email: "",
        phone: "",
        request: "",
        consentData: false,
      });
    } catch (err) {
      const raw =
        err instanceof Error && err.message.trim() ? err.message.trim() : "";
      // Last line of defense — never show technical leftovers in the UI.
      const looksTechnical =
        !raw ||
        /sanity|slug|mongodb|e11000|stack|cms|internal server/i.test(raw) ||
        raw.length > 180;
      setSubmitError(
        looksTechnical
          ? "Something went wrong. Please check your details and try again."
          : raw
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`flex flex-col justify-between ${className}`}>
      <Suspense fallback={null}>
        <ServiceParamListener onSelectService={applyServiceSelection} />
      </Suspense>
      <div>
        {subtitle && (
          <p className="text-xs md:text-sm text-gray-500 mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Business Activity / Service Dropdown */}
          <div>
            <select
              value={formData.businessActivity}
              onChange={(e) => setFormData({ ...formData, businessActivity: e.target.value })}
              className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-700 bg-transparent outline-none focus:border-primary cursor-pointer whitespace-nowrap truncate block"
              required
            >
              <option value="" className="whitespace-nowrap">
                {contactFormData.selectPlaceholder || "Select"}
              </option>
              {allOptions.map((option: SelectOption) => {
                const optKey = option.slug || option.value;
                return (
                  <option
                    key={optKey}
                    value={optKey}
                    className="whitespace-nowrap"
                  >
                    {option.label}
                  </option>
                );
              })}
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

          {/* Phone Number with Interactive Country Selector */}
          <div
            ref={countryDropdownRef}
            className="relative flex items-center border-b border-gray-300 py-2.5 gap-2.5 focus-within:border-primary transition-colors"
          >
            <button
              type="button"
              onClick={() => {
                setIsCountryOpen((prev) => !prev);
                setCountrySearch("");
              }}
              aria-label="Select country code"
              className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 shrink-0 cursor-pointer select-none focus:outline-none pr-1.5 border-r border-gray-200"
            >
              <img
                src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                alt={selectedCountry.name}
                className="w-5 h-3.5 object-cover rounded-[2px] shadow-2xs shrink-0"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {selectedCountry.dialCode}
              </span>
              <FiChevronDown
                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                  isCountryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCountryOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-68 sm:w-72 bg-white rounded-2xl shadow-xl border border-gray-200/90 z-50 overflow-hidden">
                {/* Search input */}
                <div className="p-2.5 border-b border-gray-100 flex items-center gap-2 bg-gray-50/60">
                  <FiSearch className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search country or code..."
                    className="w-full text-xs text-gray-700 bg-transparent outline-none placeholder-gray-400"
                    autoFocus
                  />
                </div>

                {/* Country list */}
                <div className="max-h-52 overflow-y-auto divide-y divide-gray-50">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => {
                      const isSelected = country.code === selectedCountry.code;
                      return (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsCountryOpen(false);
                            setCountrySearch("");
                          }}
                          className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-2 text-xs sm:text-sm transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-primary/8 text-primary font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                              alt={country.name}
                              className="w-5 h-3.5 object-cover rounded-[2px] shadow-2xs shrink-0"
                            />
                            <span className="truncate">{country.name}</span>
                          </div>
                          <span className="text-xs text-gray-400 font-medium shrink-0">
                            {country.dialCode}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-4 py-3 text-xs text-gray-400 text-center">
                      No matching country found
                    </div>
                  )}
                </div>
              </div>
            )}

            <input
              type="tel"
              placeholder={`${selectedCountry.dialCode} 00 000 0000`}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full text-sm text-gray-700 outline-none placeholder-gray-400"
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
                I'm not a robot{""}
                {/* <a href="#" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a> */}
                .
              </span>
            </label>
          </div>

          {/* Status Messages */}
          {submitSuccess && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm">
              <FiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{submitSuccess}</span>
            </div>
          )}

          {submitError && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">
              <FiAlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-primary hover:bg-[#c8191e] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
            >
              <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

