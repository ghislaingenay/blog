import { Metadata } from "next";

type ConstantMetaData =
  | "applicationName"
  | "authors"
  | "generator"
  | "referrer";

export type MissingMetadata = Omit<Metadata, ConstantMetaData>;

export const INITIAL_METADATA: Pick<Metadata, ConstantMetaData> = {
  applicationName: "Ghislain's blog",
  authors: [
    { url: "https://www.github/ghislain-genay", name: "Ghislain Genay" },
  ],
  generator: "ghislain.genay",
  referrer: "origin",
};
