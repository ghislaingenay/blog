import GhislainGenay from "@public/ghislain.jpg";
import Image from "next/image";

type UserInfoPictureProps = {
  fullName: string;
  job: string;
};

export const UserInfoPicture = ({ fullName, job }: UserInfoPictureProps) => {
  return (
    <div className="flex flex-row justify-left items-center gap-2  basis-[65%]">
      <div className="flex flex-col justify-center items-center ">
        <Image
          src={GhislainGenay}
          width={50}
          height={50}
          layout="fixed"
          className="rounded-full w-10 h-10 object-cover align-baseline "
          alt={fullName}
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="flex flex-row flex-1 text-sm font-bold">
          {fullName}
        </span>
        <span className="flex flex-1 flex-row text-xs italic">{job}</span>
      </div>
    </div>
  );
};
