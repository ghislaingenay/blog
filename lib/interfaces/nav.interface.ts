import { PostTopic } from "./global.interface";

export interface NavField {
  id: string;
  type: "page" | "social" | "main"; // main is the elemment always displayed
  children: JSX.Element;
  link: string;
  label: string;
}

export interface NavDisplay {
  navField: NavField;
  currentPath: string;
}

export default interface SearchBarParams {
  query?: string;
  topic?: PostTopic;
}
