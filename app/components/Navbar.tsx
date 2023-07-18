"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Else, If, Then } from "react-if";

export default function Navbar() {
  const pathname = usePathname();
  const isNavApplied = !pathname.startsWith("/posts");

  const [articleCompletion, setArticleCompletion] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollTotal =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = (window.scrollY / scrollTotal) * 100;
      setArticleCompletion(scrollPercentage);
    });
  }, []);

  const LineScroll = ({ value }: { value: number }) => (
    <div className="fixed z-10 top-[4rem] left-0 w-full h-1 scroll-smooth">
      <div className="h-full bg-black" style={{ width: `${value}%` }} />
    </div>
  );

  const percentage = useDeferredValue(articleCompletion);
  const shouldShowGlobalNavbar = useDeferredValue(isNavApplied);
  // if (!isNavApplied) return <></>; // return an arrow element non fixed to go bqck previous page router.back()
  return (
    <If condition={shouldShowGlobalNavbar}>
      <Then>
        <nav className="fixed z-10 flex bg-slate-200 top-0 items-center h-16 w-full drop-shadow-lg">
          <div className="container mx-auto w-full sm:w-[600px] md:w-[728px] lg:w-[984px] xl:w-[1240px] 2xl:[1535px] px-5 sm:px-0">
            <Link href={"/"}>
              <FaHome className="text-2xl" />
            </Link>
            <LineScroll value={percentage} />
          </div>
        </nav>
        <div className="h-16" />
      </Then>
      <Else>
        <nav className="flex top-0 items-center h-16 w-full" />
        <LineScroll value={percentage} />
      </Else>
    </If>
  );
}
