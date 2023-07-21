"use client";

import { useWindowSize } from "@hooks";
import $ from "jquery";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useDeferredValue, useEffect, useState } from "react";
import {
  FaBars,
  FaEnvelope,
  FaGithub,
  FaHome,
  FaLinkedin,
  FaXing,
} from "react-icons/fa";
import { Case, Default, Switch } from "react-if";

interface NavField {
  id: string;
  type: "page" | "social" | "main"; // main is the elemment always displayed
  children: JSX.Element;
  link: string;
  label: string;
}

interface NavDisplay {
  navField: NavField;
  currentPath: string;
}

const matchPath = (link: string, currentPath: string) => {
  if (link === currentPath && link === "/") return true;
  if (link !== "/" && new RegExp(link, "gi").test(currentPath)) return true;
  return false;
};

const selectColorTextHover = (samePath: boolean) =>
  samePath ? "text-blue-600" : "text-gray-700";
const checkSocialType = (navField: NavField) => navField.type === "social";

const NavBanner = ({ navField, currentPath }: NavDisplay) => {
  const { children, label, link, id } = navField;
  const haveSamePath = matchPath(link, currentPath);
  const selectedItemClass = selectColorTextHover(haveSamePath);
  console.log({ haveSamePath, id, currentPath, selectedItemClass });
  const isSocial = checkSocialType(navField);

  if (isSocial) return <button id={navField.id}>{children}</button>;
  return (
    <li key={id}>
      <Link
        href={link}
        className={`block py-2 pl-3 pr-4 text-gray-900 text-start rounded hover:bg-gray-300 md:hover:bg-transparent md:border-0  md:p-0`}
      >
        <p className={`${selectedItemClass} m-0 p-0`}>{label}</p>
      </Link>
    </li>
  );
};

const NavIcon = ({
  navField,
  currentPath,
}: {
  navField: NavField;
  currentPath: string;
}) => {
  const { children, label, link } = navField;
  const haveSamePath = matchPath(link, currentPath);
  const selectedItemClass = selectColorTextHover(haveSamePath);
  const hiddenIfSocialPage = checkSocialType(navField) ? "hidden" : "";

  const idDisplay = `display-${navField.id}`;

  const TRIANGLE_CLASS =
    "absolute left-[1.3rem] top-[2.35rem] border-l-[7.5px] border-l-transparent border-b-[10px] border-b-slate-500 opacity-0.5 border-r-[7.5px] border-r-transparent";

  return (
    <>
      <div
        className={`${selectedItemClass} relative flex flex-wrap justify-center items-center my-auto hover:bg-slate-300 hover:bg-opacity-50 hover:rounded-xl mr-0 ml-3 md:ml-0 md:mr-3`}
        onMouseOver={() => $(`#${idDisplay}`).removeClass("hidden")}
        onMouseOut={() => $(`#${idDisplay}`).addClass("hidden")}
      >
        <div id={idDisplay} className="hidden">
          <div
            className={`${hiddenIfSocialPage} absolute w-[90%] grid top-[2.75rem] left-[0.175rem] h-6 bg-slate-500 z-40 rounded-lg`}
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
      <nav className="fixed z-10 flex bg-slate-200 top-0 items-center h-16 w-full drop-shadow-lg">
        <div className="container flex flex-wrap items-center justify-between mx-auto w-full sm:w-[600px] md:w-[728px] lg:w-[984px] xl:w-[1240px] 2xl:[1535px] px-5 sm:px-0">
          {children}
        </div>
      </nav>
      <div className="h-28" />
    </>
  );
};

const LineScroll = ({ value }: { value: number }) => (
  <div className="fixed z-10 top-[4rem] left-0 w-full h-1 scroll-smooth">
    <div className="h-full bg-black" style={{ width: `${value}%` }} />
  </div>
);

