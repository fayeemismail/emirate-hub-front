export type ServiceType = "main service" | "normal service";

export interface ServiceItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  serviceType: ServiceType;
  active: boolean;
  image: string;
  description: string;
  featuresHeading: string;
  keyFeatures: string[];
  buttonText: string;
  buttonHref: string;
}

export interface ServicesListData {
  active: boolean;
  services: ServiceItem[];
}
