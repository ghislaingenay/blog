import Link from "next/link";

interface PostItemProps {
  post: PostMeta;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li className="mt-4 text-2xl">
      <Link href={`/posts/${post.id}`} />
      <h1>{JSON.stringify(post)}</h1>
    </li>
  );
}
