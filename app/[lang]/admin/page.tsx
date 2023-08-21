import { LangProps } from "@interfaces/global.interface";
import { getForms } from "@lib-api/contact-api";
import { getToken } from "@lib/functions/auth.fn";
import { FormTable } from "./ContactTable";

export default async function AdminContact({ params: { lang } }: LangProps) {
  const formData = await getForms();
  const accessToken = await getToken();
  const isGranted = formData.isSuccess
  const isNotAuthorized = formData.statusCode === 401
  const isForbidden = formData.statusCode === 403

  if (isNotAuthorized) {
    return <div>Not authorized</div>
  }

  if (isForbidden) {
    return <div>Forbidden</div>
  }

  if (!isGranted) {
    return <div>Something went wrong</div>
  }

  return (
    <div>
      <h1>Admin Contact</h1>
      <p>Here you can see all the messages sent by the users</p>
      <FormTable formData={formData.data} accessToken={accessToken} />


}
