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

type BaseHTMLProps<T extends HTMLElement> = DetailedHTMLProps<
  HTMLAttributes<T>,
  T
>;

export type DivProps = BaseHTMLProps<HTMLDivElement>;
export type LiProps = BaseHTMLProps<HTMLLIElement>;
export type UlProps = BaseHTMLProps<HTMLUListElement>;
