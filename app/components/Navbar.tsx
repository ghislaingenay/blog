"use client";

import {
  ICON_CLASS_NAV,
  mainNavSection,
  pageNavSection,
  socialMediaNavSection,
} from "@constants/nav-menu";
import { checkSocialType, matchPath } from "@functions";
import { useWindowSize } from "@hooks";
import {
  Dictionary,
  DivProps,
  Language,
  LiProps,
} from "@interfaces/global.interface";
import { NavField } from "@interfaces/nav.interface";
import $ from "jquery";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useDeferredValue, useEffect, useState } from "react";
import { FaArrowLeft, FaBars, FaSearch, FaXing } from "react-icons/fa";
import { Case, Default, Switch } from "react-if";

const selectColorTextHover = (samePath: boolean) =>
  samePath ? "text-blue-600 ring-2 ring-blue-600 rounded-xl" : "text-gray-700";

interface NavBannerProps extends LiProps {
  navField: NavField;
  currentPath: string;
}

const NavBanner = ({ navField, currentPath, ...props }: NavBannerProps) => {
  const { children, label, link, id } = navField;
  const haveSamePath = matchPath(link, currentPath);
  const selectedItemClass = selectColorTextHover(haveSamePath);
  const isSocial = checkSocialType(navField);

  if (isSocial) return <button id={navField.id}>{children}</button>;
  return (
    <li key={id} {...props}>
      <Link
        href={link}
        className={`block pl-3  text-gray-900 text-start md:border-0`}
      >
        <p className={`${selectedItemClass} m-0 p-0`}>{label}</p>
      </Link>
    </li>
  );
};

interface NavIconProps extends DivProps {
  navField: NavField;
  currentPath: string;
}

const NavIcon = ({ navField, currentPath, ...props }: NavIconProps) => {
  const { children, label, link } = navField;
  const haveSamePath = matchPath(link, currentPath);
  const selectedItemClass = selectColorTextHover(haveSamePath);
  const hiddenIfSocialPage = checkSocialType(navField) ? "hidden" : "";

  const idDisplay = `display-${navField.id}`;

  const TRIANGLE_CLASS =
    "absolute left-[1.3rem] top-[2.75rem] border-l-[7.5px] border-l-transparent border-b-[10px] border-b-black opacity-0.5 border-r-[7.5px] border-r-transparent";

  return (
    <>
      <div
        className={`${selectedItemClass} relative z-50 flex flex-wrap justify-center items-center my-auto hover:bg-slate-300 hover:bg-opacity-50 hover:rounded-xl mr-0 ml-1 lg:ml-0 lg:mr-1`}
        onMouseOver={() => $(`#${idDisplay}`).removeClass("hidden")}
        onMouseOut={() => $(`#${idDisplay}`).addClass("hidden")}
        {...props}
      >
        <div id={idDisplay} className="hidden">
          <div
            className={`${hiddenIfSocialPage} absolute w-full grid top-[3rem] h-6 bg-black z-90 rounded-lg`}
          >
            <span className="text-[9px] font-bold text-white self-center text-center">
              {label}
            </span>
          </div>
          <div className={`${TRIANGLE_CLASS} ${hiddenIfSocialPage}`} />
        </div>
        <span className="p-4">{children}</span>
      </div>
    </>
  );
};

