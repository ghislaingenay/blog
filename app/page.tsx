import { getPostTopics, getPostsMeta } from "@lib-api/post-api";
import Searchbar from "./components/Searchbar";
import PostItem from "./components/posts/PostItem";
import { TopicList } from "./components/posts/TopicList";
import { AlertInfo } from "./components/styles/Alert";

export const revalidate = 20;

export default async function Home() {
  const posts = await getPostsMeta();
  if (!posts) {
    return <AlertInfo title="Sorry" message="No posts available" />;
  }

  const foundTopics = getPostTopics(posts);

  return (
    <>
      <div className="grid grid-cols-5 lg:grid-cols-4 gap-3">
        <section className="col-span-5 lg:col-span-1 p-0 m-0 max-h-max lg:h-full">
          <TopicList topics={foundTopics} />
        </section>
        <section className="col-span-5 lg:col-span-3 ">
          <div role="listbox">
            {posts.map((post) => (
              <li key={post.id} className="list-none mb-5">
                <PostItem post={post} />
              </li>
            ))}
          </div>
        </section>
      </div>
      <Searchbar posts={posts} />
    </>
  );
}
