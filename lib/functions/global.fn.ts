import { Metadata } from "next";
import { INITIAL_METADATA, MissingMetadata } from "../constants/metadata.const";

export const createMetaData = (meta: Prettify<MissingMetadata>): Metadata => {
  return { ...meta, ...INITIAL_METADATA };
};

export const capitalize = (str: string): string =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export const parseJS = (str: string): string => {
  const containJS = /(.*)js/g.test(str);
  if (!containJS) return str;
  return `${str.replace(/js$/g, "")} js`;
};

export const parseTag = (tag: string | number): string => {
  if (typeof tag === "number") return String(tag); // could do parseTag(String(tag))
  const words = tag.split("-");
  return words.map((word) => parseJS(word).toUpperCase()).join(" ");
};
export function generateKey() {
  return Math.random().toString(36).substring(2, 9);
}

export const range = (start: number, end?: number): number[] => {
  if (end === undefined) return [...Array(start)].map((_, i) => i);
  return [...Array(end - start)].map((_, i) => i + start);
};
