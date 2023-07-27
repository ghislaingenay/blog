import { parseTag } from "@functions";
import Link from "next/link";
import React, { ReactNode } from "react";

type ButtonProps = React.ComponentProps<"button">;
type TagColor = "blue" | "red" | "green" | "orange" | "gray" | "black";

export interface TagProps {
  children: ReactNode;
  className?: ButtonProps["className"];
  link?: string;
  color?: Prettify<TagColor>;
}

export const Tag = ({
  children,
  className,
  link = undefined,
  color = "blue",
}: TagProps) => {
  const colorList: Record<TagColor, string> = {
    blue: `bg-blue-800`,
    red: `bg-red-800`,
    green: `bg-green-800`,
    orange: `bg-orange-600`,
    gray: `bg-black opacity-70`,
    black: `bg-black`,
  };

  const linkUrl = link ? link : "";
  const isClickable = link && link ? true : false;

  const initialClasses: ButtonProps["className"] =
    "text-white w-auto px-3 py-1 mr-1 text-xs font-medium text-bold rounded-full text-xs sm:text-sm";
  const classes = `${initialClasses} ${className} ${colorList[color]}`;

  const ButtonTag = ({ children }: { children: ReactNode }) => (
    <button className={classes} disabled={!isClickable}>
      {parseTag(children as string)}
    </button>
  );

  if (isClickable) {
    return (
      <Link href={linkUrl} style={{ textDecoration: "none" }}>
        <ButtonTag>{children}</ButtonTag>
      </Link>
    );
  } else {
    return <ButtonTag>{children}</ButtonTag>;
  }
};

export const TopicTag = ({ children }: { children: ReactNode }) => {
  const removeHyphensCharacter = (text: string) =>
    text.replaceAll(/[-_]/gi, " ");
  return (
    <Tag color="orange" className="font-bold text-base text-orange-200">
      {removeHyphensCharacter(children as string)}
    </Tag>
  );
};
