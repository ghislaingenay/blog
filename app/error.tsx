"use client"; // Error components must be Client components

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

  return (
    <main className="container mx-auto sm:w-[600px] md:w-[728px] lg:w-[984px] xl:w-[1240px] 2xl:[1535px] px-5 sm:px-0 prose prose-sm sm:prose-md prose-slate prose-h1:m-0 ">
      <div className="grid relative h-full px-4 place-items-center">
        <Image
          src={NotFoundImage}
          width={500}
          alt="404 image. Image by pch.vector on Freepik"
          className="mix-blend-multiply w-1/2 sm:w-1/4"
        />
        <div className="text-center">
          <h1 className="my-6 text-3xl sm:text-4xl font-bold text-red-500">
            Something went wrong!
          </h1>

          <p className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {error.message || "An error occurred"}
          </p>

          <p className="mt-4 text-gray-500">Please try to refresh the page</p>

          <button
            className="mb-4 px-5 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-400 focus:outline-none focus:bg-red-600"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Refresh
          </button>
        </div>
      </div>
    </main>
  );
}
