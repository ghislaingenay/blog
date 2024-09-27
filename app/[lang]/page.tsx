import { REVALIDATION_PERIOD } from "@constants/global.const";
import { LangProps } from "@interfaces/global.interface";
import { getDictionary } from "./dictionaries";

export const revalidate = REVALIDATION_PERIOD;

export default async function Home({ params: { lang } }: LangProps) {
  const dict = await getDictionary(lang);

  return <>Hello</>;
}
