"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isNavApplied = !pathname.startsWith("/posts");
  if (!isNavApplied) return <></>; // return an arrow element non fixed to go bqck previous page router.back()
  return (
    <nav>
      <h1>
        <Link href="/">Home page</Link>
      </h1>
    </nav>
  );
}
