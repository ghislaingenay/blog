import Link from "next/link";

interface PostItemProps {
  post: PostMeta;
  displayNumber: number;
}

export default function PostItem({ post, displayNumber }: PostItemProps) {
  const { title, topic } = post;
  const isZero = displayNumber === 0;
  const isEven = !isZero && displayNumber % 2 === 0;
  const isOdd = !isZero && !isEven;
  return (
    <Link href={`/posts/${post.id}`} style={{ textDecoration: "none" }}>
      <div className="border rounded-lg border-black p-10 m-5">
        <h3 className="p-0 mt-0 mb-10">{title}</h3>
        <p className="p-0 mb-1">{topic}</p>
      </div>
    </Link>
  );
}
