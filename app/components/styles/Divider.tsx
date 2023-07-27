export const Divider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      {children ? (
        <div className="flex flex-row  gap-x-2 items-center my-2">
          <hr className="flex flex-auto border-black border-1 m-0 box-border my-auto" />
          <h5 className="flex flex-shrink justify-center font-bold text-base text-black">
            {children}
          </h5>
          <hr className="flex flex-auto border-black border-1 m-0 box-border my-auto" />
        </div>
      ) : (
        <hr className=" border-black border-1 m-0 my-2" />
      )}
    </>
  );
};
