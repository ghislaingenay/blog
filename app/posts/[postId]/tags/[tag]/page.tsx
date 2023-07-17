import { REVALIDATION_PERIOD } from "@constants/global.const";
import { capitalize, createMetaData } from "@functions";
import { getPostsMeta } from "@lib-api/post-api";

export interface TagProps {
  params: {
    tag: string;
  };
}

export const revalidate = REVALIDATION_PERIOD;

export async function generateStaticParams() {
  const posts = await getPostsMeta(); //deduped!
  if (!posts) return [];
  const keywords = new Set(posts.map((post) => post.keywords).flat());
  return Array.from(keywords).map((keyword) => ({ tag: keyword }));
}

export function generateMetadata({ params: { tag } }: TagProps) {
  return createMetaData({ title: `Posts about ${tag}` });
}

export default async function TagList({ params: { tag } }: TagProps) {
  const posts = await getPostsMeta(); //deduped!
  if (!posts)
    return <p className="mt-5 text-center">Sorry, no posts available.</p>;

  const tagPosts = posts.filter((post) => post.keywords.includes(tag));

  const tagHavePosts = tagPosts.length > 0;

  return (
    <>
      {tagHavePosts ? (
        <>
          <div className="flex flex-col gap-4">
            {tagPosts.map((post, index) => (
              <div key={index}>{post.title}</div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="mt-5 text-center">
            Sorry, no posts found for tag: {""}
            <span className="font-bold text-blue-500">{capitalize(tag)}</span>
          </p>
        </>
      )}
    </>
  );
}
