import { REVALIDATION_PERIOD } from "@constants/global.const";
import { createMetaData, parseTag } from "@functions";
import { getPostByName } from "@lib-api/post-api";
import "highlight.js/styles/github-dark.css";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = REVALIDATION_PERIOD;
export const dynamic = "force-dynamic";

export interface PostProps {
  params: {
    postId: string;
  };
}

// inside fetch('', {next: {revalidate: 60}})
// export async function generateStaticParams() {
//   const posts = await getPostsMeta();
//   if (!posts) return [];
//   return posts.map((post) => ({ postId: post.id }));
// }

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
  if (!post) return notFound();
  const { meta, content } = post;
  const { title, tags } = meta;
  const tagList = tags.map((tag, index) => (
    <Link key={index} href={`/tags/${tag}`}>
      {parseTag(tag)}
    </Link>
  ));

  return (
    <>
      <h2>{title}</h2>
      <article>{content}</article>
      <section>
        <h3>Related</h3>
        <div className="flex flex-row gap-4">{tagList}</div>
      </section>
    </>
  );
}
