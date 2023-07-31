import NotFoundError from "../components/NotFoundError";

export default function NotFound() {
  return (
    <NotFoundError
      title="Sorry, the requested page does not exist."
      message="Please check the URL or go back to the homepage."
    />
  );
}
