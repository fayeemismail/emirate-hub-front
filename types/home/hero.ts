export interface HeroHeading {
  prefix: string;
  boldKeyword?: string;
  middle?: string;
  highlightedText: string;
  suffix: string;
}

export interface HeroData {
  active: boolean;
  backgroundColor?: string;
  headingColor?: string;
  highlightColor?: string;
  subheadingColor?: string;
  descriptionColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  backgroundImage: string;
  backgroundImages?: string[];
  heading: HeroHeading;
  subheading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}
