import type { BaseDate } from ".";

// key should be the same as the value
enum PostTopic {
  DATA_SCIENCE = "DATA_SCIENCE",
  WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
  MISCELLANEOUS = "MISCELLANEOUS",
  PERSONAL = "PERSONAL",
  DESIGN = "DESIGN",
}

type PostLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "NONE"; // NONE is PostTopic === 'NONE' only

type PostTopicKeys = keyof typeof PostTopic;

interface PostMeta {
  name: string;
  title: string;
  description: string;
  createdAt: BaseDate;
  updatedAt: BaseDate;
  author: string;
  topic: PostTopic;
  subTopic: string[];
  keywords: string[];
  readTime: `${number} min read`;
  tags: string[];
  language: "en";
  level: PostLevel;
  series: "";
}

type BasePostMeta = Pick<PostMeta, "name" | "title" | "description" | "topic">;

type PostsParams = {
  query?: string;
  level?: PostLevel;
  tags: string[];
};
export { PostTopic };
export type { BasePostMeta, PostMeta, PostsParams, PostTopicKeys };
