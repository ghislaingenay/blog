import { Tag } from "@components/Tag";
import { REVALIDATION_PERIOD } from "@constants/global.const";
import { createMetaData } from "@functions";
import { Language } from "@interfaces/global.interface";
import { getPostByName, getPostsMeta } from "@lib-api/post-api";
import "highlight.js/styles/github.css"; //a11y-light
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCalendarDay, FaClock } from "react-icons/fa";
import { getDictionary } from "../../dictionaries";

export const revalidate = REVALIDATION_PERIOD;

export interface PostProps {
  params: {
    postId: string;
    lang: Language;
  };
}

// inside fetch('', {next: {revalidate: 60}})
export async function generateStaticParams({ params: { lang } }: PostProps) {
  if (process.env.NODE_ENV === "development") return [];
  const posts = await getPostsMeta(lang);
  if (!posts) return [];
  return posts.map((post) => ({ postId: post.id }));
}

export async function generateMetadata({
  params: { postId },
}: PostProps): Promise<Metadata> {
  const post = await getPostByName(`${postId}.mdx`); //deduped
  if (!post) {
    return { title: "Post Not Found" };
  }
  const { meta } = post;
  const { title, description, keywords } = meta;
  return createMetaData({ title, description, keywords });
}

export default async function Post({ params: { postId, lang } }: PostProps) {
  const dict = await getDictionary(lang);
  const {
    postIdPage: { relatedArticles },
  } = dict.appDirectory;
  const post = await getPostByName(`${postId}.mdx`); //deduped
  if (!post) notFound();
  const { meta, content } = post;
  const { title, tags, image, updatedAt, readTime } = meta;
  const tagList = tags.map((tag, index) => {
    return (
      <Tag color="blue" link={`/tags/${tag}`} key={index}>
        {tag}
      </Tag>
    );
  });

  return (
    <div className="md:w-7/12 mx-auto">
      <div className="h-[10rem] w-full bg-gradient-radial blur roounded-full from-slate-200 to-bg-transparent mb-10" />
      <h1
        className="text-center text-xl sm:text-2xl md:text-3xl m-0"
        id="title"
      >
        {title}
      </h1>
      <div className="grid grid-cols-2 gap-0 justify-items-center">
        <p className="col-span-1 my-1">
          <FaClock className="my-auto text-xl inline mx-2 mb-1" />
          <span className="italic font-medium">{readTime}</span>
        </p>
        <p className="col-span-1 my-1">
          <FaCalendarDay className="text-xl inline mx-2 mb-1" />
          <span className="italic font-medium">{updatedAt}</span>
        </p>
      </div>
      <Image
        alt={`Image for post ${title}`}
        width={650}
        height={650}
        src={image}
        className="object-cover w-full md:w-7/12 mx-auto h-full rounded-2xl shadow-lg mb-0"
      />
      <div className="h-5" />
      <article>{content}</article>
      <hr className="my-4" />
      <section>
        <h3 className="mt-0">{relatedArticles}</h3>
        <div className="flex flex-row gap-4">{tagList}</div>
      </section>
    </div>
  );
}
