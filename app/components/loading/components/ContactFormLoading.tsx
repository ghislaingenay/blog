import { range } from "@functions";

type ContactFormLoadingProps = {
  count: number;
};

export default function ContactFormLoading({ count }: ContactFormLoadingProps) {
  const loadingElement = (
    <div role="status" className="w-full animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
  return (
    <>
      {range(count).map((i) => (
        <div key={i} className="mb-10">
          {loadingElement}
        </div>
      ))}
    </>
  );
}
