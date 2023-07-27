export const BioLoadingCard = () => (
  <>
    <div
      role="status"
      className="p-4 my-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
    </div>

    <div role="status" className="space-y-2.5 animate-pulse my-6">
      <div className="flex items-center w-full space-x-2">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[480px]">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[400px]">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[480px]">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[360px]">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  </>
);
