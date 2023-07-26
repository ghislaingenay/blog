import { LiProps } from "@interfaces/global.interface";

export const SpecialLi = ({ children }: LiProps) => (
  <li className="[&>*:last-child]:mb-2">{children}</li>
);
