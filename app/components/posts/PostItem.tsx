import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { Tag, TagProps, TopicTag } from "../Tag";

interface PostItemProps {
  post: PostMeta;
  tag?: string;
}

export default function PostItem({ post, tag }: PostItemProps) {
  const { title, topic, image, tags, createdAt } = post;

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
    <Link
      id={topic}
      href={`/posts/${post.id}`}
      style={{
        ...LINK_STYLE,
      }}
    >
      <div className=" bg-slate-100 dark:bg-slate-950 shadow-md p-3 md:px-10 md:h-[25rem] grid grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-10 items-center">
        <div className="col-span-2 md:col-span-1">
          <Image
            src={image}
            width={450}
            height={450}
            alt={`Image for ${title} blog post`}
          />
        </div>
        <div className="col-span-2 md:col-span-1 gap-3 grid">
          <div className="text-left md:text-right mb-0 col-span-1">
            <TopicTag>{topic}</TopicTag>
          </div>
          <h3 className="p-0 mt-2 md:mt-0 text-base sm:text-lg line-clamp-2 col-span-1">
            {title}
          </h3>

          <div className="text-start text-base m-0 col-span-1">
            {tags.map((tag, index) => (
              <Tag
                {...additionalTagProps(tag)}
                key={index}
                className={changeOpacityTagClass(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>

          {/* Flexbox */}
          <div className="hidden text-start text-base col-span-1 md:flex md:flex-row md:justify-between md:items-center md:gap-2">
            {/* Left Column */}
            <div className="flex flex-row justify-left items-center gap-2  basis-[65%]">
              <div className="flex flex-col justify-center items-center ">
                <Image
                  src={image}
                  width={50}
                  height={50}
                  layout="fixed"
                  className="rounded-full w-10 h-10 object-cover align-baseline "
                  alt={`Image for ${title} blog post`}
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="flex flex-row flex-1 text-sm font-bold">
                  Ghislain Genay
                </span>
                <span className="flex flex-1 flex-row text-xs italic">
                  Full Stack Developer
                </span>
              </div>
            </div>
            {/* Right Column */}
            <div className="flex flex-col">
              <span className="text-xs italic text-end">{createdAt} </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
