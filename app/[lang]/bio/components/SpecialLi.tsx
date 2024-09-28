import { LiProps } from "@interfaces";

export const SpecialLi = ({ children }: LiProps) => (
  <li className="[&>*:last-child]:mb-2">{children}</li>
);
