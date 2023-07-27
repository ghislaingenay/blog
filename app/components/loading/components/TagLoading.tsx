export const TagLoading = () => (
  <div className="max-w-sm animate-pulse">
    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-max w-5 mb-4"></div>
  </div>
);

type TagListLoadingProps = {
  count?: number;
};

export const TagListLoading = ({ count = 5 }: TagListLoadingProps) => (
  <div className="grid grid-cols-4 md:grid-cols-6">
    {[...Array(count)].map((_, index) => (
      <div key={index} className="col-span-1">
        <TagLoading />
      </div>
    ))}
  </div>
);
