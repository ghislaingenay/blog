import { PropsWithChildren } from "react";

type Props = {
  vertical?: true | undefined;
  gap?: `${string}rem`;
};

export default function Grid({
  vertical = true,
  gap = "0.5rem",
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      style={{
        display: "grid",
        flexDirection: vertical ? "column" : "row",
        gap,
      }}
    >
      {children}
    </div>
  );
}
