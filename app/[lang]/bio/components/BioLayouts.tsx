import { ExternalIcon } from "@components/ExternalIcon";
import { Tag } from "@components/Tag";
import {
  CourseTaken,
  Experience,
  PersonalProject,
} from "@interfaces/bio.interface";
import { Dictionary } from "@interfaces/global.interface";
import { getFormattedPeriodDate } from "@lib/functions/bio.fn";
import dayjs from "dayjs";
import {
  FaCalendarDay,
  FaGithub,
  FaGlobe,
  FaLinkedinIn,
  FaLocationArrow,
  FaStar,
} from "react-icons/fa";

type GlobalTextBio = Dictionary["bioConstants"]["globalText"];

type CourseLayoutProps = {
  course: Prettify<CourseTaken>;
};

const DATE_FORMAT = "MM-YYYY";

export const CourseLayout = ({ course }: CourseLayoutProps) => {
  const { title, description, obtainedDate, organization, author } = course;
  const formattedObtainedDate = dayjs(obtainedDate).format(DATE_FORMAT);
  const isPrioritized = course.prioritized;
  const prioritizedIcon = isPrioritized ? (
    <FaStar className="inline pb-1 mr-1" />
  ) : (
    <></>
  );

  const authorDisplay = author ? (
    <small className="text-black">({author})</small>
  ) : (
    <></>
  );
  return (
    <>
      <h4 className="font-bold mt-2 mb-1 text-orange-950">
        {prioritizedIcon}
        {title} {authorDisplay}
      </h4>
      {/* <span className="text-xs italic underline">{link}</span> */}
      <div className="pl-5 mt-1">
        <div className="flex flex-row gap-x-2 items-center">
          <small className="text-gray-500 flex-1 font-bold">
            {organization.toUpperCase()}
          </small>
          <small className="text-gray-500 text-end italic flex-1 font-bold">
            <FaCalendarDay className="inline" /> {formattedObtainedDate}
          </small>
        </div>
        <p className="text-gray-500 ml-5 text-xs my-1 line-clamp-3">
          {description}
        </p>
      </div>
    </>
  );
};

////////////////////////////////////////////////////////////////////////////////
type ExperienceLayoutProps = {
  experience: Prettify<Experience>;
  globalText: GlobalTextBio;
};
export const ExperienceLayout = ({
  experience,
  globalText,
}: ExperienceLayoutProps) => {
  const {
    title,
    company,
    city,
    country,
    stillWorking,
    startDate,
    endDate,
    websiteLink,
    linkedInLink,
    missions,
  } = experience;

  const formattedDate = getFormattedPeriodDate(
    startDate,
    endDate,
    stillWorking
  );
  return (
    <>
      <h3 className="font-bold my-2 text-black">{title}</h3>
      <div className="pl-5">
        <h4 className="mb-1 mt-0 text-blue-950">
          {company?.toUpperCase()}{" "}
          <ExternalIcon link={linkedInLink}>
            <FaLinkedinIn />
          </ExternalIcon>
          <ExternalIcon link={websiteLink}>
            <FaGlobe />
          </ExternalIcon>
        </h4>
        <div className="flex flex-row gap-x-2 items-center">
          <small className="text-gray-500 italic flex-1 font-bold">
            {formattedDate}
          </small>
          <small className="text-gray-500 text-end italic flex-1 font-bold">
            <FaLocationArrow className="inline" /> {city}, {country}
          </small>
        </div>
      </div>
      <h5 className="font-bold mt-1 mb-0">{globalText.achievements}</h5>
      <ul className="list-disc mt-0">
        {missions.map((mission, index) => (
          <div key={`${websiteLink}+${index}`}>{mission}</div>
        ))}
      </ul>
    </>
  );
};

//////////////////////////////////////////////////////////////////////////

type ProjectLayoutProps = {
  project: Prettify<PersonalProject>;
  globalText: GlobalTextBio;
};

export const ProjectLayout = ({ project, globalText }: ProjectLayoutProps) => {
  const {
    title,
    githubLink,
    keyResults,
    technologies,
    startDate,
    endDate,
    stillWorking,
    websiteLink,
  } = project;

  const showGitHubLink = githubLink ? (
    <ExternalIcon link={githubLink}>
      <FaGithub />
    </ExternalIcon>
  ) : (
    <></>
  );
  const showWebsiteLink =
    websiteLink !== "" ? (
      <ExternalIcon link={websiteLink}>
        <FaGlobe />
      </ExternalIcon>
    ) : (
      <></>
    );

  const formattedDate = getFormattedPeriodDate(
    startDate,
    endDate,
    stillWorking
  );

  return (
    <>
      <h3 className="font-bold my-2 text-black">{title}</h3>
      <div className="pl-5">
        <div className="flex flex-row gap-x-2 items-center">
          <small className="text-gray-500 italic flex-1 font-bold">
            {formattedDate}
          </small>
          <span className="text-black text-end italic flex-1 font-bold text-xl">
            {showGitHubLink}
            {showWebsiteLink}
          </span>
        </div>
      </div>
      <h5 className="font-bold my-1">{globalText.skills}</h5>
      <div className="flex flex-wrap gap-1">
        {technologies.map((technology) => (
          <Tag color="green" className="flex" key={technology}>
            {technology}
          </Tag>
        ))}
      </div>
      <h5 className="font-bold my-1">{globalText.keyResults}</h5>
      <ul className="list-disc mt-0">
        {keyResults.map((keyResult, index) => (
          <li key={`${websiteLink}+${index}`} className="text-xs mb-2">
            {keyResult}
          </li>
        ))}
      </ul>
    </>
  );
};
