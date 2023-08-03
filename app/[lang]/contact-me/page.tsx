import NotFoundError from "@components/NotFoundError";
import { generateKey } from "@functions";
import { Language } from "@interfaces/global.interface";
import { getDictionary } from "../dictionaries";

export default async function ContactMePage() {
  const dict = await getDictionary(Language.ENGLISH);
  const { returnToHome } = dict.globalText;
  const { constructionMessage, constructionTitle } =
    dict.appDirectory.contactMePage;
  return (
    <NotFoundError
      title={constructionTitle}
      buttonText={returnToHome}
      message={constructionMessage}
      key={generateKey()}
    />
  );
}
