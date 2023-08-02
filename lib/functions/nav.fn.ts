import { Language } from "@interfaces/global.interface";
import { NavField } from "@interfaces/nav.interface";

export const matchPath = (link: string, currentPath: string) => {
  const languages = Object.values(Language);
  const initialPath = languages.map((lang) => `/${lang}`);
  console.log(link, currentPath);
  if (link === currentPath && initialPath.includes(link)) return true;
  if (!initialPath.includes(link) && new RegExp(link, "gi").test(currentPath))
    return true;
  return false;
};

export const checkSocialType = (navField: NavField) =>
  navField.type === "social";
