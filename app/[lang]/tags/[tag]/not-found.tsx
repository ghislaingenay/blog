import NotFoundError from "@components/NotFoundError";
import { Language } from "@interfaces/global.interface";
import { getDictionary } from "../../dictionaries";

export default async function NotFound() {
  const dict = await getDictionary(Language.ENGLISH);
  const {
    globalText: { returnToHome },
    appDirectory: {
      tagPage: { notFoundSection },
    },
  } = dict;
  const { title, message } = notFoundSection;
  return (
    <NotFoundError title={title} message={message} buttonText={returnToHome} />
  );
}
