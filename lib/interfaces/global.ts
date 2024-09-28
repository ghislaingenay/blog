import { DetailedHTMLProps, HTMLAttributes } from "react";

export enum Language {
  ENGLISH = "en",
  FRENCH = "fr",
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

type WebDevelopmentType =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "other";

type AutoComplete<T extends number | string> = T | (T & {});
type Color = AutoComplete<
  | `#${string}`
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgb(${number}, ${number}, ${number})`
>;

type FunctionResponse<T = any> = {
  result: boolean;
  message: string;
  data: T | null;
};

type BaseDate = `${string}-${string}-${string}`;

type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Percent = `${number}%`;

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
export type {
  AutoComplete,
  BaseDate,
  Color,
  Filetree,
  FunctionResponse,
  Heading,
  Percent,
  WebDevelopmentType,
};
