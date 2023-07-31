import { NavField } from "@interfaces/nav.interface";

export const matchPath = (link: string, currentPath: string) => {
  if (link === currentPath && link === "/en") return true;
  if (link !== "/en" && new RegExp(link, "gi").test(currentPath)) return true;
  return false;
};

export const checkSocialType = (navField: NavField) =>
  navField.type === "social";
