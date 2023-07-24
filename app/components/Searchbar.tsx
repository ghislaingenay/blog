"use client";
import { SelectProps } from "@interfaces/global.interface";
import { sortPostsByTopic } from "@lib-api/post-api";
import $ from "jquery";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

type SearchbarProps = {
  posts: PostMeta[];
};

type FilteredPosts = ReturnType<typeof sortPostsByTopic>;

interface SearchSelectProps extends SelectProps {
  posts: FilteredPosts;
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
    <div
      id="search-modal"
      tabIndex={-1}
      aria-disabled="true"
      aria-hidden="true"
      className="fixed z-[1500] hidden w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full max-h-full bg-slate-500 bg-opacity-80"
    >
      <div className="h-full grid ">
        <div className="place-self-center w-full border max-w-2xl max-h-full rounded-xl">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Terms of Service
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="search-modal"
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
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union's General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="search-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="search-modal"
                onClick={() => $("div#search-modal").addClass("hidden")}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div className=" z-1 bg-slate-500 w-full h-full fixed" id="searchbar">
  //       <div
  //         className="bg-slate-500 border-gray-500 border m-auto w-10 h-10 flex justify-center items-center cursor-pointer"
  //         // onClick={() => $("div#searchbar").addClass("hidden")}
  //         id="searchbar-content"
  //       >
  //         <FaCross className="text-2lg text-white font-bold" />
  //         <div className="absolute left-1/2 top-1/2 translate-y-2/4 translate-x-2/4 w-10/12 h-10/12 bg-white">
  //           <input type="text" onChange={(e) => setQuery(e.target.value)} />
  //           <SearchSelect posts={filteredPosts} loading={loading} />
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
