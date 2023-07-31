import { REVALIDATION_PERIOD } from "@constants/global.const";
import { getPostsMeta } from "@lib-api/post-api";
import Searchbar from "../components/Searchbar";
import PostItem from "../components/posts/PostItem";
import { AlertInfo } from "../components/styles/Alert";

export const revalidate = REVALIDATION_PERIOD;

export default async function Home() {
  const posts = await getPostsMeta();
  if (!posts) {
    return <AlertInfo title="Sorry" message="No posts available" />;
  }

  return (
    <>
      <section className="col-span-1">
        <div role="listbox">
          {posts.map((post) => (
            <li key={post.id} className="list-none mb-5">
              <PostItem post={post} />
            </li>
          ))}
        </div>
      </section>
      <Searchbar posts={posts} />
    </>
  );
}
