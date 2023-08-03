import { ReactNode } from "react";

type NavProps = {
  children: ReactNode;
};

export const Nav = ({ children }: NavProps) => {
  return (
    <>
      <nav className="fixed z-10 flex bg-stone-100 top-0 items-center h-16 w-full drop-shadow-lg">
        <div className="container flex flex-wrap items-center justify-between mx-auto w-full sm:w-[600px] md:w-[728px] lg:w-[984px] xl:w-[1240px] 2xl:[1535px] px-5 sm:px-0">
          {children}
        </div>
      </nav>
      <div className="h-28" />
    </>
  );
};
