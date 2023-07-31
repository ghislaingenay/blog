import { Language } from "@interfaces/global.interface";
import "server-only";

const dictionaries: Partial<Record<Language, any>> = {
  [Language.ENGLISH]: () =>
    import("@public/locales/en/common.json").then((module) => module.default),
};

export const getDictionary = async (locale: Language) => dictionaries[locale]();
