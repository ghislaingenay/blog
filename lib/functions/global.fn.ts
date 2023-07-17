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

export const parseTag = (tag: string): string => {
  const words = tag.split("-");
  return words.map((word) => parseJS(word).toUpperCase()).join(" ");
};