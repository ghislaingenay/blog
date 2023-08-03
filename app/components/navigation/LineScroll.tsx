"use client";

import { useDeferredValue, useEffect, useState } from "react";

type LineScrollProps = {
  isTop?: boolean;
};

export const LineScroll = ({ isTop = false }: LineScrollProps) => {
  const [articleCompletion, setArticleCompletion] = useState(0);
  const percentage = useDeferredValue(articleCompletion);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollTotal = scrollHeight - clientHeight;
      const userCanScrollPage = (scrollTotal: number) => scrollTotal > 0;
      if (!userCanScrollPage(scrollTotal)) return setArticleCompletion(0);
      const scrollPercentage = (window.scrollY / scrollTotal) * 100;
      return setArticleCompletion(scrollPercentage);
    });
  }, []);

  return (
    <div
      className={`fixed ${
        isTop ? "z-0" : "top-[4rem] z-10"
      } left-0 w-full h-1 scroll-smooth`}
    >
      <div
        className="h-full bg-black z-[-10]"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
