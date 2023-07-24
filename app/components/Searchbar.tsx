"use client";
import { SelectProps } from "@interfaces/global.interface";
import { sortPostsByTopic } from "@lib-api/post-api";
import $ from "jquery";
import { useEffect, useState } from "react";
import { FaCross } from "react-icons/fa";
import { useDebounce } from "usehooks-ts";

type SearchbarProps = {
  posts: PostMeta[];
};

type FilteredPosts = ReturnType<typeof sortPostsByTopic>;

interface SearchSelectProps extends SelectProps {
  posts: FilteredPosts;
  loading: boolean;
}

export default function Searchbar({ posts }: SearchbarProps) {
  const [filteredPosts, setFilteredPosts] = useState<FilteredPosts>(
    {} as FilteredPosts
  );
  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query, 500);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (debouncedQuery) {
      const regex = new RegExp(debouncedQuery, "gi");
      const filteredPosts = posts.filter(({ title, description }) => {
        return regex.test(title) || regex.test(description);
      });
      const sortedPosts = sortPostsByTopic(filteredPosts);
      setFilteredPosts(sortedPosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const SearchSelect = ({ posts, ...props }: SearchSelectProps) => {
    if (!posts) return <></>;
    if (loading) return <div>Loading...</div>;
    return (
      <select {...props}>
        {Object.entries(posts).map(([topic, posts]) => {
          return (
            <optgroup key={topic} label={topic.replace(/[_]/gi, "")}>
              {posts.map(({ id, title }) => {
                return (
                  <option key={id} value={id}>
                    {title}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </select>
    );
  };

  return (
    <div className="overflow-hidden z-90 bg-slate-500 absolute" id="searchbar">
      <div
        className="top-20 right-20"
        onClick={() => $("div#searchbar").addClass("hidden")}
      >
        <FaCross className="text-2lg text-white font-bold" />
      </div>
      <div className="absolute left-1/2 top-1/2 translate-y-2/4 translate-x-2/4 w-10/12 h-10/12 bg-white">
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <SearchSelect posts={filteredPosts} loading={loading} />
      </div>
    </div>
  );
}
