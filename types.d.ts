type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

interface PostMeta {
  id: string;
  title: string;
  topic: PostTopic;
  subTopic: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  readTime: string;
  keywords: string[]; // seo purpose
  language: "en" | "fr" | string;
  tags: string[]; //inside the app
  image: string;
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

type PostTopicSearch = {
  name: PostTopic;
  count: number;
};
