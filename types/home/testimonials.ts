export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  leftPercent: number;
  topPercent: number;
  sizeClass: string;
  active?: boolean;
}

export interface TestimonialsData {
  active: boolean;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  testimonials: TestimonialItem[];
}
