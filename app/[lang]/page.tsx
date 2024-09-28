import HeroBanner from "@components/routes/homepage/HeroBanner";
import HomePosts from "@components/routes/homepage/HomePosts";
import { REVALIDATION_PERIOD } from "@constants/global.const";
import { LangProps } from "@interfaces";

export const revalidate = REVALIDATION_PERIOD;

export default async function Home({ params: { lang } }: LangProps) {
  return (
    <>
      <HeroBanner />
      <HomePosts />
    </>
  );
}
