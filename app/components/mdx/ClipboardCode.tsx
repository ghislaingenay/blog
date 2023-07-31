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
    }, 2000);
  }, [haveText]);

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
    <div className="relative">
      <button
        className="absolute top-10 right-10 focus:outline-none p-1 active:outline-none hidden md:block "
        type="button"
        onClick={() => {
          clipText();
        }}
      >
        {clipboardIcon}
      </button>
      {children}
    </div>
  );
};
