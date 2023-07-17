import { capitalize, createMetaData } from "@functions";
import { getPostsMeta } from "@lib-api/post-api";
import { Else, If, Then } from "react-if";

export interface TagProps {
  params: {
    tag: string;
  };
}

export const revalidate = 0; //Come back here and change

export async function generateStaticParams() {
  const posts = await getPostsMeta(); //deduped!
  if (!posts) return [];
  const keywords = new Set(posts.map((post) => post.keywords).flat());
  return Array.from(keywords).map((tag) => ({ tag }));
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
      <If condition={tagHavePosts}>
        <Then>
          <div className="flex flex-col gap-4">
            {tagPosts.map((post, index) => (
              <div key={index}>{post.title}</div>
            ))}
          </div>
        </Then>
        <Else>
          <p className="mt-5 text-center">
            Sorry, no posts found for tag: {""}
            <span className="font-bold text-blue-500">{capitalize(tag)}</span>
          </p>
        </Else>
      </If>
    </>
  );
}
