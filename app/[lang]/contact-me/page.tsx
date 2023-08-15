import { Dictionary, Language } from "@interfaces/global.interface";
import { getDictionary } from "../dictionaries";
import { ContactMeForm } from "./ContactMeForm";

export default async function ContactMePage() {
  const dict: Dictionary = await getDictionary(Language.ENGLISH);
  // const { returnToHome } = dict.globalText;
  // const { constructionMessage, constructionTitle } =
  //   dict.appDirectory.contactMePage;
  return <ContactMeForm dict={dict} />;
}
