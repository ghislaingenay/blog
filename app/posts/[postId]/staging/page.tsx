import { getPostByName } from "@/lib/api/post-api";
import { createMetaData } from "@/lib/functions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostProps } from "../page";

export async function generateMetadata({
  params: { postId },
}: PostProps): Promise<Metadata> {
  const post = await getPostByName(postId);
  if (!post) {
    return { title: "Post Not Found" };
  }
  const { meta } = post;
  const { title, description, keywords } = meta;
  return createMetaData({ title, description, keywords });
}

export default async function Post({ params: { postId } }: PostProps) {
  const postData = await getPostByName(postId);
  const isDevelopment = process.env.NODE_ENV === "development";
  if (!postData || !isDevelopment) notFound();
  return <div />;
}
