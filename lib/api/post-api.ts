import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";
const HEADERS_GITHUB = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
  "X-GitHub-Api-Version": "2022-11-28",
};

export const getPostByName = async (
  fileName: string
): Promise<Post | undefined> => {
  const language = Language.ENGLISH;
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
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeHighlight,
          rehypeSlug,
        ],
      },
    },
  });
  const id = fileName.replace(/\.mdx$/, "");
  const postObj: Post = { meta: { ...frontmatter, id }, content };
  return postObj;
};
////////////////////////////////////////////////////////////////////////////
export const getPostsMeta = async (): Promise<PostMeta[] | undefined> => {
  const res = await fetch(
    "https://api.github.com/repos/ghislaingenay/blog-posts/git/trees/master/?recursive=1",
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
    a.createdAt.localeCompare(b.createdAt) ? -1 : 1
  );
};
