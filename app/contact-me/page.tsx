import NotFoundError from "@app/components/NotFoundError";
import { generateKey } from "@functions";

export default async function ContactMePage() {
  return (
    <NotFoundError
      title="On construction ..."
      message="This page is in preparation. Please come back later."
      key={generateKey()}
    />
  );
}
