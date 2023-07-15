import { getPostById } from "@/lib/api/post-api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostProps } from "../page";

export async function generateMetadata({
  params: { postId },
}: PostProps): Promise<Metadata> {
  const post = await getPostById(postId);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return { title: "Post", description: "post.title", keywords: "post.title" };
}

export default async function Post({ params: { postId } }: PostProps) {
  const postData = await getPostById(postId);
  const isDevelopment = process.env.NODE_ENV === "development";
  if (!postData || !isDevelopment) notFound();
  return <PostItem />;
}
