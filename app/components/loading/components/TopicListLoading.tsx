export const TopicListLoading = () => (
  <div
    role="status"
    className="p-2 sm:p-4 lg:space-y-4 border border-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
  >
    {[1, 2, 3, 4].map((_, index) => (
      <div className="hidden lg:flex justify-between" key={index}>
        <div className="h-2.5 flex bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="h-2.5 flex bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
    ))}

    <div className="grid grid-cols-4 lg:hidden gap-x-3">
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="col-span-1">
          <div className="h-12 bg-gray-300 rounded-full dark:bg-gray-700 "></div>
          {/* <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div> */}
        </div>
      ))}
    </div>
  </div>
);

export default TopicListLoading;
