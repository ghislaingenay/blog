import { getPostsMeta } from "@lib-api/post-api";
import PostItem from "./PostItem";

export default async function PostList() {
  const posts = await getPostsMeta();

  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }

  return (
    // <section className="mt-6 mx-auto max-w-2xl">
    <section className="my-10">
      <h2>Blog</h2>
      <ul>
        {/* <ul className="w-full list-none p-0"> */}
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
