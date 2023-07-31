import NotFoundError from "@app/components/NotFoundError";

export default function NotFound() {
  return (
    <NotFoundError
      title="Sorry, the requested tag post does not exist."
      message="Please access the tags directly from the post."
    />
  );
}
