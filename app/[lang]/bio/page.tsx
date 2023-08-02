import { Tag } from "@components/Tag";
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
import { LangProps, LiProps } from "@interfaces/global.interface";
import { sortCourses, sortProjects } from "@lib/functions/bio.fn";
import GhislainImage from "@public/ghislain.jpg";
import Image from "next/image";
import { getDictionary } from "../dictionaries";
import {
  CourseLayout,
  ExperienceLayout,
  ProjectLayout,
} from "./components/BioLayouts";
import { Rating } from "./components/Rating";

export default async function Bio({ params: { lang } }: LangProps) {
  const dict = await getDictionary(lang);
  const {
    appDirectory: { bioPage },
    bioConstants,
  } = dict;

  const globalText = bioConstants.globalText;

  const sortedCourses = sortCourses(courseListing);
  const sortedPersonalProjects = sortProjects(
    personalProjectsListing(bioConstants.projects)
  );
  const SpecialLi = ({ children }: LiProps) => (
    <li className="[&>*:last-child]:mb-2">{children}</li>
  );

  const {
    jobTitle,
    experiences: experiencePage,
    sectionName,
    summary,
  } = bioPage;

  const { HAIKU, HAUP } = experiencePage;

  const HAUPMissions = HAUP.missions;
  const HAIKUMissions = HAIKU.missions;

  const HtmlLi = ({ text }: { text: string }) => (
    <SpecialLi key={generateKey()}>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </SpecialLi>
  );

  const experiences: Experience[] = [
    {
      title: HAUP.jobTitle,
      company: HAUP.companyName,
      startDate: new Date(2022, 11, 7),
      endDate: null,
      stillWorking: true,
      missions: [
        <HtmlLi key={generateKey()} text={HAUPMissions.scalableWebApp} />,
        <HtmlLi key={generateKey()} text={HAUPMissions.jira} />,
        <HtmlLi key={generateKey()} text={HAUPMissions.cmsFeatures} />,
        <HtmlLi key={generateKey()} text={HAUPMissions.startUp} />,
        <HtmlLi key={generateKey()} text={HAUPMissions.dataAnalysis} />,
      ],
      websiteLink: "https://www.haupcar.com/",
      linkedInLink: "https://www.linkedin.com/company/haupcar-company-limited/",
      country: HAUP.country,
      city: HAUP.city,
    },
    {
      title: HAIKU.jobTitle,
      company: HAIKU.companyName,
      startDate: new Date(2022, 6, 17),
      endDate: new Date(2022, 8, 7),
      missions: [
        <HtmlLi key={generateKey()} text={HAIKUMissions.learning} />,
        <HtmlLi key={generateKey()} text={HAIKUMissions.developedWebApp} />,
      ],
      stillWorking: false,
      websiteLink: "https://www.haikuacademy.com/",
      linkedInLink: "https://www.linkedin.com/school/haikuacademy/",
      country: HAIKU.country,
      city: HAIKU.city,
    },
  ];

  return (
    <>
      <div>
        <div>
          <Image
            width={400}
            height={400}
            alt="Ghislain Genay image"
            src={GhislainImage}
            className="rounded-full border-4 border-gray-200 my-4 w-[200px] sm:w-[250px] md:w-[300px] mx-auto"
          />
        </div>
        <div>
          <h1 className="text-center mb-1">Ghislain Genay</h1>
          <h2 className="text-center italic mt-0.5">{jobTitle}</h2>
        </div>
        <p className="text-center w-full lg:w-3/4 mx-auto">{summary}</p>
      </div>
      <hr className="border-1 border-b-gray-200 my-8" />
      <div className="grid grid-cols-3 gap-x-10">
        <div className="col-span-3 lg:col-span-2">
          <Divider>{sectionName.experiences}</Divider>
          {experiences.map((experience, index) => {
            const isLastElement = index === experiences.length - 1;

            return (
              <div key={experience.title}>
                <ExperienceLayout
                  experience={experience}
                  globalText={globalText}
                />
                {!isLastElement && (
                  <hr className="border border-1 border-gray-200 my-2" />
                )}
              </div>
            );
          })}
          <Divider>{sectionName.personalProjects}</Divider>
          {sortedPersonalProjects.map((project) => (
            <ProjectLayout
              project={project}
              key={project.title}
              globalText={globalText}
            />
          ))}
          <Divider>{sectionName.courses}</Divider>
          {sortedCourses.map((course) => (
            <CourseLayout course={course} key={course.title} />
          ))}
        </div>
        <div className="col-span-3 lg:col-span-1">
          <Divider>{sectionName.skills}</Divider>
          {ITSkillsList(bioConstants.itSkills).map(({ title, skills }) => (
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
          <Divider>{sectionName.languages}</Divider>
          {languages(bioConstants.languages).map(({ language, level }) => (
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
          <Divider>{sectionName.interests}</Divider>
          <div className="flex flex-wrap gap-1">
            {interests(bioConstants.interests).map((interet) => (
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
