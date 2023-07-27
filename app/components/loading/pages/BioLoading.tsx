import { Divider } from "@app/components/styles/Divider";
import { BioLoadingCard } from "../components/BioLoadingCard";
import { TagListLoading } from "../components/TagLoading";

export const BioLoading = () => (
  <div
    role="status"
    className="animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
  >
    <svg
      className="w-10 h-10 text-gray-200 dark:text-gray-600 rounded-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
    </svg>

    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
    <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>

    <div className="grid grid-cols-3 gap-x-10">
      <div className="col-span-3 lg:col-span-2">
        <Divider>EXPERIENCE</Divider>
        <BioLoadingCard />
        <BioLoadingCard />
        <Divider>PERSONAL PROJECTS</Divider>
        <BioLoadingCard />
        <BioLoadingCard />
        <Divider>COURSES / CERTIFICATIONS</Divider>
        <BioLoadingCard />
        <BioLoadingCard />
      </div>
      <div className="col-span-3 lg:col-span-1">
        <Divider>SKILLS</Divider>
        <TagListLoading count={10} />
        <Divider>LANGUAGES</Divider>
        <div className="hiden lg:flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <Divider>INTERESTS</Divider>
        <TagListLoading count={3} />
      </div>
    </div>
  </div>
);
