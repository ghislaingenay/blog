import { REVALIDATION_PERIOD } from "@constants/global.const";
import { LangProps } from "@interfaces/global.interface";
import { getPostsMeta } from "@lib-api/post-api";
import Searchbar from "../components/navigation/Searchbar";
import PostItem from "../components/posts/PostItem";
import { AlertInfo } from "../components/styles/Alert";
import { getDictionary } from "./dictionaries";

export const revalidate = REVALIDATION_PERIOD;

export default async function Home({ params: { lang } }: LangProps) {
  const dict = await getDictionary(lang);
  const { alertNoPosts } = dict.appDirectory.homePage;
  const posts = await getPostsMeta(lang);
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
        <ul className="list-inside list-none p-0">
          {posts.map((post) => (
            <li key={post.id} className="mb-5 px-auto">
              <PostItem post={post} lang={lang} />
            </li>
          ))}
        </ul>
      </section>
      <Searchbar posts={posts} dict={dict} />
    </>
  );
}
