"use client";
import { AnimationState } from "@interfaces/global.interface";
import useScroll from "@lib/hooks/useScroll";
import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { LineScroll } from "./LineScroll";

export const NavBarPostId = () => {
  const [hasReachedText, setHasReachedText] = useState<AnimationState>(false);
  const [titleText, setTitleText] = useState("");
  const textState = useDeferredValue(hasReachedText);

  const scrollValue = useScroll();
  const scrollDeferred = useDeferredValue(scrollValue);

  const animationClass =
    textState === "idle"
      ? "animate-fade-down animate-once animate-duration-300 animate-ease-in animate-reverse"
      : textState
      ? " animate-fade animate-once animate-duration-300 animate-ease-in animate-normal"
      : "hidden";

  useEffect(() => {}, []);

  useEffect(() => {
    const titleElement = document.getElementById("title") as HTMLHeadingElement;
    setTitleText(titleElement.innerText);
    const titleHeight = titleElement.getBoundingClientRect().height + 64 + 100;
    const titleShouldBeVisible = scrollDeferred > titleHeight;
    if (titleShouldBeVisible === textState) return;
    if (titleShouldBeVisible) setHasReachedText(true);
    else setHasReachedText("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollDeferred]);

  useEffect(() => {
    if (textState === "idle") {
      setTimeout(() => {
        setHasReachedText(false);
      }, 400);
    }
  }, [textState]);

  const isTopNav = textState ? false : true;
  return (
    <>
      <nav
        className={`${animationClass} fixed z-10 flex bg-stone-100 top-0 items-center h-16 left-0 w-screen drop-shadow-lg`}
      >
        <div className="container flex flex-wrap items-center justify-between mx-auto w-full sm:w-[600px] md:w-[728px] lg:w-[984px] xl:w-[1240px] 2xl:[1535px] px-5 sm:px-0">
          <Link href={"/"}>
            <FaArrowLeft className="border-4 p-1 top-[50px] left-[50%] bg-slate-500  border-white text-white text-5xl rounded-full items-center" />
          </Link>
          <h2 className="m-0 mx-auto w-8/12 text-center font-bold text-lg truncate">
            {titleText}
          </h2>
        </div>
        <LineScroll isTop={isTopNav} />
      </nav>
    </>
  );
};
