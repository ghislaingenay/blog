type PostTopic =
  | "DATA SCIENCE"
  | "WEB DEVELOPMENT"
  | "MACHINE LEARNING"
  | "DEEP LEARNING"
  | "DEVOPS"
  | "DATABASES"
  | "BIG DATA"
  | "OTHERS"
  | "PERSONAL";

enum Language {
  ENGLISH = "en",
  FRENCH = "fr",
}

interface Post {
  id: string;
  title: string;
  topic: PostTopic[];
  subTopic: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  readTime: string;
  keywords: string[];
  series: string;
  language: Language;
}
