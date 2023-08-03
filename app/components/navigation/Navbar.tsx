"use client";

import {
  ICON_CLASS_NAV,
  mainNavSection,
  pageNavSection,
  socialMediaNavSection,
} from "@constants/nav-menu";
import { matchPath } from "@functions";
import { useWindowSize } from "@hooks";
import {
  AnimationState,
  Dictionary,
  Language,
} from "@interfaces/global.interface";
import { NavField } from "@interfaces/nav.interface";
import $ from "jquery";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import { FaBars, FaSearch, FaXing } from "react-icons/fa";
import { Else, If, Then } from "react-if";
import { CrossSvg } from "../svg";
import { LineScroll } from "./LineScroll";
import { Nav } from "./Nav";
import { NavIcon } from "./NavIcon";

export const selectColorTextHover = (samePath: boolean) =>
  samePath ? "text-blue-600 rounded-xl" : "text-gray-700";

type NavbarProps = {
  dict: Dictionary;
};

const langToPath = (lang: Language | string, path: string) =>
  `/${lang}/${path}`;

export default function Navbar({ dict }: NavbarProps) {
  const pathname = usePathname() as string;
  const { language: lang } = dict;
  const PATH_NAME_WITHOUT_NAV = [
    langToPath(lang, "signout"),
    langToPath(lang, "signin"),
    langToPath(lang, "signup"),
  ];

  const isGlobalNav = useDeferredValue(
    !pathname.startsWith(langToPath(lang, "posts"))
  );
  const noNav = useDeferredValue(PATH_NAME_WITHOUT_NAV.includes(pathname));

  const isMobile = useWindowSize()[0] < 1024;

  const [isSideBarOpen, setIsSideBarOpen] = useState<AnimationState>(false);
  const openedSideBar = useDeferredValue(isSideBarOpen);

  const animationSideBar =
    openedSideBar === "idle"
      ? "animate-fade-down animate-reverse animate-duration-400"
      : openedSideBar
      ? "animate-flip-down"
      : "hidden";

  useEffect(() => {
    if (openedSideBar === "idle") {
      setTimeout(() => {
        setIsSideBarOpen(false);
      }, 800);
    }
  }, [openedSideBar]);

  const { navMenu } = dict;

  const ICON_SIDE_BAR_ANIMATION_CLASS =
    "animate-rotate-x animate-ease-in-out animate-once";

  useEffect(() => {
    if (!isMobile) setIsSideBarOpen(false);
  }, [isMobile]);

  const iconSideBarMobile = openedSideBar ? (
    <FaXing
      aria-hidden="true"
      id="icon-switch"
      className={`${ICON_CLASS_NAV} ${ICON_SIDE_BAR_ANIMATION_CLASS}`}
    />
  ) : (
    <FaBars
      aria-hidden="true"
      id="icon-switch"
      className={`${ICON_CLASS_NAV} ${ICON_SIDE_BAR_ANIMATION_CLASS}`}
    />
  );

  const createNavSectionLinkIcon = (navSection: NavField[]) => {
    return navSection.map((element) => {
      const { link, children, id, type } = element;
      const isSocial = type === "social";
      const newChildren = isSocial ? (
        <div id={id}>{children}</div>
      ) : (
        <Link href={link} id={id}>
          {children}
        </Link>
      );
      const navFielsProps = { ...element, children: newChildren };
      return (
        <NavIcon
          key={id}
          navField={navFielsProps}
          currentPath={pathname}
          onClick={() => setIsSideBarOpen(false)}
        />
      );
    });
  };

  const { language } = dict;
  const mainNavElements = createNavSectionLinkIcon(
    mainNavSection(navMenu, language as Language)
  );
  const pageNavElements = createNavSectionLinkIcon(
    pageNavSection(navMenu, language as Language)
  );
  const socialMediaNavSectionElements = createNavSectionLinkIcon(
    socialMediaNavSection
  );

  const querySection: NavField = {
    id: "query",
    label: navMenu.search?.toUpperCase(),
    link: "",
    type: "social", // avoid to have a redirection link
    children: <FaSearch className={`${ICON_CLASS_NAV} text-gray-700`} />,
  };

  const searchBarClass = isMobile
    ? "absolute -translate-x-1/2 -translate-y-1/2 pr-5 lg:pr-0"
    : "absolute -translate-y-1/2";

  const queryElement =
    pathname === "/en" ? (
      <div className="relative">
        <button
          onClick={() => $("div#search-modal").removeClass("hidden")}
          type="button"
          className={searchBarClass}
          key={querySection.id}
        >
          <NavIcon
            navField={querySection}
            currentPath={pathname}
            onClick={() => setIsSideBarOpen(false)}
          />
        </button>
      </div>
    ) : (
      <></>
    );

  // const mainElementsWithQuery = [...mainNavElements, ...[queryElement]];

  const mainNavElementsGlobal = isMobile
    ? // ? mainElementsWithQuery
      queryElement
    : [...mainNavElements, ...pageNavElements, ...[queryElement]];

  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => setFirstLoad(false), []);
  if (!isGlobalNav || noNav) return <></>; // Avoid the navbar loading at the top on the posts pages
  if (firstLoad)
    return (
      <Nav>
        <div className="w-full h-full animate-pulse animate-infinite">
          <div className="w-full h-4 bg-gray-300 rounded-lg" />
        </div>
      </Nav>
    );

  return (
    <>
      <Nav>
        <button
          id="sidebar-switch"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg lg:hidden hover:bg-slate-300 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setIsSideBarOpen(true)}
        >
          {iconSideBarMobile}
        </button>
        <div className="flex items-center">{mainNavElementsGlobal}</div>

        <If condition={isMobile}>
          <Then>
            <>
              <div
                id="drawer-navigation"
                className={`${animationSideBar} rounded-xl w-full left-0 bg-zinc-200 border border-gray-700 shadow-2xl absolute top-[0.5rem] max-h-fit z-90`}
              >
                <div className="flex justify-between py-5 px-10">
                  <h3 className="font-bold">MENU</h3>
                  <button
                    onClick={() => setIsSideBarOpen("idle")}
                    className="hover:text-red-500 p-2"
                  >
                    <CrossSvg />
                  </button>
                </div>
                <ul className="list-inside list-none">
                  {[
                    ...mainNavSection(navMenu, language as Language),
                    ...pageNavSection(navMenu, language as Language),
                  ].map((navElement) => {
                    const { id, label, link } = navElement;

                    const colorStyleClass = selectColorTextHover(
                      matchPath(link, pathname)
                    );
                    return (
                      <Link
                        key={id}
                        href={link}
                        onClick={() => setIsSideBarOpen(false)}
                      >
                        <li
                          className={`${colorStyleClass} py-2 px-10 border border-x-0 border-t-0 border-b-gray-200 last:border-b-0 first:border-t-2 first:border-t-stone-100 hover:bg-slate-300 my-1 [&:not(:last-child)]:hover:my-1 hover:last:mt-1 hover:last:rounded-b-xl`}
                        >
                          <span className="font-bold">{label}</span>
                        </li>
                      </Link>
                    );
                  })}
                  <li className={`py-2 px-10`}>
                    <div className="grid grid-cols-4">
                      {socialMediaNavSectionElements.map((element) => {
                        const { id } = element.props.navField;
                        return (
                          <div key={id} className="col-span-1">
                            {element}
                          </div>
                        );
                      })}
                    </div>
                  </li>
                </ul>
              </div>
            </>
          </Then>
          <Else>
            <div className="flex items-center">
              {socialMediaNavSectionElements}
            </div>
          </Else>
        </If>
        {!openedSideBar && <LineScroll />}
      </Nav>
    </>
  );
}
