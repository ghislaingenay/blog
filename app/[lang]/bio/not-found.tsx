import NotFoundError from "@components/NotFoundError";

export default function NotFound() {
  return (
    <NotFoundError
      title="sorry"
      buttonText="Return to home"
      message="Please try again"
    />
  );
}
