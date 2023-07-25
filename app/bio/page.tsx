import { ExternalIcon } from "@app/components/ExternalIcon";
import { Tag } from "@app/components/Tag";
import { LiProps } from "@interfaces/global.interface";
import GhislainImage from "@public/ghislain.jpg";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import {
  FaCalendarDay,
  FaGlobe,
  FaLinkedinIn,
  FaLocationArrow,
  FaStar,
} from "react-icons/fa";

interface Experience {
  title: string;
  company: string;
  startDate: Date;
  endDate: Date | null;
  stillWorking: boolean;
  missions: JSX.Element[];
  country: string;
  city: string;
  websiteLink: string;
  linkedInLink: string;
}

type BasicInfo =
  | "title"
  | "startDate"
  | "endDate"
  | "stillWorking"
  | "missions"
  | "websiteLink";

interface PersonalProject extends Pick<Experience, BasicInfo> {
  githubLink?: string;
}

interface CourseTaken {
  author?: string;
  prioritized: boolean;
  title: string;
  link: string;
  description: string;
  obtainedDate: Date;
  organization: string;
}

interface LanguageDisplay {
  language: string;
  level: number;
}

type ExperienceLayoutProps = {
  experience: Prettify<Experience>;
};

type CourseLayoutProps = {
  course: Prettify<CourseTaken>;
};

interface ITSkills {
  title: string;
  skills: string[];
}

