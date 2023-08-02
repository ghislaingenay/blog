import {
  CourseTaken,
  ITSkills,
  LanguageDisplay,
  PersonalProject,
} from "@interfaces/bio.interface";
import { Dictionary } from "@interfaces/global.interface";

type BioConstants = Dictionary["bioConstants"];
type ITSkillsDictionary = BioConstants["itSkills"];
type InterestsDictionary = BioConstants["interests"];
type LanguageDictionary = BioConstants["languages"];
type ProjectsDictionary = BioConstants["projects"];
type SoftoSkiru = BioConstants["softSkills"];

export const ITSkillsList = (itSkills: ITSkillsDictionary): ITSkills[] => [
  {
    title: itSkills.frontend,
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
    title: itSkills.backend,
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
    title: itSkills.databases,
    skills: ["MySQL (SQL)", "Postgres (SQL)", "MongoDB (NoSQL)"],
  },
  {
    title: itSkills.concepts,
    skills: ["Git", "Agile", "Scrum", "TDD", "Microservices", "Monolith"],
  },
  {
    title: itSkills.softwares,
    skills: ["Git", "Microsoft Office", "JIRA", "Adobe Suite"],
  },
  {
    title: itSkills.devOps,
    skills: ["Jest", "Docker", "Kubernetes", "Github Actions", "Digital Ocean"],
  },
  { title: itSkills.dataScience, skills: ["Numpy", "Pandas"] },
];
export const softSkills = (softSkills: SoftoSkiru) =>
  Object.entries(softSkills).map(([_, value]) => value);
export const interests = (interestElements: InterestsDictionary) =>
  Object.entries(interestElements).map(([_, value]) => value);

// No need to do i18n because certificate and courses and kept only in English
export const courseListing: CourseTaken[] = [
  {
    prioritized: true,
    title: "AWS Cloud Practitioner Essentials",
    description:
      "Certificate of completion. Compute in the cloud, Infrastructure,\
  Networking, Storage & Databases, Security, Pricing.",
    link: "https://www.aws.training/Details/eLearning?id=60697",
    obtainedDate: new Date(2022, 9, 1),
    organization: "Amazon Web Services",
  },
  {
    prioritized: true,
    title: "Data Scientist with Python",
    description:
      "Certification Course - Learn Python for data science. \
     From data manipulation to machine learning! In this track, you'll learn how this versatile language allows you to import, clean, manipulate, and visualize data",
    link: "https://www.datacamp.com/tracks/data-scientist-with-python",
    obtainedDate: new Date(2023, 3, 15),
    organization: "DataCamp",
  },
  {
    prioritized: false,
    author: "Stephen Grider",
    title: "Microservices with Node JS and React",
    description:
      "Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes",
    link: "https://www.udemy.com/course/microservices-with-node-js-and-react/",
    obtainedDate: new Date(2023, 1, 11),
    organization: "Udemy",
  },
  {
    prioritized: false,
    author: "Stephen Grider",
    title: "SQL and PostgreSQL: The Complete Developer's Guide",
    description:
      "Become an expert with SQL and PostgreSQL! Store and fetch data, tune queries, and design efficient database structures!",
    link: "https://www.udemy.com/course/sql-and-postgresql",
    obtainedDate: new Date(2023, 2, 28),
    organization: "Udemy",
  },
  {
    prioritized: false,
    author: "Daniel Walter Scott",
    title: "Adobe Photoshop CC - Advanced Training Course",
    description:
      "Advanced Photoshop techniques like Photoshop retouching & Graphic Design tutorials",
    link: "https://www.udemy.com/course/adobe-photoshop-cc-advanced-training-course-tutorial/",
    obtainedDate: new Date(2021, 8, 21),
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

export const languages = (languages: LanguageDictionary): LanguageDisplay[] => [
  { language: languages["french"], level: 5 },
  { language: languages["english"], level: 4 },
  { language: languages["spanish"], level: 3 },
  { language: languages["chinese"], level: 2 },
  { language: languages["japanese"], level: 2 },
  { language: languages["thai"], level: 1 },
];

export const personalProjectsListing = (
  ProjectsDictionary: ProjectsDictionary
): PersonalProject[] => {
  const { REDIFOOD, FOOD_BACKEND, BLOG } = ProjectsDictionary;
  const REDIKeys = REDIFOOD.keyResults;
  const FOODBKeys = FOOD_BACKEND.keyResults;
  const BLOGKeys = BLOG.keyResults;
  return [
    {
      title: REDIFOOD.title,
      githubLink: "https://github.com/ghislaingenay/redifood",
      technologies: [
        "ReactJS",
        "AntDesign",
        "JavaScript",
        "HTML",
        "CSS",
        "SCSS",
        "NodeJS",
        "NestJS",
        "Postgres",
        "NextJS",
        "TypeScript",
        "CI/CD",
        "MongoDB",
        "GitHub Actions",
        "TDD",
        "Docker",
        "Kubernetes",
        "Digital Ocean",
        "Amazon Route 53",
        "React Testing Library",
        "JWT authentication",
        "REST API",
        "Git submodules",
      ],
      startDate: new Date(2023, 0, 4),
      endDate: new Date(2023, 6, 5),
      stillWorking: false,
      websiteLink: "https://rediapp.net",
      keyResults: [
        REDIKeys.properlyDeployed,
        REDIKeys.useNextJs,
        REDIKeys.useGit,
        REDIKeys.problemSolving,
        REDIKeys.cdCiPipeline,
        REDIKeys.api,
        REDIKeys.cleanCode,
        REDIKeys.testing,
        REDIKeys.auth,
        REDIKeys.codeSharing,
        REDIKeys.workflow,
      ],
    },
    {
      title: FOOD_BACKEND.title,
      technologies: ["JWT Authentication", "Python", "SQL", "Django"],
      startDate: new Date(2023, 3, 22),
      endDate: new Date(2023, 3, 26),
      stillWorking: false,
      githubLink: "https://github.com/ghislaingenay/redifood-v1-api-python",
      websiteLink: "",
      keyResults: [
        FOODBKeys.auth,
        FOODBKeys.orm,
        FOODBKeys.robustApi,
        FOODBKeys.useGit,
      ],
    },
    {
      title: BLOG.title,
      technologies: [
        "ReactJS",
        "JavaScript",
        "NextJS",
        "TypeScript",
        "HTML",
        "CSS",
        "TailwindCSS",
        "MDX",
        "Markdown",
      ],
      keyResults: [
        BLOGKeys.useNextJs,
        BLOGKeys.ui,
        BLOGKeys.i18n,
        BLOGKeys.newFeature,
      ],
      startDate: new Date(2023, 6, 22),
      endDate: null,
      stillWorking: true,
      githubLink: "https://github.com/ghislaingenay/blog",
      websiteLink: "https://ghislain.genay.rediapp.net/bio",
    },
  ];
};
