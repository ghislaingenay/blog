import Image from "next/image";

type UserInfoPictureProps = {
  fullName: string;
  job?: string;
  date?: string;
  picture: string;
};

export const UserInfoPicture = ({
  fullName,
  date,
  job,
  picture,
}: UserInfoPictureProps) => {
  const definedVariable = job || date;
  return (
    <div className="flex flex-row justify-left items-center gap-2 basis-[65%] max-h-[3rem]">
      <div className="flex flex-col justify-center items-center ">
        <Image
          src={picture}
          width={50}
          height={50}
          className="rounded-full w-10 h-10 object-cover align-baseline "
          alt={`${fullName} comment picture`}
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="flex flex-row flex-1 text-sm font-bold">
          {fullName}
        </span>
        <span className="flex flex-1 flex-row text-xs italic">
          {definedVariable}
        </span>
      </div>
    </div>
  );
};
