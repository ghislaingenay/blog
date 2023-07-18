import { getPostsMeta } from "@lib-api/post-api";
import PostItem from "./components/PostItem";

export const revalidate = 20;

export default async function Home() {
  const posts = await getPostsMeta();
  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }
  return (
    <section className="my-10 mx-auto grid grid-cols-5 lg:grid-cols-4 gap-5">
      <div className="col-span-5 lg:col-span-1 border-black border h-[100px]" />
      <ul className="col-span-5 list-none p-0 lg:col-span-3 m-0">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
