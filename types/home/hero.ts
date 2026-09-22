export interface HeroHeading {
  prefix: string;
  highlightedText: string;
  suffix: string;
}

export interface HeroData {
  active: boolean;
  backgroundImage: string;
  heading: HeroHeading;
  subheading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}
