import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ghislain Genay - Software Engineer",
  description:
    "This blog explores the world of software engineering. From frontend (NextJS, ReactJS, HTML, CSS, Javascript, UI Framework) to backend and database 5SQL and NoSQL, \
  from design to deployment, from code to production. Everything is covered. \
  The main goal is to share my knowledge and experience with the community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-full overflow-x-hidden">
      <body className="bg-slate-50 pb-5">
        <Navbar />
        <main className="container mx-auto sm:w-[600px] md:w-[728px] lg:w-[984px] xl:w-[1240px] 2xl:[1535px] px-5 sm:px-0 prose prose-sm sm:prose-md prose-slate prose-h1:m-0 ">
          {children}
        </main>
      </body>
    </html>
  );
}
// prose prose-sm sm:prose-md prose-slate
