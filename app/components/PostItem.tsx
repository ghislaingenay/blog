import Link from "next/link";
import React from "react";

interface PostItemProps {
  post: PostMeta;
  tagPost?: boolean;
}

const linkStyle: React.CSSProperties = { textDecoration: "none" };

export default function PostItem({ post, tagPost }: PostItemProps) {
  const { title, topic } = post;

  if (tagPost) {
    return (
      <Link
        href={`/posts/${post.id}`}
        style={{
          ...linkStyle,
        }}
      >
        <p className="p-0 mb-1 m-0">Hello - {title}</p>
      </Link>
    );
  }

  return (
    <li className="grid grid-cols-1 m-0 p-0 mb-10">
      <Link
        href={`/posts/${post.id}`}
        style={{
          ...linkStyle,
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
