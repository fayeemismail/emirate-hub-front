export interface AdditionalServiceItem {
  id: string;
  number: string;
  badge: string;
  title: string;
  description: string;
  featuresHeading: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
}

export interface AdditionalServicesSectionHeader {
  badge: string;
  titlePrefix: string;
  highlightedTitle: string;
  description: string;
}

export interface AdditionalServicesData {
  active: boolean;
  sectionHeader: AdditionalServicesSectionHeader;
  services: AdditionalServiceItem[];
}
