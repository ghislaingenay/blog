import PostItem from "@app/components/PostItem";
import { REVALIDATION_PERIOD } from "@constants/global.const";
import { capitalize, createMetaData } from "@functions";
import { getPostsMeta } from "@lib-api/post-api";

export interface TagProps {
  params: {
    tag: string;
  };
}

export const revalidate = REVALIDATION_PERIOD;

// export async function generateStaticParams() {
//   const posts = await getPostsMeta(); //deduped!
//   if (!posts) return [];
//   const tags = new Set(posts.map((post) => post.tags).flat());
//   return Array.from(tags).map((tag) => ({ tag }));
// }

export function generateMetadata({ params: { tag } }: TagProps) {
  return createMetaData({ title: `Posts about ${tag}` });
}

export default async function TagList({ params: { tag } }: TagProps) {
  const posts = await getPostsMeta(); //deduped!
  if (!posts)
    return <p className="mt-5 text-center">Sorry, no posts available.</p>;

  const tagPosts = posts.filter((post) => post.tags.includes(tag));

  const tagHavePosts = tagPosts.length > 0;

  return (
    <div className="mt-10">
      {tagHavePosts ? (
        <>
          <div className="flex flex-col gap-4">
            {tagPosts.map((post, index) => (
              <PostItem key={index} post={post} tagPost />
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
    </div>
  );
}