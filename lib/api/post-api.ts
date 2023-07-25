import { CustomImage, Video } from "@components/mdx";
import { Language, PostTopic } from "@interfaces/global.interface";
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

const COMPONENTS_MDX = { Video, CustomImage };
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

export async function getPostByName(
  fileName: string
): Promise<Post | undefined> {
  try {
    const language = Language.ENGLISH as string;
    const res = await fetch(
      `https://raw.githubusercontent.com/ghislaingenay/blog-posts/master/${language}/${fileName}`,
      {
        headers: HEADERS_GITHUB,
      }
    );
    if (!res.ok) throw new Error("Failed to fetch post");
    const rawMDX = await res.text();
    if (/^404[:]/.test(rawMDX)) throw new Error("Failed to fetch post");
    const { frontmatter, content } = await compileMDX<Omit<PostMeta, "id">>({
      source: rawMDX,
      components: COMPONENTS_MDX,
      options: OPTIONS_MDX,
    });
    const id = fileName.replace(/\.mdx$/, "");
    const postObj: Post = { meta: { ...frontmatter, id }, content };
    return postObj;
  } catch (err: any) {
    throw new Error(err);
  }
}
////////////////////////////////////////////////////////////////////////////
export async function getPostsMeta(): Promise<PostMeta[] | undefined> {
  try {
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
      a.createdAt.localeCompare(b.createdAt) ? 1 : -1
    );
  } catch (err: any) {
    throw new Error(err);
  }
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
): Record<Partial<keyof PostTopic>, PostMeta[]> {
  const sortedPosts = {} as ReturnType<typeof sortPostsByTopic>;
  for (const post of posts) {
    const { topic } = post;
    if (!sortedPosts[topic]) sortedPosts[topic] = [post];
    else sortedPosts[topic].push(post);
  }
  return sortedPosts;
}
