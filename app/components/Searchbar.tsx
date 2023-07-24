"use client";

import { sortPostsByTopic } from "@lib-api/post-api";

type SearchbarProps = {
  posts: PostMeta[];
};

export default function Searchbar({ posts }: SearchbarProps) {
  const sortPosts = sortPostsByTopic(posts);

  return (
    <div className="relative">
      <input type="text" placeholder="Search" />
    </div>
  );
}
