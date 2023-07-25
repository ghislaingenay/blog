import GhislainImage from "@public/ghislain.jpg";
import Image from "next/image";

export default function Bio() {
  const ITSkills: string[] = [];
  const SoftSkills: string[] = [];
  return (
    <>
      <Image
        width={400}
        height={400}
        alt="Ghislain Genay's profile picture"
        src={GhislainImage}
        className="rounded-full border-4 border-gray-200 my-4 w-1/4 mx-auto"
      />
      <h1 className="text-center mb-1">Ghislain Genay</h1>
      <h4 className="text-center italic mt-0">Full Stack Developer</h4>
      <div className="grid grid-cols-3">
        <div className="col-span-3 sm:col-span-2"></div>
        <div className="col-span-3 sm:col-span-1"></div>
      </div>
    </>
  );
}
