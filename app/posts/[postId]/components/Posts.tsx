import { getPostsMeta } from "@lib-api/post-api";
import PostItem from "./PostItem";

export const Posts = async () => {
  const posts = await getPostsMeta();

  if (!posts) return <div>No posts!</div>;

  return (
    <ul className="w-full list-none p-0">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};
