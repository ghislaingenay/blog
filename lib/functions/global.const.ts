import { Metadata } from "next";
import { INITIAL_METADATA, MissingMetadata } from "../constants/metadata.const";

export const createMetaData = (meta: Prettify<MissingMetadata>): Metadata => {
  return { ...meta, ...INITIAL_METADATA };
};
