import {
  CourseTaken,
  Experience,
  PersonalProject,
} from "@interfaces/bio.interface";
import dayjs from "dayjs";
import {
  FaCalendarDay,
  FaGlobe,
  FaLinkedinIn,
  FaLocationArrow,
  FaStar,
} from "react-icons/fa";
import { ExternalIcon } from "../ExternalIcon";

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
    <small className="text-black">by {author}</small>
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
};
export const ExperienceLayout = ({ experience }: ExperienceLayoutProps) => {
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

  const formattedStartDate = dayjs(startDate).format(DATE_FORMAT);
  const formattedEndDate = stillWorking
    ? "PRESENT"
    : dayjs(endDate).format(DATE_FORMAT);
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
            {formattedStartDate} - {formattedEndDate}
          </small>
          <small className="text-gray-500 text-end italic flex-1 font-bold">
            <FaLocationArrow className="inline" /> {city}, {country}
          </small>
        </div>
      </div>
      <h5 className="font-bold mt-1 mb-0">Achievements/Tasks</h5>
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
};

export const ProjectLayout = ({ project }: ProjectLayoutProps) => {
  const { title, githubLink } = project;

  return (
    <>
      <h4 className="font-bold mt-2 mb-1 text-orange-950">{title}</h4>
      <span className="text-xs italic underline">{githubLink}</span>
      <p className="text-gray-500 ml-5 text-xs my-1 line-clamp-3">'hey'</p>
    </>
  );
};
