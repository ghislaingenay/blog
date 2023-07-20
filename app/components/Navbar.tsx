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
        <div className="container mx-auto w-full sm:w-[600px] md:w-[728px] lg:w-[984px] xl:w-[1240px] 2xl:[1535px] px-5 sm:px-0">
          {children}
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
};

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

  const pageNavSection = [
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
    },
  ];

  const socialMediaNavSection = [
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
      <Case condition={isGlobalNavDesktop}>
        <Nav>
          <div className="grid grid-cols-2">
            <div className="flex flex-wrap justify-start items-center w-full min-h-max col-span-1">
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
