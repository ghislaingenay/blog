import { getPostById } from "@/lib/api/post-api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PostItem from "./PostItem";

interface PostProps {
  params: {
    postId: string;
  };
}

// inside fetch('', {next: {revalidate: 60}})

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
  const postData = await await getPostById(postId);

  if (!postData) notFound();
  return <PostItem />;
}
