import { Dictionary, Language } from "@interfaces/global.interface";
import { getToken } from "@lib/functions/auth.fn";
import { getDictionary } from "../dictionaries";
import { ContactMeForm } from "./ContactMeForm";

export default async function ContactMePage() {
  const dict: Dictionary = await getDictionary(Language.ENGLISH);
  const accessToken = await getToken();
  return <ContactMeForm dict={dict} accessToken={accessToken} />;
}
