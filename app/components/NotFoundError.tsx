import NotFoundImage from "@public/error-page.jpg";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

type NotFoundPageProps = {
  title: string;
  message: string;
  buttonText: string;
};

export default function NotFoundError({
  title,
  message,
  buttonText,
}: NotFoundPageProps) {
  return (
    <div>
      <div className="flex flex-row justify-center w-[90%] mx-auto">
        <Image
          src={NotFoundImage}
          width={500}
          height={500}
          alt="404 image"
          className="mix-blend-multiply w-full lg:w-5/12 m-0 mb-2"
        />
      </div>
      <div className="flex flex-col justify-center flex-wrap items-center">
        <h1 className="text-red-500 flex flex-1">{title}</h1>
        <p className="italic flex flex-1 my-2 text-sm">{message}</p>
      </div>
      <button className="bg-blue-800 px-4 py-1 rounded-2xl hover:bg-blue-700 block mx-auto mt-6">
        <Link
          href="/"
          className="font-bold text-white no-underline text-sm md:text-md "
        >
          <FaHome className="inline mr-2" />
          {buttonText}
        </Link>
      </button>
    </div>
  );
}
