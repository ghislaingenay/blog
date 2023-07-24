import { DetailedHTMLProps, HTMLAttributes } from "react";

export enum Language {
  ENGLISH = "en",
  FRENCH = "fr",
}

export enum PostTopic {
  DATA_SCIENCE = "DATA SCIENCE",
  WEB_DEVELOPMENT = "WEB DEVELOPMENT",
  AI = "AI",
  DEVOPS = "DEVOPS",
  DATABASES = "DATABASES",
  OTHERS = "OTHERS",
  PERSONAL = "PERSONAL",
}

export type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
