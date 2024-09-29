"use client";

import { socialMediaNavSection } from "@constants/nav-menu";
import Link from "next/link";
const ICON_CLASS_NAV = "text-2xl hover:opacity-70";

export default function HomeNavbar() {
  return (
    <header>
      <nav className="flex gap-4 items-center">
        <span className="flex-shrink text-5xl">R</span>
        <span className="flex-grow">
          <ul className="flex gap-4">
            <li className="hover:font-bold w-16 text-center">
              <Link className="no-underline hover:font-bold" href={`/en/`}>
                Blog
              </Link>
            </li>
            <li className="w-16 text-center">
              <Link className="no-underline hover:font-bold" href={`/en/posts`}>
                Blog
              </Link>
            </li>
            <li className="w-16 text-center hover:font-bold">
              <Link
                className="no-underline hover:font-bold"
                href={`#contact-me`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </span>
        <div className="flex gap-4">
          {socialMediaNavSection.map((social) => (
            <span title={social.label} key={social.id}>
              {social.children}
            </span>
          ))}
        </div>
      </nav>
    </header>
  );
}

type User = {
  role: "ADMIN" | "USER";
  email: string;
  permissions: {
    canView: boolean;
  };
};

const haveAccess = (user: User | null) => {
  if (user) {
    if (user.role === "ADMIN") {
      if (user.permissions.canView) {
        console.log("ACCESS: admin can read");
      } else {
        console.log("NO ACCESS: admin cannot read");
      }
    } else {
      console.log("NO ACCESS: user is not admin");
    }
  } else {
    console.log("NO ACCESS: no user found");
  }
};

const canAccess = (user: User | null) => {
  if (!user) return console.log("NO ACCESS: no user found");
  if (user.role !== "ADMIN") return console.log("NO ACCESS: user is not admin");
  if (!user.permissions.canView) {
    return console.log("NO ACCESS: admin cannot read");
  }
  console.log("ACCESS: admin can read");
};

console.log("HomeNavbar.tsx", haveAccess);
