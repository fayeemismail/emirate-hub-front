export interface LocationScheduleItem {
  days: string;
  hours: string;
  isClosed?: boolean;
}

export interface HeadOfficeCard {
  badge: string;
  unit: string;
  building: string;
  location: string;
}

export interface AccessibilityCard {
  badge: string;
  title: string;
  description: string;
}

export interface WorkingHoursCard {
  badge: string;
  schedule: LocationScheduleItem[];
}

export interface LocationCards {
  headOffice: HeadOfficeCard;
  accessibility: AccessibilityCard;
  workingHours: WorkingHoursCard;
}

export interface LocationData {
  active: boolean;
  badge: string;
  header: {
    titlePrefix: string;
    highlight: string;
    description: string;
  };
  googleMapsUrl: string;
  mapEmbedUrl: string;
  defaultZoom: number;
  minZoom: number;
  maxZoom: number;
  buttonText: string;
  cards: LocationCards;
}
