import NotFoundImage from "@public/error-page.jpg";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

type NotFoundPageProps = {
  title: string;
  message: string;
};

export default function NotFoundError({ title, message }: NotFoundPageProps) {
  return (
    <div>
      <div className="flex flex-row justify-center">
        <Image
          src={NotFoundImage}
          width={500}
          height={500}
          alt="404 image. Image by pch.vector on Freepik"
          className="mix-blend-multiply w-full lg:w-5/12 m-0 mb-2"
        />
      </div>
      <div className="flex flex-col justify-center flex-wrap items-center">
        <h1 className="text-red-500 flex flex-1">{title}</h1>
        <p className="italic flex flex-1 my-2 text-sm">{message}</p>
      </div>
      <button className="bg-blue-800 dark:bg-blue-100 px-4 py-1 rounded-2xl hover:bg-blue-700 dark:hover:bg-blue-200 block mx-auto mt-6">
        <Link
          href="/"
          className="font-bold text-white no-underline text-sm md:text-md dark:text-black"
        >
          <FaHome className="inline mr-2" />
          Return to Home
        </Link>
      </button>
    </div>
  );
}
