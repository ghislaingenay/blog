import { createMetaData, parseTag } from "@functions";
import { getStagingPostByName } from "@lib-api/post-api";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostProps } from "../page";

export async function generateMetadata({
  params: { postId },
}: PostProps): Promise<Metadata> {
  const post = await getStagingPostByName(`${postId}.mdx`);
  if (!post) {
    return { title: "Post Not Found" };
  }
  const { meta } = post;
  const { title, description, keywords } = meta;
  return createMetaData({ title, description, keywords });
}

export default async function Post({ params: { postId } }: PostProps) {
  if (process.env.NODE_ENV === "production") notFound();
  const post = await getStagingPostByName(`${postId}.mdx`);
  if (!post) notFound();
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
