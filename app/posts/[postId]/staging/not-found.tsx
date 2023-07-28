import NotFoundError from "@app/components/NotFoundError";

export default function NotFound() {
  return (
    <NotFoundError
      title="Sorry, the requested post does not exist."
      message="Please try with a available post"
    />
  );
}
