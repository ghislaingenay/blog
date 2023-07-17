// import fs from "fs";
// import matter from "gray-matter";
// import path from "path";
// import { remark } from "remark";
// import html from "remark-html";

// const postsDirectory = path.join(process.cwd(), "blogposts");

// export function getSortedPostsData() {
//   const fileNames = fs.readdirSync(postsDirectory);
//   const allPostsData = fileNames.map((fileName) => {
//     const id = fileName.replace(/\.md$/, "");
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, "utf-8");

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents);
//     const post: Post = { id, ...(matterResult.data as Omit<Post, "id">) };
//     return post;
//   });
//   return allPostsData.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
// }

// export async function getPostData(id: string) {
//   const fullPath = path.join(postsDirectory, `${id}.md`);
//   const fileContents = fs.readFileSync(fullPath, "utf8");
//   const matterResult = matter(fileContents);
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content);

//   const contentHtml = processedContent.toString();
//   const postWithHtml: Post & { contentHtml: string } = {
//     id,
//     contentHtml,
//     ...(matterResult.data as Omit<Post, "id">),
//   };
//   return postWithHtml;
// }
export {};