const Nav = ({ children }: { children: ReactNode }) => {
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

const LineScroll = ({
  value,
  top = false,
}: {
  value: number;
  top?: boolean;
}) => (
  <div
    className={`fixed ${
      top ? "z-10" : "top-[4rem] z-10"
    } left-0 w-full h-1 scroll-smooth`}
  >
    <div className="h-full bg-black z-[-10]" style={{ width: `${value}%` }} />
  </div>
);

type NavbarProps = {
  dict: Dictionary;
};

export default function Navbar({ dict }: NavbarProps) {
  const pathname = usePathname() as string;
  const PATH_NAME_WITHOUT_NAV = ["/signout", "/signin", "/signup"];
  const { language: lang } = dict;

  const shouldShowGlobalNavbar = !pathname.startsWith(`/${lang}/posts`);
  const isGlobalNav = useDeferredValue(shouldShowGlobalNavbar);

  const shouldNotShowNav = PATH_NAME_WITHOUT_NAV.includes(pathname);
  const noNav = useDeferredValue(shouldNotShowNav);

  const isMobile = useWindowSize()[0] < 1024;

  const [articleCompletion, setArticleCompletion] = useState(0);
  const percentage = useDeferredValue(articleCompletion);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const openedSideBar = useDeferredValue(isSideBarOpen);
  const hiddenClass = !openedSideBar ? "hidden" : "block";

  const [firstLoad, setFirstLoad] = useState(true);

  const { navMenu } = dict;

  const ICON_SIDE_BAR_ANIMATION_CLASS =
    "animate-rotate-x animate-ease-in-out animate-once animate-duration-300";

  useEffect(() => {
    setFirstLoad(false);
  }, []);

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

  useEffect(() => {
    if (!isMobile) setIsSideBarOpen(false);
  }, [isMobile]);

  const iconSideBarMobile = openedSideBar ? (
    <FaXing className={`${ICON_CLASS_NAV} ${ICON_SIDE_BAR_ANIMATION_CLASS}`} />
  ) : (
    <FaBars className={`${ICON_CLASS_NAV} ${ICON_SIDE_BAR_ANIMATION_CLASS}`} />
  );

  const [hasReachedText, setHasReachedText] = useState(false);
  const [titleText, setTitleText] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const titleElement = document.getElementById("title");
      if (titleElement) {
        setTitleText(titleElement.textContent || "");
        const heightTitlePixels =
          titleElement.getBoundingClientRect().height + 192;
        const hasReachedText = window.scrollY > heightTitlePixels;
        setHasReachedText(hasReachedText);
      }
    });
  }, []);

  const haveHiddenClass = hasReachedText ? "" : "hidden";

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

  const queryElement =
    pathname === "/en" ? (
      <button
        onClick={() => $("div#search-modal").removeClass("hidden")}
        type="button"
        key={querySection.id}
      >
        <NavIcon
          navField={querySection}
          currentPath={pathname}
          onClick={() => setIsSideBarOpen(false)}
        />
      </button>
    ) : (
      <></>
    );

  const mainElementsWithQuery = [...mainNavElements, ...[queryElement]];

  const mainNavElementsGlobal = isMobile
    ? mainElementsWithQuery
    : [...mainNavElements, ...pageNavElements, ...[queryElement]];

  const isTopNav = hasReachedText ? { top: false } : { top: true };

  if (firstLoad)
    return (
      <Nav>
        <div className="w-full h-full animate-pulse animate-infinite">
          <div className="w-full h-4 bg-gray-300 rounded-lg" />
        </div>
      </Nav>
    );

  return (
    <Switch>
      <Case condition={isGlobalNav}>
        <Nav>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg lg:hidden hover:bg-slate-300 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setIsSideBarOpen((prevValue) => !prevValue)}
          >
            {iconSideBarMobile}
          </button>
          <div className="flex items-center">{mainNavElementsGlobal}</div>

          {isMobile ? (
            <>
              <div
                className={`${hiddenClass} w-full lg:block lg:w-auto absolute lg:static text-end lg:text-center right-0 top-12`}
              >
                <ul className="flex flex-col sm:w-[97%] sm:mx-auto font-medium mt-4 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-transparent dark:bg-gray-800 lg:dark:bg-transparent dark:border-gray-700">
                  {[...pageNavSection(navMenu, language as Language)].map(
                    (navField) => {
                      return (
                        <div key={navField.id}>
                          <div className="my-0 md:my-2 ps-0 md:ps-[1.5%]">
                            <NavBanner
                              className=" hover:bg-gray-200 max-w-[97%] py-2 rounded-lg"
                              onClick={() => setIsSideBarOpen(false)}
                              currentPath={pathname}
                              navField={navField}
                            />
                          </div>
                          <div className="border border-spacing-1 border-gray-200 max-w-[97%] border-opacity-0.5 mx-auto" />
                        </div>
                      );
                    }
                  )}
                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                    {socialMediaNavSection.map((navField) => {
                      return (
                        <div
                          key={navField.id}
                          className="col-span-1 self-center"
                        >
                          <NavIcon
                            navField={navField}
                            currentPath={pathname}
                            onClick={() => setIsSideBarOpen(false)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                {socialMediaNavSectionElements}
              </div>
            </>
          )}
        </Nav>
        <LineScroll value={percentage} />
      </Case>
      <Case condition={!isGlobalNav}>
        <div
          id="block-nav"
          className={`${haveHiddenClass} animate-fade animate-once animate-duration-200 animate-ease-in animate-alternate`}
        >
          <Nav>
            <Link href={"/"}>
              <FaArrowLeft className="border-4 p-1 top-[50px] left-[50%] bg-slate-500  border-white text-white text-5xl rounded-full items-center" />
            </Link>
            <h2 className="m-0 mx-auto w-8/12 text-center font-bold text-lg truncate">
              {titleText}
            </h2>
          </Nav>
        </div>
        <LineScroll value={percentage} {...isTopNav} />
      </Case>
      <Case condition={noNav}></Case>
      <Default></Default>
    </Switch>
  );
}
