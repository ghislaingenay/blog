import { Tag } from "@app/components/Tag";
import { REVALIDATION_PERIOD } from "@constants/global.const";
import { createMetaData } from "@functions";
import { getPostByName, getPostsMeta } from "@lib-api/post-api";
import "highlight.js/styles/github.css"; //a11y-light
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCalendarDay, FaClock } from "react-icons/fa";

export const revalidate = REVALIDATION_PERIOD;

export interface PostProps {
  params: {
    postId: string;
  };
}

// inside fetch('', {next: {revalidate: 60}})
export async function generateStaticParams() {
  const posts = await getPostsMeta();
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

export default async function Post({ params: { postId } }: PostProps) {
  const post = await getPostByName(`${postId}.mdx`); //deduped
  if (!post) notFound();
  const { meta, content } = post;
  const { title, tags, image, updatedAt, readTime } = meta;
  const tagList = tags.map((tag, index) => (
    <Link key={index} href={`/tags/${tag}`}>
      <Tag color="blue">{tag}</Tag>
    </Link>
  ));

  return (
    <div className="md:w-7/12 mx-auto">
      <div className="h-48" />
      <div className="overflow-hidden">
        <div className=" overflow-hidden absolute top-[-10%] left-[-25%] lg:left-[-5%] h-[14rem] w-[150%] overflow-x-hidden rounded-b-[80%] bg-blue-500 bg-gradient-to-b from-orange-400  to-orange-300"></div>
      </div>
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
        <h3 className="mt-0">Related</h3>
        <div className="flex flex-row gap-4">{tagList}</div>
      </section>
    </div>
  );
}
