export interface HomeFaqItem {
  id?: string | number;
  _key?: string;
  question: string;
  answer: string;
}

export interface HomeFaqData {
  active?: boolean;
  backgroundColor?: string;
  title?: string;
  titleColor?: string;
  subtitle?: string;
  subtitleColor?: string;
  questionColor?: string;
  answerColor?: string;
  image?: string;
  faqs?: HomeFaqItem[];
}
