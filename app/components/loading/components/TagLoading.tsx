export const TagLoading = () => (
  <div className="hiden lg:flex items-center justify-between">
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
  </div>
);

type TagListLoadingProps = {
  count?: number;
};

export const TagListLoading = ({ count = 5 }: TagListLoadingProps) => (
  <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
    {[...Array(count)].map((_, index) => (
      <div key={index} className="col-span-1">
        <TagLoading />
      </div>
    ))}
  </div>
);