export default function Bio() {
  const DATE_FORMAT = "MM-YYYY";
  const ITSkills: ITSkills[] = [
    {
      title: "Front-end",
      skills: [
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "SASS",
        "TailwindCSS",
        "ReactJS",
        "AntDesign",
        "NextJS",
      ],
    },
    {
      title: "Back-end",
      skills: [
        "JavaScript",
        "TypeScript",
        "NodeJS",
        "ExpressJS",
        "Python",
        "Django",
      ],
    },
    {
      title: "Databases",
      skills: ["MySQL (SQL)", "Postgres (SQL)", "MongoDB (NoSQL)"],
    },
    {
      title: "Concepts",
      skills: [
        "Git Version Control",
        "Agile",
        "Scrum",
        "TDD",
        "Microservices",
        "Monolith",
      ],
    },
    {
      title: "Softwares",
      skills: ["Git", "Microsoft Office", "JIRA", "Adobe Suite"],
    },
    {
      title: "DevOps",
      skills: [
        "Jest",
        "Docker",
        "Kubernetes",
        "Github Actions",
        "Digital Ocean",
      ],
    },
    { title: "Data science", skills: ["Numpy & Pandas (Python)"] },
  ];
  const softSkills: string[] = [
    "Teamwork",
    "Problem solving",
    "Adaptability",
    "Creativity",
    "Work ethic",
    "Interpersonal skills",
    "Time management",
    "Attention to detail",
    "Flexibility",
    "Self-motivation",
    "Conflict resolution",
    "Open-mindedness",
  ];

  const interests: string[] = ["Coding", "Hiking", "Photoshop", "Language"];

  const personalProjectsListing: PersonalProject[] = [];

  const courseListing: CourseTaken[] = [
    {
      prioritized: true,
      title: "AWS Cloud Practitioner Essentials",
      description:
        "Certificate of completion. Compute in the cloud, Infrastructure,\
    Networking, Storage & Databases, Security, Pricing.",
      link: "https://www.aws.training/Details/eLearning?id=60697",
      obtainedDate: new Date(2022, 10, 1),
      organization: "Amazon Web Services",
    },
    {
      prioritized: true,
      title: "Data Scientist with Python",
      description:
        "Certification Course - Learn Python for data science. \
       From data manipulation to machine learning! In this track, you'll learn how this versatile language allows you to import, clean, manipulate, and visualize data",
      link: "https://www.datacamp.com/tracks/data-scientist-with-python",
      obtainedDate: new Date(2023, 4, 15),
      organization: "DataCamp",
    },
    {
      prioritized: false,
      author: "Stephen Grider",
      title: "Microservices with Node JS and React",
      description:
        "Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes",
      link: "https://www.udemy.com/course/microservices-with-node-js-and-react/",
      obtainedDate: new Date(2023, 2, 11),
      organization: "Udemy",
    },
    {
      prioritized: false,
      author: "Stephen Grider",
      title: "SQL and PostgreSQL: The Complete Developer's Guide",
      description:
        "Become an expert with SQL and PostgreSQL! Store and fetch data, tune queries, and design efficient database structures!",
      link: "https://www.udemy.com/course/sql-and-postgresql",
      obtainedDate: new Date(2023, 3, 28),
      organization: "Udemy",
    },
    {
      prioritized: false,
      author: "Daniel Walter Scott",
      title: "Adobe Photoshop CC - Advanced Training Course",
      description:
        "Advanced Photoshop techniques like Photoshop retouching & Graphic Design tutorials",
      link: "https://www.udemy.com/course/adobe-photoshop-cc-advanced-training-course-tutorial/",
      obtainedDate: new Date(2021, 9, 21),
      organization: "Udemy",
    },
    {
      prioritized: false,
      author: "Joe Natoli",
      title: "DESIGN RULES: Principles + Practices for Great UI Design",
      description:
        "Learn to design powerful user interfaces for apps, sites and systems",
      link: "https://www.udemy.com/course/design-rules",
      obtainedDate: new Date(2022, 3, 9),
      organization: "Udemy",
    },
  ];

  const sortCourses = (courses: CourseTaken[]) => {
    const prioritizedCourses = courses.filter((course) => course.prioritized);
    const nonPrioritizedCourses = courses.filter(
      (course) => !course.prioritized
    );
    const sortCoursesByDate = (courses: CourseTaken[]) => {
      return courses.sort((a, b) => {
        return dayjs(b.obtainedDate).diff(a.obtainedDate);
      });
    };

    const finalCourses = [
      ...sortCoursesByDate(prioritizedCourses),
      ...sortCoursesByDate(nonPrioritizedCourses),
    ];
    return finalCourses;
  };

  const sortedCourses = sortCourses(courseListing);

  const languages: LanguageDisplay[] = [
    { language: "French", level: 5 },
    { language: "English", level: 4 },
    { language: "Spanish", level: 3 },
    { language: "Chinese", level: 2 },
    { language: "Japanese", level: 2 },
    { language: "Thai", level: 1 },
  ];
  const SpecialLi = ({ children }: LiProps) => (
    <li className="[&>*:last-child]:mb-2">{children}</li>
  );

  const Divider = ({ children }: { children?: React.ReactNode }) => {
    return (
      <>
        {children ? (
          <div className="flex flex-row  gap-x-2 items-center my-2">
            <hr className="flex flex-auto border-black border-1 m-0 box-border my-auto" />
            <h5 className="flex flex-shrink justify-center font-bold text-base">
              {children}
            </h5>
            <hr className="flex flex-auto border-black border-1 m-0 box-border my-auto" />
          </div>
        ) : (
          <hr className=" border-black border-1 m-0 my-2" />
        )}
      </>
    );
  };
  function generateKey() {
    return Math.random().toString(36).substring(2, 9);
  }

  const Rating = ({ level }: { level: number }) => {
    let range = [];
    for (let i = 0; i < 5; i++) range.push(i);
    const validStar = (
      <svg
        className="w-4 h-4 text-yellow-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    );
    const emptyStar = (
      <svg
        className="w-4 h-4 text-gray-300 dark:text-gray-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    );
    const validStarCount = 5 - (5 - level);

    return (
      <div className="flex items-center space-x-1">
        {range.map((index) => {
          if (index < validStarCount) {
            return (
              <svg
                key={generateKey()}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            );
          } else {
            return (
              <svg
                key={generateKey()}
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            );
          }
        })}
      </div>
    );
  };

  const experiences: Experience[] = [
    {
      title: "Associate Full Stack Developer",
      company: "HAUP",
      startDate: new Date(2022, 11, 7),
      endDate: null,
      stillWorking: true,
      missions: [
        <SpecialLi key={generateKey()}>
          Developing scalable <strong>full-stack web applications</strong> using{" "}
          <em>
            JavaScript / TypeScript / HTML / CSS / ReactJS / AntDesign / NextJS
            / NodeJS / SQL (MySQL) and NoSQL (MongoDB)
          </em>
        </SpecialLi>,
        <SpecialLi key={generateKey()}>
          <strong>Collaboration</strong> with other developers in complex
          projects using Agile Methodologies and{" "}
          <strong>Git version control</strong> <em>(JIRA, Bitbucket)</em>
        </SpecialLi>,
        <SpecialLi key={generateKey()}>
          Creation of new features in Control Management System application
          using <strong>RESTful APIs</strong>{" "}
          <em>(e.g. message, email templates, reservation, logging system)</em>
        </SpecialLi>,
        <SpecialLi key={generateKey()}>
          Working in a <strong>start-up</strong> environment
        </SpecialLi>,
        <SpecialLi key={generateKey()}>
          Carried out <strong>data scraping</strong> and{" "}
          <strong>machine learning</strong> projects (recover data from website
          and verify car pictures with AI models)
        </SpecialLi>,
      ],
      websiteLink: "https://www.haupcar.com/",
      linkedInLink: "https://www.linkedin.com/company/haupcar-company-limited/",
      country: "Thailand",
      city: "Bangkok",
    },
    {
      title: "Full Stack Developer - Bootcamp",
      company: "Haiku Academy",
      startDate: new Date(2022, 6, 17),
      endDate: new Date(2022, 8, 7),
      missions: [
        <SpecialLi key={generateKey()}>
          7 weeks (280 hours) of intensive{" "}
          <strong>training on full-stack JavaScript development</strong>{" "}
          (front-end, back-end, database).
        </SpecialLi>,
        <SpecialLi key={generateKey()}>
          Developed web applications using technologies including
          <em>
            JavaScript / CSS3 / Bootstrap / HTML5 / Handlebars / Node.js /
            Express / MongoDB / ReactJS / Git
          </em>
        </SpecialLi>,
      ],
      stillWorking: false,
      websiteLink: "https://www.haikuacademy.com/",
      linkedInLink: "https://www.linkedin.com/school/haikuacademy/",
      country: "Thailand",
      city: "Koh Phangan",
    },
  ];

  const CourseLayout = ({ course }: CourseLayoutProps) => {
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

  const ExperienceLayout = ({ experience }: ExperienceLayoutProps) => {
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

  return (
    <>
      <div>
        <div>
          <Image
            width={400}
            height={400}
            alt="Ghislain Genay's profile picture"
            src={GhislainImage}
            className="rounded-full border-4 border-gray-200 my-4 w-1/4 mx-auto"
          />
        </div>
        <div>
          <h1 className="text-center mb-1">Ghislain Genay</h1>
          <h2 className="text-center italic mt-0">Full Stack Developer</h2>
        </div>
      </div>
      <hr className="border-1 border-b-gray-200 my-8" />
      <div className="grid grid-cols-3 gap-x-10">
        <div className="col-span-3 lg:col-span-2">
          <Divider>EXPERIENCE</Divider>
          {experiences.map((experience, index) => {
            const isLastElement = index === experiences.length - 1;

            return (
              <div key={experience.title}>
                <ExperienceLayout experience={experience} />
                {!isLastElement && (
                  <hr className="border border-1 border-gray-200 my-2" />
                )}
              </div>
            );
          })}
          <Divider>COURSES / CERTIFICATIONS</Divider>
          {sortedCourses.map((course) => (
            <CourseLayout course={course} key={course.title} />
          ))}
        </div>
        <div className="col-span-3 lg:col-span-1">
          <Divider>SKILLS</Divider>
          {ITSkills.map(({ title, skills }) => (
            <div key={title}>
              <h5 className="font-bold my-1 text-center text-black">{title}</h5>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <Tag color="black" className="flex" key={skill}>
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
          <Divider>LANGUAGES</Divider>
          {languages.map(({ language, level }) => (
            <div
              className="flex flow-col justify-between items-center gap-"
              key={language}
            >
              <p className="flex flex-1 my-2 font-bold">
                {language.toUpperCase()}
              </p>
              <div className="flex flex-3 items-end">
                <Rating level={level} />
              </div>
            </div>
          ))}
          <Divider>INTERESTS</Divider>
          <div className="flex flex-wrap gap-1">
            {interests.map((interet) => (
              <Tag color="gray" className="flex" key={interet}>
                {interet}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
