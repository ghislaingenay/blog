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
  };
  const haveTag = tag ? true : false;
  const tagMatch = (tagValue: string) => haveTag && tag === tagValue;
  const additionalTagProps = (tagValue: string): Partial<TagProps> =>
    tagMatch(tagValue) ? { color: "green" } : { color: "gray" };

  const changeOpacityTagClass = (tagValue: string) =>
    tagMatch(tagValue) ? "" : "opacity-50";
  return (
    <li className="m-0 p-0 mb-10 ">
      <Link
        href={`/posts/${post.id}`}
        style={{
          ...LINK_STYLE,
        }}
      >
        <div className=" bg-slate-100 shadow-md p-5 sm:p-5 min-h-[10rem] grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="col-span-2 md:col-span-1 max-h-full mb-3 md:mb-0 place-self-center h-full">
            <Image
              src={image}
              width={450}
              height={450}
              alt={`Image for ${title} blog post`}
              className="rounded-lg p-0 m-0"
            />
          </div>
          <div className="col-span-2 md:col-span-1 max-h-full">
            <TopicTag>{topic}</TopicTag>
            <br />
            <h3 className="p-0 mt-0 text-base sm:text-lg max-h-max">{title}</h3>
            <p className="col-span-8 md:col-span-6 text-start text-base my-auto">
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
    </li>
  );
}
