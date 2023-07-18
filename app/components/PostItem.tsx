import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { FaClock } from "react-icons/fa";
import { Tag } from "./Tag";

interface PostItemProps {
  post: PostMeta;
  tagPost?: boolean;
}

const linkStyle: CSSProperties = {
  textDecoration: "none",
};

export default function PostItem({ post, tagPost }: PostItemProps) {
  const { title, topic, image, tags, readTime } = post;

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
        <div className="border border-slate-400 rounded-2xl shadow-md p-5 sm:p-5 min-h-[10rem] grid grid-cols-8 gap-x-4 gap-y-2">
          <div className="col-span-8 md:col-span-4 lg:col-span-2 max-h-full mb-3 md:mb-0 place-self-center h-full">
            <Image
              src={image}
              width={450}
              height={450}
              alt={`Image for ${title} blog post`}
              className="rounded-lg p-0 m-0"
            />
          </div>
          <div className="col-span-8 md:col-span-4 lg:col-span-6 max-h-full">
            <p className="text-xs sm:text-sm mt-0 text-red-600">{topic}</p>
            <div className="w-full border border-spacing-0.5 mb-2 opacity-50 border-stone-500" />
            <h3 className="p-0 mt-0 text-base sm:text-lg max-h-max">{title}</h3>
            <p className="col-span-8 md:col-span-6 text-start text-base my-auto">
              {tags.map((tag, index) => (
                <Tag color="gray" key={index}>
                  {tag}
                </Tag>
              ))}
            </p>
            <div className="hidden md:inline md:col-span-2 text-end text-base py-1">
              <div className="flex justify-start gap-2 my-4">
                <FaClock className="my-auto italic" />
                <p className="m-0 p-0 italic text-xs">{readTime}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
