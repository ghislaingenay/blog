import { getPostsMeta } from "@lib-api/post-api";
import PostItem from "./components/PostItem";

export const revalidate = 20;

export default async function Home() {
  const posts = await getPostsMeta();

  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }
  return (
    // <section className="mt-6 mx-auto max-w-2xl">
    <section className="my-10 mx-auto">
      <ul className="list-none p-0">
        {posts.map((post, index) => (
          <PostItem key={post.id} post={post} displayNumber={index} />
        ))}
      </ul>
    </section>
  );
}
