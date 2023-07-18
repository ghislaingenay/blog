"use client";

import { parseTag } from "@functions";
import { ReactNode } from "react";

type ButtonProps = React.ComponentProps<"button">;
type TagColor = "blue" | "red" | "green" | "orange" | "gray";

interface TagProps {
  children: ReactNode;
  className?: ButtonProps["className"];
  color?: TagColor;
  onTagClicked?: () => void;
}

export const Tag = ({
  children,
  className,
  onTagClicked,
  color = "blue",
}: TagProps) => {
  const colorList: Record<TagColor, string> = {
    blue: `bg-blue-600`,
    red: `bg-red-600`,
    green: `bg-green-600`,
    orange: `bg-orange-600`,
    gray: `bg-gray-600`,
  };

  const isClickable = onTagClicked ? true : false;

  const initialClasses =
    "text-white w-auto px-3 py-1 mr-1 text-xs font-medium text-bold rounded-full";
  const classes = `${initialClasses} ${className} ${colorList[color]}`;
  return (
    <button
      className={classes}
      onClick={() => onTagClicked && onTagClicked()}
      disabled={!isClickable}
    >
      {parseTag(children as string)}
    </button>
  );
};
