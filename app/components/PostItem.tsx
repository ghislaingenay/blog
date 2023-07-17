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
    <div className="border rounded-lg border-black p-10 my-5">
      <h3>{title}</h3>
      <p>{topic}</p>
      <Link href={`/posts/${post.id}`}>Click here</Link>
    </div>
  );
}
