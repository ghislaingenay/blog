import Link from "next/link";

interface PostItemProps {
  post: PostMeta;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <p>
      <Link href={`/posts/${post.id}`}>{JSON.stringify(post)}</Link>
    </p>
  );
}
