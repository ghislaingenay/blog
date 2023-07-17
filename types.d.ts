type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

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

interface PostMeta {
  id: string;
  title: string;
  topic: PostTopic[];
  subTopic: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  readTime: string;
  keywords: string[]; // seo purpose
  language: "en" | "fr" | string;
  tags: string[]; //inside the app
}

interface Post {
  meta: PostMeta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
}

interface TreeData {
  path: string;
  mode?: string;
  type?: string;
  sha?: string;
  size?: number;
  url?: string;
}

type Filetree = {
  tree: TreeData[];
};
