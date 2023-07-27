export const TopicListLoading = () => (
  <div
    role="status"
    className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
  >
    <div className="hiden lg:flex items-center justify-between">
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="grid grid-cols-4 lg:hidden gap-3">
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 col-span-1"
        >
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        </div>
      ))}
    </div>
  </div>
);

export default TopicListLoading;

export const TopicLoading = () => (
  <>
    <TopicListLoading />
    <TopicListLoading />
    <TopicListLoading />
    <TopicListLoading />
  </>
);
