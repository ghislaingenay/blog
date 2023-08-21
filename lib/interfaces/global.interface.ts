import { DetailedHTMLProps, HTMLAttributes } from "react";

export enum Language {
  ENGLISH = "en",
  FRENCH = "fr",
}

export enum PostTopic {
  DATA_SCIENCE = "DATA_SCIENCE",
  WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
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
export type SelectProps = BaseHTMLProps<HTMLSelectElement>;
export type ButtonProps = BaseHTMLProps<HTMLButtonElement>;

export type PostTopicKeys = keyof typeof PostTopic;

export type LangProps = {
  params: {
    lang: Language;
  };
};

export interface LayoutProps extends LangProps {
  children: React.ReactNode;
}

export type Dictionary = typeof import("@public/locales/en/common.json");

export type AnimationState = true | false | "idle";

export type TokenResponse = { accessToken: string };
export type AuthToken = string | null;

export type APIResponse<T = any> = {
  data: T;
  message?: string;
  isSuccess: boolean;
  meta?: MetaPage;
};

export interface MetaPage {
  pages: number;
  page: number;
  results: number;
  total: number;
}

export type AuthPermission = "granted" | "unauthorized" | "forbidden";
