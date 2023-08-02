import { Language } from "@interfaces/global.interface";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { FaClock } from "react-icons/fa";
import { Tag, TagProps, TopicTag } from "../Tag";

interface PostItemProps {
  post: PostMeta;
  tag?: string;
  lang: Language;
}

export default function PostItem({ post, tag, lang }: PostItemProps) {
  const { title, topic, image, tags, createdAt } = post;

  const LINK_STYLE: CSSProperties = {
    textDecoration: "none",
    margin: 0,
    padding: 0,
  };
  const haveTag = tag ? true : false;

  const formattedDateDict = {
    [Language.ENGLISH]: dayjs(createdAt).format("MMM DD, YYYY"),
    [Language.FRENCH]: dayjs(createdAt).format("DD MMM YYYY"),
  };

  const altImageDict = {
    [Language.ENGLISH]: `Image blog post - ${title}`,
    [Language.FRENCH]: `Image pour le blog post :${title}`,
  };

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
      <div className=" bg-slate-100 shadow-md p-3 max-w-sm min-h-[400px] md:min-h-[160px] md:max-w-full lg:max-w-[80%] mx-auto md:px-10 grid grid-cols-1 gap-y-4 md:grid-cols-3 md:grid-rows-1 md:gap-x-10 place-self-center">
        <div className="col-span-1 md:col-start-1 md:col-end-2">
          <Image
            src={image}
            width={450}
            height={450}
            alt={altImageDict[lang]}
            className="m-0 object-fit"
          />
        </div>
        <div className="col-span-1 md:col-start-2 md:col-end-4">
          <div className="grid grid-cols-1 gap-y-4 lg:h-full">
            <div className="col-span-1">
              <div className="flex justify-between items-center">
                <TopicTag>{topic}</TopicTag>
                <span className="text-sm md:text-sm italic text-end">
                  <FaClock className="my-auto inline mr-2 mb-0.5 box-content" />
                  {formattedDateDict[lang]}{" "}
                </span>
              </div>
            </div>
            <h3 className="text-base sm:text-lg line-clamp-2 col-span-1 m-0 truncate">
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
          </div>
        </div>
      </div>
    </Link>
  );
}