export default function Navbar() {
  const pathname = usePathname();
  const PATH_NAME_WITHOUT_NAV = ["/signout", "/signin", "/signup"];

  const shouldShowGlobalNavbar = !pathname.startsWith("/posts");
  const shouldNotShowNav = PATH_NAME_WITHOUT_NAV.includes(pathname);

  const [articleCompletion, setArticleCompletion] = useState(0);
  const isMobile = useWindowSize()[0] < 768;

  const percentage = useDeferredValue(articleCompletion);
  const isGlobalNav = useDeferredValue(shouldShowGlobalNavbar);
  const noNav = useDeferredValue(shouldNotShowNav);
  const ICON_CLASS = "text-2xl hover:opacity-70";
  const ICON_SIDE_BAR_ANIMATION_CLASS =
    "animate-rotate-x animate-ease-in-out animate-once animate-duration-300";
  const ICON_ANIMATION = "hover:animate-wiggle hover:animate-infinite";

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
    console.log(isMobile);
    if (!isMobile) setIsSideBarOpen(false);
  }, [isMobile]);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const openedSideBar = useDeferredValue(isSideBarOpen);

  const iconSideBarMobile = openedSideBar ? (
    <FaXing
      className={`${ICON_CLASS} ${ICON_SIDE_BAR_ANIMATION_CLASS}`}
      onClick={() => setIsSideBarOpen(false)}
    />
  ) : (
    <FaBars
      className={`${ICON_CLASS} ${ICON_SIDE_BAR_ANIMATION_CLASS}`}
      onClick={() => setIsSideBarOpen(true)}
    />
  );
  const hiddenClass = !openedSideBar ? "hidden" : "block";

  // left section of the navbar
  const mainNavSection: NavField[] = [
    {
      id: "home",
      type: "main",
      children: (
        <span className="my-auto p-0">
          <FaHome className={`${ICON_CLASS} ${ICON_ANIMATION}`} />
        </span>
      ),
      link: "/",
      label: "HOME",
    },
    {
      id: "contact",
      type: "main",
      children: (
        <span className="my-auto p-0">
          <FaEnvelope className={`${ICON_CLASS} ${ICON_ANIMATION}`} />
        </span>
      ),
      link: "/contact-me",
      label: "CONTACT",
    },
  ];

  const pageNavSection: NavField[] = [
    {
      id: "bio",
      type: "page",
      children: (
        <p
          className={`${ICON_ANIMATION} font-bold hover:opacity-70 text-md m-0 p-0`}
        >
          BIO
        </p>
      ),
      link: "/bio",
      label: "BIO",
    },
  ];

  // right section of the navbar
  const socialMediaNavSection: NavField[] = [
    {
      id: "github",
      type: "social",
      children: (
        <FaGithub
          className={`${ICON_CLASS} text-gray-700`}
          onClick={() =>
            window.open("https://github.com/ghislaingenay", "_blank")
          }
        />
      ),
      link: "https://github.com/ghislaingenay",
      label: "GITHUB",
    },
    {
      id: "linkedin",
      type: "social",
      children: (
        <FaLinkedin
          className={`${ICON_CLASS} text-blue-600`}
          onClick={() =>
            window.open("https://www.linkedin.com/in/ghislaingenay/", "_blank")
          }
        />
      ),
      link: "https://www.linkedin.com/in/ghislaingenay/",
      label: "LINKEDIN",
    },
  ];

  const createNavSectionLinkIcon = (navSection: NavField[]) => {
    return navSection.map((element) => {
      const { link, children, id, type } = element;
      const isSocial = type === "social";
      const newChildren = isSocial ? (
        <button id={id}>{children}</button>
      ) : (
        <Link href={link} id={id}>
          {children}
        </Link>
      );
      const navFielsProps = { ...element, children: newChildren };
      return (
        <NavIcon key={id} navField={navFielsProps} currentPath={pathname} />
      );
    });
  };

  const mainNavElements = createNavSectionLinkIcon(mainNavSection);
  const pageNavElements = createNavSectionLinkIcon(pageNavSection);
  const socialMediaNavSectionElements = createNavSectionLinkIcon(
    socialMediaNavSection
  );

  const navElementsWithoutMain = [
    ...pageNavElements,
    ...socialMediaNavSectionElements,
  ];

  return (
    <Switch>
      <Case condition={isGlobalNav}>
        <Nav>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            {iconSideBarMobile}
          </button>
          <div className="flex items-center">{mainNavElements}</div>

          <div
            className={`${hiddenClass} w-full md:block md:w-auto absolute md:static text-end md:text-center right-0 right- top-12 `}
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              {!isMobile &&
                navElementsWithoutMain.map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
              {isMobile &&
                [...pageNavSection].map((navField) => {
                  return (
                    <NavBanner
                      key={navField.id}
                      currentPath={pathname}
                      navField={navField}
                    />
                  );
                })}
              {isMobile && (
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                  {socialMediaNavSection.map((navField) => {
                    return (
                      <div key={navField.id} className="col-span-1 self-center">
                        <NavIcon navField={navField} currentPath={pathname} />
                      </div>
                    );
                  })}
                </div>
              )}
            </ul>
          </div>
        </Nav>
        <LineScroll value={percentage} />
      </Case>
      <Case condition={!isGlobalNav}></Case>
      <Case condition={noNav}></Case>
      <Default></Default>
    </Switch>
  );
}
