export interface HeroHeading {
  prefix: string;
  words?: string[];
  animatedWords?: string[];
  middle?: string;
  highlightedText: string;
  suffix: string;
  animationInterval?: number;
}

export interface HeroData {
  active: boolean;
  backgroundImage: string;
  heading: HeroHeading;
  subheading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  animationInterval?: number;
}
