"use client"; // Error components must be Client components

import { Language } from "@interfaces/global.interface";
import NotFoundImage from "@public/error-page.jpg";
import Image from "next/image";
import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  // const pathName = usePathname();

  const errorDict = {
    [Language.ENGLISH]: {
      altImage: "404 image. Image by pch.vector on Freepik",
      mainTitle: "Something went wrong!",
      subTitle: "Please try to refresh the page",
      callToAction: "Refresh",
      occuredError: "An error occurred",
    },
    [Language.FRENCH]: {
      altImage: "404 image. Image par pch.vector de Freepik",
      mainTitle: "Quelque chose vient de se passer!",
      subTitle: "Essayer de reinitializer la page",
      callToAction: "Relander la page",
      occuredError: "Une erreur est survenue",
    },
  };

  const dictionary = errorDict[Language.ENGLISH];
  // const dictionary = useMemo(() => {
  //   let path = pathName;
  //   if (pathName.startsWith("/")) path = pathName.substring(1, pathName.length);
  //   const lang = pathName.split("/")[0] as Language;
  //   return errorDict[lang];
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathName]);

  const { mainTitle, subTitle, occuredError, callToAction, altImage } =
    dictionary;

  return (
    <main className="container mx-auto sm:w-[600px] md:w-[728px] lg:w-[984px] xl:w-[1240px] 2xl:[1535px] px-5 sm:px-0 prose prose-sm sm:prose-md prose-slate prose-h1:m-0 ">
      <div className="grid relative h-full px-4 place-items-center">
        <Image
          src={NotFoundImage}
          width={500}
          alt={altImage}
          className="mix-blend-multiply w-1/2 sm:w-1/4"
        />
        <div className="text-center">
          <h1 className="my-6 text-3xl sm:text-4xl font-bold text-red-500">
            {mainTitle}
          </h1>

          <p className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {error.message || occuredError}
          </p>

          <p className="mt-4 text-gray-500">{subTitle}</p>

          <button
            className="mb-4 px-5 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-400 focus:outline-none focus:bg-red-600"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            {callToAction}
          </button>
        </div>
      </div>
    </main>
  );
}
