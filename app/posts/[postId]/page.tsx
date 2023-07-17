import { getPostByName } from "@/lib/api/post-api";
import { createMetaData } from "@/lib/functions";
import "highlight.js/styles/github-dark.css";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0; //Come back here and change

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
  if (!post) notFound();
  const { meta, content } = post;
  const { title, description, tags } = meta;
  const tagList = tags.map((tag, index) => (
    <Link key={index} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));
  return (
    <>
      <h2>Title</h2>
      <article>content</article>
      <section>
        <h3>Related</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
    </>
  );
}
