import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { Tag } from "./Tag";

interface PostItemProps {
  post: PostMeta;
  tagPost?: boolean;
}

const linkStyle: CSSProperties = {
  textDecoration: "none",
};

export default function PostItem({ post, tagPost }: PostItemProps) {
  const { title, topic, image, tags } = post;

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
    <li className="m-0 p-0 mb-10">
      <Link
        href={`/posts/${post.id}`}
        style={{
          ...linkStyle,
        }}
      >
        <div className="border border-slate-400 rounded-lg shadow-md p-10 min-h-[15rem] grid grid-cols-6 gap-x-4">
          <div className="col-span-1 max-h-[100px]">
            <Image
              src={image}
              width={`${200}`}
              height={`${200}`}
              alt={`Image for ${title} blog post`}
              className="rounded-lg col-span-1 p-0 m-0"
            />
          </div>
          <div className="col-span-5 max-h-[100px]">
            <p className="text-sm mt-0 text-red-400">{topic}</p>
            <h3 className="p-0 mt-0 text-lg overflow-ellipsis">{title}</h3>
          </div>

          <p className="col-span-3 text-start text-base">
            {tags.map((tag, index) => (
              <Tag color="gray" key={index}>
                {tag}
              </Tag>
            ))}
          </p>
          <p className="col-span-3 text-end text-base">Mine</p>
        </div>
      </Link>
    </li>
  );
}
