import { CustomImage, Video } from "@components/mdx";
import { ClipboardCode } from "@components/mdx/ClipboardCode";
import { CounterState } from "@components/mdx/CounterState";
import { Language, PostTopicKeys } from "@interfaces/global.interface";
import SearchBarParams from "@interfaces/nav.interface";
import dayjs from "dayjs";
import { SerializeOptions } from "next-mdx-remote/dist/types";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";
const HEADERS_GITHUB = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
  "X-GitHub-Api-Version": "2022-11-28",
};

const COMPONENTS_MDX = { Video, CustomImage, ClipboardCode, CounterState };
const OPTIONS_MDX: SerializeOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      rehypeHighlight,
      rehypeSlug,
    ],
  },
};

export async function getStagingPostByName(
  fileName: string
): Promise<Post | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/ghislaingenay/blog-posts/master/staging/${fileName}`,
    {
      headers: HEADERS_GITHUB,
    }
  );
  if (!res.ok) return undefined;
  const rawMDX = await res.text();
  if (/^404[:]/.test(rawMDX)) return undefined;
  const { frontmatter, content } = await compileMDX<Omit<PostMeta, "id">>({
    source: rawMDX,
    components: COMPONENTS_MDX,
    options: OPTIONS_MDX,
  });
  const id = fileName.replace(/\.mdx$/, "");
  const postObj: Post = { meta: { ...frontmatter, id }, content };
  return postObj;
}

export async function getPostByName(
  fileName: string
): Promise<Post | undefined> {
  const language = Language.ENGLISH as string;
  const res = await fetch(
    `https://raw.githubusercontent.com/ghislaingenay/blog-posts/master/${language}/${fileName}`,
    {
      headers: HEADERS_GITHUB,
    }
  );
  if (!res.ok) return undefined;
  const rawMDX = await res.text();
  if (/^404[:]/.test(rawMDX)) return undefined;
  const { frontmatter, content } = await compileMDX<Omit<PostMeta, "id">>({
    source: rawMDX,
    components: COMPONENTS_MDX,
    options: OPTIONS_MDX,
  });
  const id = fileName.replace(/\.mdx$/, "");
  const postObj: Post = { meta: { ...frontmatter, id }, content };
  return postObj;
}
////////////////////////////////////////////////////////////////////////////
export async function getPostsMeta(): Promise<PostMeta[] | undefined> {
  const res = await fetch(
    "https://api.github.com/repos/ghislaingenay/blog-posts/git/trees/master?recursive=1",
    {
      headers: HEADERS_GITHUB,
    }
  );
  if (!res.ok) throw new Error("Failed to fetch posts metadata");
  const repoFileTree: Filetree = await res.json();

  const englishFileTreeUrl = repoFileTree.tree.find(
    (file) => file.path === "en"
  )?.url;
  if (!englishFileTreeUrl) throw new Error("Failed to fetch posts metadata");
  const englishRes = await fetch(englishFileTreeUrl, {
    headers: HEADERS_GITHUB,
  });
  const englishFileTree: Filetree = await englishRes.json();
  const filesArray = englishFileTree.tree
    .map((treeObject) => treeObject.path)
    .filter((path) => path.endsWith(".mdx"));

  const posts: PostMeta[] = [];
  for (const file of filesArray) {
    const post = await getPostByName(file);
    if (post) posts.push(post.meta);
  }

  return posts.sort((a, b) =>
    dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1
  );
}
/////////////////////////////////////
export function getPostTopics(posts: PostMeta[]): PostTopicSearch[] {
  const topics: PostTopicSearch[] = [];
  for (const postElement of posts) {
    const { topic } = postElement;
    const foundIndex = topics.findIndex(
      (topicElement) => topicElement.name === topic
    );
    if (foundIndex === -1) topics.push({ name: topic, count: 1 });
    else topics[foundIndex].count++;
  }
  return topics;
}
///////////////////////////////////
export function sortPostsByTopic(
  posts: PostMeta[]
): Record<PostTopicKeys, PostMeta[]> {
  const sortedPosts = {} as ReturnType<typeof sortPostsByTopic>;
  for (const post of posts) {
    const { topic }: { topic: PostTopicKeys } = post;
    if (!sortedPosts[topic]) sortedPosts[topic] = [post];
    else sortedPosts[topic].push(post);
  }
  return sortedPosts;
}
//////////////////////////////////////////////////

export const havePosts = (posts: PostMeta[]) => posts.length > 0;

export const filterPostsByParams = (
  params: SearchBarParams,
  posts: PostMeta[]
) => {
  const { query, topic } = params || {};
  let filteredPosts = [...posts];

  if (topic) filteredPosts = sortPostsByTopic(posts)[topic];
  if (query && havePosts(filteredPosts)) {
    const regex = new RegExp(query, "gi");
    filteredPosts = filteredPosts.filter(({ title, description }) => {
      return regex.test(title) || regex.test(description);
    });
  }
  return filteredPosts;
};
