import { CommentsLoading } from "@components/loading/components/CommentsLoading";
import PostIdLoading from "@components/loading/pages/PostIdLoading";

export default function Loading() {
  return (
    <>
      <PostIdLoading />
      <CommentsLoading />
    </>
  );
}
