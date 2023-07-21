import { NavField } from "@app/components/Navbar";

export const matchPath = (link: string, currentPath: string) => {
  if (link === currentPath && link === "/") return true;
  if (link !== "/" && new RegExp(link, "gi").test(currentPath)) return true;
  return false;
};

export const selectColorTextHover = (samePath: boolean) =>
  samePath ? "text-blue-600" : "text-gray-700";
export const checkSocialType = (navField: NavField) =>
  navField.type === "social";
