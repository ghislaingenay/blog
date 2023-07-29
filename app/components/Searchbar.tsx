"use client";
import { SelectProps } from "@interfaces/global.interface";
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

type SearchbarProps = {
  posts: PostMeta[];
};

type FilteredPosts = ReturnType<typeof sortPostsByTopic>;

interface SearchSelectProps extends SelectProps {
  posts: FilteredPosts;
}

export default function Searchbar({ posts }: SearchbarProps) {
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

  useEffect(() => {
    const haveQuery = debouncedQuery && debouncedQuery.length > 0;
    if (!haveQuery) return;
    setParams({ ...params, query: debouncedQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    console.log("clikc");
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

  const SearchSelect = ({ posts, ...props }: SearchSelectProps) => {
    if (!posts) return <></>;
    if (loading) return <div>Loading...</div>;

    const OPTION_CLASS =
      "p-2 px-4 m-1 ml-6 hover:bg-blue-300 hover:rounded-2xl";
    return (
      <>
        {Object.entries(posts).map(([topic, posts]) => {
          return (
            <optgroup
              className="text-base font-bold italic"
              key={topic}
              label={topic.replace(/[_]/gi, " ")}
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
      className="fixed z-[1500] hidden w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full max-h-full bg-slate-500 bg-opacity-80 "
    >
      <div className="h-full grid">
        <div className="place-self-center w-full border max-w-[95%] md:max-w-2xl max-h-full rounded-xl">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 animate-jump-in animate-once animate-duration-400">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => $("div#search-modal").addClass("hidden")}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6">
              <div className="relative pb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 text-gray-500 dark:text-gray-400 pb-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  value={query}
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by post title or description ..."
                  required
                />
              </div>
              {/* {Object.keys(PostTopic).map((topic, index) => {
                return <Tag color="blue">{topic}</Tag>
              })} */}
              <Switch>
                <Case condition={loading}>
                  <div className="grid grid-cols-4 place-self-center">
                    <div role="status" className="col-span-1">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    <div className="cols-span-3 my-auto p-0">
                      Finding posts ...
                    </div>
                  </div>
                </Case>
                <Case condition={!foundPosts}>
                  <div
                    className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 mr-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">No posts found!</span> Try
                      to modify your search but obtain what you are looking
                      for...
                    </div>
                  </div>
                </Case>
                <Default>
                  <SearchSelect
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
