import { Language, NavField } from "@interfaces";

export const matchPath = (link: string, currentPath: string) => {
  const languages = Object.values(Language).map((lang) => `/${lang}`);
  if (link === "") return false;
  if (link === currentPath && languages.includes(link)) return true;
  if (!languages.includes(link) && new RegExp(link, "gi").test(currentPath))
    return true;
  return false;
};

export const checkSocialType = (navField: NavField) =>
  navField.type === "social";
