"use client";

import { usePathname } from "next/navigation";
import { useDeferredValue } from "react";
import { Else, If, Then } from "react-if";

export default function Navbar() {
  const pathname = usePathname();
  const isNavApplied = !pathname.startsWith("/posts");

  const shouldShowGlobalNavbar = useDeferredValue(isNavApplied);
  // if (!isNavApplied) return <></>; // return an arrow element non fixed to go bqck previous page router.back()
  return (
    <If condition={shouldShowGlobalNavbar}>
      <Then>
        <nav className="fixed z-10 flex bg-slate-200 top-0 items-center h-16 w-full drop-shadow-lg">
          <div className="container mx-auto">
            <p>Yes</p>
          </div>
        </nav>
        <div className="h-16" />
      </Then>
      <Else>
        <p>Non</p>
      </Else>
    </If>
  );
}
