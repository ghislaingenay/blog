const PostIdLoading = () => (
  <>
    <div className=" overflow-hidden absolute top-[-10%] left-[-25%] lg:left-[-5%] h-[14rem] w-[150%] overflow-x-hidden rounded-b-[80%] bg-blue-500 bg-gradient-to-b from-blue-400  to-orange-500"></div>
    <div role="status" className="animate-pulse w-full pb-5">
      {/* Spacing */}
      <div className="h-24" />
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
      {/* Post information */}
      <div className="flex items-center justify-between md:w-5/12 mt-6 mx-auto">
        <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <span className="sr-only">Loading...</span>
      {/* Image */}
      <div role="status" className="my-12">
        <div className="flex items-center justify-center w-full h-60 md:w-7/12 bg-gray-300 rounded dark:bg-gray-700 mx-auto">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
      {/* Paragraph */}
      <div role="status" className="max-w-lg animate-pulse mx-auto">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-18 mb-4"></div>
        <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[320px] mb-2.5"></div>
        <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </>
);

export default PostIdLoading;
