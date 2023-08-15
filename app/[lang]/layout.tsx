import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "@components/navigation/Navbar";
import { createMetaData } from "@functions";
import { LangProps, LayoutProps } from "@interfaces/global.interface";
import { Inter } from "next/font/google";
import "./../globals.css";
import { getDictionary } from "./dictionaries";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params: { lang } }: LangProps) {
  const dict = await getDictionary(lang);
  return createMetaData({
    title: dict.mainMetaData.title,
    description: dict.mainMetaData.description,
  });
}

// export async function generateStaticParams() {
//   if (process.env.NODE_ENV !== "production") return [];
//   return [{ lang: Language.ENGLISH }];
// }

export default async function RootLayout({
  children,
  params: { lang },
}: LayoutProps) {
  const dict = await getDictionary(lang);
  return (
    <html lang={dict.language} className="min-h-full overflow-x-hidden">
      <body className="bg-slate-50 pb-5 bg-gradient-to-b from-zinc-100 to-zinc-50">
        <UserProvider>
          <Navbar dict={dict} />
          <main className="container mx-auto sm:w-[600px] md:w-[728px] lg:w-[984px] xl:w-[1240px] 2xl:[1535px] px-5 sm:px-0 prose prose-slate prose-h1:m-0 ">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
// prose prose-sm sm:prose-md prose-slate
