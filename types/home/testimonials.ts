export interface TestimonialItem {
  id?: number | string;
  _key?: string;
  name: string;
  role?: string;
  company?: string;
  image?: string;
  quote: string;
  rating?: number;
  leftPercent?: number;
  topPercent?: number;
  sizeClass?: string;
  active?: boolean;
}

export interface TestimonialsData {
  _id?: string;
  _type?: string;
  active?: boolean;
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  testimonials?: TestimonialItem[];
}
