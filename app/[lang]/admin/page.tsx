import NotFoundError from "@components/NotFoundError";
import { LangProps } from "@interfaces/global.interface";
import { getForms } from "@lib-api/contact-api";
import { getToken } from "@lib/functions/auth.fn";
import { getDictionary } from "../dictionaries";
import { FormTable } from "./ContactTable";

export default async function AdminContact({ params: { lang } }: LangProps) {
  const formResponse = await getForms();
  const { formData } = formResponse.data;
  const accessToken = await getToken();
  const isGranted = formResponse.isSuccess;
  const isNotAuthorized = formResponse.statusCode === 401;
  const isForbidden = formResponse.statusCode === 403;

  const dict = await getDictionary(lang);
  const globalDict = dict.globalText;
  const adminPage = dict.appDirectory.admin;

  if (isNotAuthorized) {
    return (
      <NotFoundError
        buttonText={globalDict.returnToHome}
        title={adminPage.unauthorized.banner}
        message={adminPage.unauthorized.title}
      />
    );
  }

  if (isForbidden) {
    return (
      <NotFoundError
        buttonText={globalDict.returnToHome}
        title={adminPage.forbidden.banner}
        message={adminPage.forbidden.title}
      />
    );
  }

  if (!isGranted) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <h1>Admin Contact</h1>
      <p>Here you can see all the messages sent by the users</p>
      <FormTable formData={formData} accessToken={accessToken} />
    </div>
  );
}
