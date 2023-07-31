import { Language } from "@interfaces/global.interface";
import NotFoundError from "../components/NotFoundError";
import { getDictionary } from "./dictionaries";

export default async function NotFound() {
  const dict = await getDictionary(Language.ENGLISH);
  return (
    <>
      <NotFoundError
        title={dict.appDirectory.homePage.notFoundSection.title}
        message={dict.appDirectory.homePage.notFoundSection.message}
        buttonText={dict.globalText.returnToHome}
      />
    </>
  );
}
