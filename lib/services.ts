import rawServicesList from "@/data/service/servicesList.json";
import rawAdditionalServices from "@/data/service/additionalServices.json";
import { ServiceItem } from "@/types/service/servicesList";

export interface ServiceDetailData extends ServiceItem {
  timeline: string;
  jurisdiction: string;
  steps: {
    step: string;
    title: string;
    description: string;
  }[];
}

// Tailored metadata and streamlined 3-step processes for modern corporate services
const SERVICE_METADATA: Record<
  string,
  {
    timeline: string;
    jurisdiction: string;
    steps: { step: string; title: string; description: string }[];
  }
> = {
  "business-incorporation": {
    timeline: "3 - 5 Business Days",
    jurisdiction: "Mainland, Free Zone & Offshore",
    steps: [
      {
        step: "01",
        title: "Jurisdiction & Structure Advisory",
        description:
          "Determining the most cost-effective legal form, license activity codes, and optimal freezone or mainland setup.",
      },
      {
        step: "02",
        title: "Initial Approval & Name Reservation",
        description:
          "Securing initial government approvals and reserving your trade name with the relevant regulatory authorities.",
      },
      {
        step: "03",
        title: "License Issuance & Handover",
        description:
          "Drafting legal MOA/AOA, completing fee settlements, and receiving your official UAE Commercial License.",
      },
    ],
  },
  "visa-services": {
    timeline: "2 - 4 Business Days",
    jurisdiction: "GDRFA & ICP UAE Immigration",
    steps: [
      {
        step: "01",
        title: "Entry Permit Application",
        description:
          "Preparing applicant documents and obtaining electronic entry permits from immigration authorities.",
      },
      {
        step: "02",
        title: "VIP Medical & Biometrics",
        description:
          "Express medical fitness screening coordination and Emirates ID biometric capture.",
      },
      {
        step: "03",
        title: "Residency Stamping & ID Delivery",
        description:
          "Final visa status change, residence permit issuance, and direct Emirates ID card delivery.",
      },
    ],
  },
  "tax-readiness": {
    timeline: "3 - 7 Business Days",
    jurisdiction: "Federal Tax Authority (FTA)",
    steps: [
      {
        step: "01",
        title: "Tax Exposure & Review",
        description:
          "Assessing qualifying activities, revenue thresholds, and corporate tax/VAT registration requirements.",
      },
      {
        step: "02",
        title: "FTA TRN Registration",
        description:
          "Submitting verified corporate dossiers to the FTA portal for prompt Tax Registration Number issuance.",
      },
      {
        step: "03",
        title: "Bookkeeping & Ongoing Compliance",
        description:
          "Setting up compliant chart of accounts, periodic returns filing schedules, and audit-ready records.",
      },
    ],
  },
  "office-rentals": {
    timeline: "24 - 48 Hours",
    jurisdiction: "Dubai Land Dept / Ejari System",
    steps: [
      {
        step: "01",
        title: "Space & Location Matching",
        description:
          "Selecting flexi-desks, executive suites, or shared spaces across prime business locations in Dubai.",
      },
      {
        step: "02",
        title: "Tenancy Contract Drafting",
        description:
          "Drafting approved unified commercial leases compliant with municipality and free zone regulations.",
      },
      {
        step: "03",
        title: "Ejari Registration & Access",
        description:
          "Issuing the official Ejari certificate required for bank accounts, licensing, and immediate move-in.",
      },
    ],
  },
  "banking": {
    timeline: "5 - 10 Business Days",
    jurisdiction: "Top UAE Tier-1 Banking Institutions",
    steps: [
      {
        step: "01",
        title: "Compliance Profile Preparation",
        description:
          "Structuring the business plan, anticipated turnover, source of wealth, and supplier/customer profiles.",
      },
      {
        step: "02",
        title: "Direct Banker Submission",
        description:
          "Liaison with dedicated corporate banking relationship managers and KYC clearance officers.",
      },
      {
        step: "03",
        title: "Account Activation & IBAN Handover",
        description:
          "Final compliance approval, multi-currency IBAN release, and full online corporate banking onboarding.",
      },
    ],
  },
  "digital-marketing": {
    timeline: "7 - 14 Days",
    jurisdiction: "UAE & Global Market Reach",
    steps: [
      {
        step: "01",
        title: "Market Strategy & Branding",
        description:
          "Analyzing competitors in Dubai, identifying target customer segments, and creating brand positioning.",
      },
      {
        step: "02",
        title: "High-Converting Asset Creation",
        description:
          "Developing modern websites, multilingual landing pages, and search/social advertising assets.",
      },
      {
        step: "03",
        title: "Campaign Launch & Growth",
        description:
          "Launching targeted Google/Meta ad funnels with weekly performance reporting and conversion optimization.",
      },
    ],
  },
};

// Default steps for additional services
const DEFAULT_STEPS = [
  {
    step: "01",
    title: "Initial Advisory & Scoping",
    description:
      "Clarifying your corporate objectives, compliance prerequisites, and documentation requirements.",
  },
  {
    step: "02",
    title: "Government Liaison & Submission",
    description:
      "Preparing attested legal files and coordinating directly with relevant UAE ministerial bodies.",
  },
  {
    step: "03",
    title: "Delivery & Dedicated Support",
    description:
      "Final certificate/service handover with full documentation and ongoing advisory assistance.",
  },
];

export function getAllServices(): ServiceDetailData[] {
  const mainServices: ServiceDetailData[] = rawServicesList.services
    .filter((s) => s.active)
    .map((s) => {
      const meta = SERVICE_METADATA[s.id] || {
        timeline: "2 - 5 Business Days",
        jurisdiction: "Dubai Mainland & Free Zones",
        steps: DEFAULT_STEPS,
      };

      return {
        ...s,
        serviceType: s.serviceType as "main service" | "normal service",
        timeline: meta.timeline,
        jurisdiction: meta.jurisdiction,
        steps: meta.steps,
      };
    });

  const additionalServices: ServiceDetailData[] = (
    rawAdditionalServices.services || []
  ).map((s: any) => {
    const meta = SERVICE_METADATA[s.id] || {
      timeline: "3 - 5 Business Days",
      jurisdiction: "Dubai & Federal UAE Authorities",
      steps: DEFAULT_STEPS,
    };

    return {
      id: s.id,
      number: s.number || "00",
      tag: s.badge || "ADDITIONAL SERVICE",
      title: s.title,
      serviceType: "normal service",
      active: true,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      description: s.description,
      featuresHeading: s.featuresHeading || "Key Highlights:",
      keyFeatures: s.features || [],
      buttonText: s.buttonText || "ENQUIRE SERVICE",
      buttonHref: s.buttonHref || "/#contact-us",
      timeline: meta.timeline,
      jurisdiction: meta.jurisdiction,
      steps: meta.steps,
    };
  });

  return [...mainServices, ...additionalServices];
}

export function getServiceById(id: string): ServiceDetailData | null {
  const all = getAllServices();
  return all.find((s) => s.id === id) || null;
}

export function getRelatedServices(
  currentId: string,
  limit = 3
): ServiceDetailData[] {
  const all = getAllServices();
  return all.filter((s) => s.id !== currentId).slice(0, limit);
}
