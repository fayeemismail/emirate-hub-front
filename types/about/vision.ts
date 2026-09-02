export interface VisionHeader {
  title: string;
  subtitle: string;
}

export interface VisionBlock {
  title: string;
  description: string;
}

export interface VisionImage {
  src: string;
  alt: string;
}

export interface VisionImages {
  column1: VisionImage;
  column2: VisionImage;
  column3: VisionImage;
  column4: VisionImage;
}

export interface VisionData {
  active: boolean;
  header: VisionHeader;
  vision: VisionBlock;
  mission: VisionBlock;
  images: VisionImages;
}
