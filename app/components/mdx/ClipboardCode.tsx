"use client";

import { ReactNode, useEffect, useState } from "react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import { useCopyToClipboard } from "usehooks-ts";
import { ParagraphLoading } from "../loading/components/ParagraphLoading";

type ClipboardProps = {
  children: ReactNode;
};

export const ClipboardCode = ({ children }: ClipboardProps) => {
  const [mounted, setMounted] = useState(false);
  const [value, copy] = useCopyToClipboard();
  const [haveText, setHaveText] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!haveText) return;
    setTimeout(() => {
      setHaveText(false);
    }, 5000);
  }, [haveText]);
  const text: any = children as unknown;

  const clipboardIcon = haveText ? (
    <FaClipboardCheck className="text-green-500 animate-fade animate-duration-200 text-xl" />
  ) : (
    <FaClipboard className="text-blue-400 animate-fade animation-duration-150 text-xl" />
  );

  const clipText = () => {
    const code = document.querySelector("code");
    copy(code?.textContent || "");
    setHaveText(true);
  };

  if (!mounted) return <ParagraphLoading />;
  return (
    <div className="z-[-10] hidden md:block">
      <button
        className="absolute top-10 right-10 w-"
        onClick={() => clipText()}
      >
        <div>{clipboardIcon}</div>
      </button>
      {children}
    </div>
  );
};
