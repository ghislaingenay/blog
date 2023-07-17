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
    <html lang="en">
      <body className="bg-slate-200 pb-10">
        <Navbar />
        <main className="container mx-auto prose prose-xl w-1/2 prose-slate">
          {/* <main className="container mx-auto min-h-screen items-center prose prose-xl prose-slate bg-slate-400"> */}
          {/* <main className="flex min-h-screen items-center prose prose-xl prose-slate mx-auto"> */}
          {children}
        </main>
      </body>
    </html>
  );
}
