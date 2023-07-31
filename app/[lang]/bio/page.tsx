import { Divider } from "@components/styles/Divider";
import {
  ITSkillsList,
  courseListing,
  interests,
  languages,
  personalProjectsListing,
} from "@constants/bio.const";
import { generateKey } from "@functions";
import { Experience } from "@interfaces/bio.interface";
import { LiProps } from "@interfaces/global.interface";
import { sortCourses, sortProjects } from "@lib/functions/bio.fn";
import GhislainImage from "@public/ghislain.jpg";
import Image from "next/image";
import {
  CourseLayout,
  ExperienceLayout,
  ProjectLayout,
} from "./components/BioLayouts";
import { Tag } from "@components/Tag";
import { Rating } from "./components/Rating";

export default function Bio() {
  const sortedCourses = sortCourses(courseListing);
  const sortedPersonalProjects = sortProjects(personalProjectsListing);
  const SpecialLi = ({ children }: LiProps) => (
    <li className="[&>*:last-child]:mb-2">{children}</li>
  );

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

  return (
    <>
      <div>
        <div>
          <Image
            width={400}
            height={400}
            alt="Ghislain Genay's profile picture"
            src={GhislainImage}
            className="rounded-full border-4 border-gray-200 my-4 w-[200px] sm:w-[250px] md:w-[300px] mx-auto"
          />
        </div>
        <div>
          <h1 className="text-center mb-1">Ghislain Genay</h1>
          <h2 className="text-center italic mt-0.5">Full Stack Developer</h2>
        </div>
        <p className="text-center w-full lg:w-3/4 mx-auto">
          After working for 2 years as an R&D Engineer, I decided to switch
          career and become a programmer. I am currently working as a full stack
          developer where I acquired problem solving skills and clean code
          philosophy. I am currently working during my free time on my web app
          (personal blog with NextJS / Markdown) and data science skills.
        </p>
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
          <Divider>PERSONAL PROJECTS</Divider>
          {sortedPersonalProjects.map((project) => (
            <ProjectLayout project={project} key={project.title} />
          ))}
          <Divider>COURSES / CERTIFICATIONS</Divider>
          {sortedCourses.map((course) => (
            <CourseLayout course={course} key={course.title} />
          ))}
        </div>
        <div className="col-span-3 lg:col-span-1">
          <Divider>SKILLS</Divider>
          {ITSkillsList.map(({ title, skills }) => (
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