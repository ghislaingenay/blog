"use client";

import { useWindowSize } from "@hooks";
import $ from "jquery";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useDeferredValue, useEffect, useState } from "react";
import { FaBars, FaGithub, FaHome, FaLinkedin, FaXing } from "react-icons/fa";
import { Case, Default, Switch } from "react-if";

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

interface NavField {
  id: string;
  type: "page" | "social";
  children: JSX.Element;
  link: string;
  label: string;
}

export default function Navbar() {
  const pathname = usePathname();

  const shouldShowGlobalNavbar = !pathname.startsWith("/posts");
  const [articleCompletion, setArticleCompletion] = useState(0);
  const isMobile = useWindowSize()[0] < 768;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const scrollTotal = scrollHeight - clientHeight;
      if (scrollTotal === 0) return setArticleCompletion(0);
      const scrollPercentage = (window.scrollY / scrollTotal) * 100;
      return setArticleCompletion(scrollPercentage);
    });
  }, []);

  const LineScroll = ({ value }: { value: number }) => (
    <div className="fixed z-10 top-[4rem] left-0 w-full h-1 scroll-smooth">
      <div className="h-full bg-black" style={{ width: `${value}%` }} />
    </div>
  );

  const percentage = useDeferredValue(articleCompletion);
  const isGlobalNav = useDeferredValue(shouldShowGlobalNavbar);
  const ICON_CLASS = "text-2xl hover:opacity-70";

  const isGlobalNavMobile = isGlobalNav && isMobile;
  const isGlobalNavDesktop = isGlobalNav && !isMobile;
  const isNavPostMobile = !isGlobalNav && isMobile;
  const isNavPostDesktop = !isGlobalNav && !isMobile;

  const [selectedNavElement, setSelectedNavElement] = useState("home");

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const target = e?.target as HTMLElement;
      const id = target ? target?.id : undefined;
      if (!id) return;
      if (id === "home" || id === "bio") {
        setSelectedNavElement(id);
        const navElement = document.getElementById(id);
        if (navElement) {
          navElement.style.color = "orange";
          navElement.style.borderBottom = "2px solid orange";
        }
      }
    });
  }, []);

  const setNavElementColor = (id: string) => {
    const navElement = document.getElementById(id);
    setSelectedNavElement(id);
    if (navElement) {
      navElement.style.color = "orange";
      navElement.style.borderBottom = "2px solid orange";
    }
  };

  const pageNavSection: NavField[] = [
    {
      id: "home",
      type: "page",
      children: (
        <span className="my-auto p-0">
          <FaHome
            className={`${ICON_CLASS}`}
            onClick={() => setNavElementColor("home")}
          />
        </span>
      ),
      link: "/",
      label: "HOME PAGE",
    },
    {
      id: "bio",
      type: "page",
      children: (
        <p
          className="font-bold hover:opacity-70 text-md m-0 p-0"
          onClick={() => setNavElementColor("bio")}
        >
          BIO
        </p>
      ),
      link: "/bio",
      label: "MY BIO",
    },
  ];

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
  // if (!isNavApplied) return <></>; // return an arrow element non fixed to go bqck previous page router.back()

  useEffect(() => {
    if (isGlobalNavDesktop) {
      [...pageNavSection].forEach(({ id }) => {
        const navElement = document.getElementById(id);
        const sameElement = id === selectedNavElement;
        if (navElement && !sameElement) {
          navElement.style.color = "black";
          navElement.style.borderBottom = "none";
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNavElement]);

  const pageNavSectionElements = pageNavSection.map(
    ({ link, children, id }) => (
      <Link href={link} key={id} id={id} className="p-5">
        {children}
      </Link>
    )
  );

  const socialMediaNavSectionElements = socialMediaNavSection.map(
    ({ children, id }) => (
      <span key={id} className="p-5">
        {children}
      </span>
    )
  );

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    if (isSideBarOpen) $("#logo-sidebar").removeClass("visible-sidebar");
    else $("#logo-sidebar").addClass("visible-sidebar");
  }, [isSideBarOpen]);
  const sideBarIcon = isSideBarOpen ? (
    <FaXing
      className={`${ICON_CLASS} z-50`}
      onClick={() => setIsSideBarOpen(false)}
    />
  ) : (
    <FaBars
      className={`${ICON_CLASS} z-50`}
      onClick={() => setIsSideBarOpen(true)}
    />
  );

  const sidebarNavElements = [
    [...pageNavSectionElements].slice(1),
    [...socialMediaNavSectionElements],
  ];

  const classNameSidebar = isSideBarOpen ? "flex" : "hidden";

  return (
    <Switch>
      <Case condition={isGlobalNav}>
        <Nav>
          <Link href="/">
            <FaHome className={ICON_CLASS} />
          </Link>

          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </Nav>
      </Case>
      <Case condition={isGlobalNavDesktop}>
        <Nav>
          <div className="grid grid-cols-2">
            <div className="flex flex-wrap justify-start items-center w-full min-h-max col-span-1 lg:hidden">
              {pageNavSectionElements}
            </div>
            <div className="flex flex-wrap items-center justify-end w-full min-h-max col-span-1">
              {socialMediaNavSection.map(({ children, id }) => (
                <span key={id} className="p-5">
                  {children}
                </span>
              ))}
            </div>
          </div>
          <LineScroll value={percentage} />
        </Nav>
      </Case>
      <Case condition={isGlobalNavMobile}>
        <Nav>
          <div className="grid grid-cols-2">
            <div className="flex flex-wrap justify-start items-center w-full min-h-max col-span-1">
              {pageNavSectionElements[0]}
            </div>
            <div className="flex flex-wrap justify-end items-center w-full min-h-max col-span-1">
              {sideBarIcon}
            </div>
          </div>
          <LineScroll value={percentage} />
        </Nav>
      </Case>
      <Case condition={isNavPostDesktop}></Case>
      <Case condition={isNavPostMobile}></Case>

      {/* <nav className="flex top-0 items-center h-16 w-full" /> */}
      {/* <LineScroll value={percentage} /> */}
      <Default></Default>
    </Switch>
  );
}
