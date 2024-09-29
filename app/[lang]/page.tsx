import ContactForm from "@components/routes/homepage/ContactForm";
import HeroBanner from "@components/routes/homepage/HeroBanner";
import HomeNavbar from "@components/routes/homepage/HomeNavbar";
import HomePosts from "@components/routes/homepage/HomePosts";
import { REVALIDATION_PERIOD } from "@constants/global.const";
import { LangProps } from "@interfaces";

export const revalidate = REVALIDATION_PERIOD;

export default async function Home({ params: { lang } }: LangProps) {
  return (
    <>
      <HomeNavbar />
      <div className="h-16" />
      <HeroBanner />
      <HomePosts />

      <section id="#contact-me">
        <ContactForm />
      </section>
    </>
  );
}
