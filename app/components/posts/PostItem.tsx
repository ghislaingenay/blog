import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { FaClock } from "react-icons/fa";
import { Tag, TagProps, TopicTag } from "../Tag";

interface PostItemProps {
  post: PostMeta;
  tag?: string;
}

export default function PostItem({ post, tag }: PostItemProps) {
  const { title, topic, image, tags, readTime } = post;

  const LINK_STYLE: CSSProperties = {
    textDecoration: "none",
    margin: 0,
    padding: 0,
  };
  const haveTag = tag ? true : false;
  const tagMatch = (tagValue: string) => haveTag && tag === tagValue;
  const additionalTagProps = (tagValue: string): Partial<TagProps> =>
    tagMatch(tagValue) ? { color: "green" } : { color: "gray" };

  const changeOpacityTagClass = (tagValue: string) =>
    tagMatch(tagValue) ? "" : "opacity-50";
  return (
    // <li className="border border-red-600">
    <Link
      href={`/posts/${post.id}`}
      style={{
        ...LINK_STYLE,
      }}
    >
      <div className=" bg-slate-100 shadow-md p-3 sm:p-5 min-h-[24rem] max-h-[28rem] md:h-[20rem] grid grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-4">
        <div className="col-span-2 md:col-span-1 md:mb-0 place-self-center w-[80%] md:w-full">
          <Image
            src={image}
            width={450}
            height={450}
            alt={`Image for ${title} blog post`}
            className="p-0 m-0"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-left md:text-right p-0 m-0">
            <TopicTag>{topic}</TopicTag>
          </p>
          <h3 className="p-0 mt-2 text-base sm:text-lg truncate line-clamp-2 md:line-clamp-3">
            {title}
          </h3>

          <p className="col-span-8 md:col-span-6 text-start text-base mb-0">
            {tags.map((tag, index) => (
              <Tag
                {...additionalTagProps(tag)}
                key={index}
                className={changeOpacityTagClass(tag)}
              >
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
    // </li>
  );
}
