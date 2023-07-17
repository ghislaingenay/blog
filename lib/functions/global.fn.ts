import { Metadata } from "next";
import { INITIAL_METADATA, MissingMetadata } from "../constants/metadata.const";

export const createMetaData = (meta: Prettify<MissingMetadata>): Metadata => {
  return { ...meta, ...INITIAL_METADATA };
};

export const capitalize = (str: string): string =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
