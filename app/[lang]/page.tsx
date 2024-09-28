import { REVALIDATION_PERIOD } from "@constants/global.const";
import { LangProps } from "@interfaces/global.interface";
import { getPostsMeta } from "@lib-api/post-api";
import Searchbar from "../components/navigation/Searchbar";
import PostItem from "../components/posts/PostItem";
import { AlertInfo } from "../components/styles/Alert";
import { getDictionary } from "./dictionaries";

export const revalidate = REVALIDATION_PERIOD;

export default async function Home({ params: { lang } }: LangProps) {
  return <></>;
}
