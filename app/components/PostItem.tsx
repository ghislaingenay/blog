import Link from "next/link";

interface PostItemProps {
  post: PostMeta;
  displayNumber: number;
}

export default function PostItem({ post, displayNumber }: PostItemProps) {
  const { title, topic } = post;

  return (
    <li className="grid grid-cols-1 m-0 p-0 mb-10">
      <Link
        href={`/posts/${post.id}`}
        style={{
          textDecoration: "none",
        }}
      >
        <div className="border border-slate-400 rounded-lg shadow-md p-10 min-h-[15rem]">
          <h3 className="p-0 mt-0 mb-10">{title}</h3>
          <p className="p-0 mb-1">{topic}</p>
        </div>
      </Link>
    </li>
  );
}
