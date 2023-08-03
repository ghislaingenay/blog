"use client";

import { checkSocialType, matchPath } from "@functions";
import { DivProps } from "@interfaces/global.interface";
import { NavField } from "@interfaces/nav.interface";
import { selectColorTextHover } from "./Navbar";

interface NavIconProps extends DivProps {
  navField: NavField;
  currentPath: string;
}

export const NavIcon = ({ navField, currentPath, ...props }: NavIconProps) => {
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
