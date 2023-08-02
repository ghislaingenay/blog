"use client";
import {
  Dictionary,
  PostTopic,
  SelectProps,
} from "@interfaces/global.interface";
import SearchBarParams from "@interfaces/nav.interface";
import {
  filterPostsByParams,
  havePosts,
  sortPostsByTopic,
} from "@lib-api/post-api";
import $ from "jquery";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Case, Default, Switch } from "react-if";
import { useDebounce } from "usehooks-ts";
import { ParagraphLoading } from "./loading/components/ParagraphLoading";
import { AlertInfo } from "./styles/Alert";
import { CrossSvg, SearchSvg, SpinSvg } from "./svg/index";

type SearchbarProps = {
  posts: PostMeta[];
  dict: Dictionary;
};

type FilteredPosts = ReturnType<typeof sortPostsByTopic>;

interface SearchSelectProps extends SelectProps {
  posts: FilteredPosts;
  postTopics: Dictionary["postTopics"];
}

export default function Searchbar({ posts, dict }: SearchbarProps) {
  const router = useRouter();
  const [filteredPosts, setFilteredPosts] = useState<FilteredPosts>(
    {} as FilteredPosts
  );
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);
  const [loading, setLoading] = useState(false);

  const [foundPosts, setFoundPosts] = useState(true);

  const [params, setParams] = useState<SearchBarParams>({
    query: undefined,
    topic: undefined,
  });

  const { postTopics } = dict;
  const { placeholder, srOnlyModal, loadingText, findPosts, alertInfo } =
    dict.components.searchBar;

  useEffect(() => {
    const haveQuery = debouncedQuery && debouncedQuery.length > 0;
    if (!haveQuery) return;
    setParams({ ...params, query: debouncedQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    setLoading(true);
    const recoveredPosts = filterPostsByParams(params, posts);
    const foundPosts = havePosts(recoveredPosts);
    setFoundPosts(foundPosts);
    setTimeout(() => {
      setLoading(false);
      setFilteredPosts(sortPostsByTopic(recoveredPosts));
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    $("input#default-search").on("search", (e) => {
      setQuery("");
      setParams({ ...params, query: "" });
    });
  });

  const SearchSelect = ({ posts, postTopics }: SearchSelectProps) => {
    if (!posts) return <></>;
    if (loading) return <ParagraphLoading />;

    const OPTION_CLASS =
      "p-2 px-4 m-1 ml-6 hover:bg-blue-300 hover:rounded-2xl";
    return (
      <>
        {Object.entries(posts).map(([topic, posts]) => {
          return (
            <optgroup
              className="text-base font-bold italic"
              key={topic}
              label={postTopics[topic as keyof typeof PostTopic]}
            >
              {posts.map(({ id, title }) => {
                return (
                  <option
                    key={id}
                    value={id}
                    className={`${OPTION_CLASS} truncate`}
                    onClick={() => router.push(`/posts/${id}`)}
                  >
                    {title}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </>
    );
  };

  return (
    <div
      id="search-modal"
      tabIndex={-1}
      aria-disabled="true"
      aria-hidden="true"
      className="fixed z-[1500] hidden w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full max-h-full bg-slate-500 bg-opacity-80 backdrop-blur"
    >
      <div className="h-full grid">
        {/* Box placement */}
        <div className="place-self-center w-full border max-w-[280px] xs:max-w-full sm:max-w-2xl md:max-w-2xl rounded-xl">
          {/* Search box */}
          <div className="relative bg-white rounded-lg shadow animate-jump-in animate-once animate-duration-400">
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => $("div#search-modal").addClass("hidden")}
              >
                <CrossSvg />
                <span className="sr-only">{srOnlyModal}</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6">
              <div className="relative pb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchSvg />
                </div>
                <input
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  value={query}
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={placeholder}
                  required
                />
              </div>
              <Switch>
                <Case condition={loading}>
                  <div className="grid grid-cols-4 place-self-center">
                    <div role="status" className="col-span-1">
                      <SpinSvg />
                      <span className="sr-only">{loadingText}</span>
                    </div>
                    <div className="cols-span-3 my-auto p-0">{findPosts}</div>
                  </div>
                </Case>
                <Case condition={!foundPosts}>
                  <AlertInfo
                    title={alertInfo.title}
                    message={alertInfo.description}
                  />
                </Case>
                <Default>
                  <SearchSelect
                    postTopics={postTopics}
                    posts={filteredPosts}
                    className="w-full rounded-2xl border text-black border-gray-500 focus:border-gray-700 focus:text-blue-500 p-2"
                  />
                </Default>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
