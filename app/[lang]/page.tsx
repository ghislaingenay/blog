import { REVALIDATION_PERIOD } from "@constants/global.const";
import { LangProps } from "@interfaces/global.interface";
import { getPostsMeta } from "@lib-api/post-api";
import Searchbar from "../components/Searchbar";
import PostItem from "../components/posts/PostItem";
import { AlertInfo } from "../components/styles/Alert";
import { getDictionary } from "./dictionaries";

export const revalidate = REVALIDATION_PERIOD;

export default async function Home({ params: { lang } }: LangProps) {
  const dict = await getDictionary(lang);
  const { alertNoPosts } = dict.appDirectory.homePage;
  const posts = await getPostsMeta();
  if (!posts) {
    return (
      <AlertInfo
        title={alertNoPosts.title}
        message={alertNoPosts.description}
      />
    );
  }

  return (
    <>
      <section className="col-span-1">
        <div role="listbox">
          {posts.map((post) => (
            <li key={post.id} className="list-none mb-5">
              <PostItem post={post} lang={lang} />
            </li>
          ))}
        </div>
      </section>
      <Searchbar posts={posts} dict={dict} />
    </>
  );
}
