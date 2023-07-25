"use client";
import { ButtonProps } from "@interfaces/global.interface";
import { useDeferredValue, useEffect, useState } from "react";

interface ExternalIconProps extends ButtonProps {
  link: string;
}

export const ExternalIcon = ({ link, children }: ExternalIconProps) => {
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  useEffect(() => {
    setIsComponentMounted(true); // This ensures that the window is defined in order to use window.open
  }, []);

  const mounted = useDeferredValue(isComponentMounted);

  return (
    <>
      {mounted ? (
        <button className="mx-1" onClick={() => window.open(link, "_blank")}>
          {children}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};
