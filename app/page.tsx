import { getPostsMeta } from "@lib-api/post-api";
import PostItem from "./components/posts/PostItem";

export const revalidate = 20;

export default async function Home() {
  const posts = await getPostsMeta();
  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }
  return (
    <div className="grid grid-cols-5 lg:grid-cols-4 gap-x-5">
      <section className="col-span-5 border border-black lg:col-span-1 p-0 m-0 h-20 sm:h-24 lg:h-full" />
      <section className="col-span-5  lg:col-span-3 m-0 w-full">
        <ul className="list-none p-0">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      </section>
    </div>
  );
}
