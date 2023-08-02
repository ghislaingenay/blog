import { Dictionary, Language } from "@interfaces/global.interface";
import "server-only";

const dictionaries = {
  [Language.ENGLISH]: () =>
    import("@public/locales/en/common.json").then((module) => module.default),
  [Language.FRENCH]: () =>
    import("@public/locales/en/common.json").then((module) => module.default),
};

export const getDictionary = async (locale: Language): Promise<Dictionary> =>
  dictionaries[locale]();
