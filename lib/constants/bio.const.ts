import {
  CourseTaken,
  ITSkills,
  LanguageDisplay,
  PersonalProject,
} from "@interfaces/bio.interface";

export const ITSkillsList: ITSkills[] = [
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
    skills: ["Jest", "Docker", "Kubernetes", "Github Actions", "Digital Ocean"],
  },
  { title: "Data science", skills: ["Numpy", "Pandas"] },
];
export const softSkills: string[] = [
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

export const interests: string[] = [
  "Coding",
  "Hiking",
  "Photoshop",
  "Language",
];

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

export const languages: LanguageDisplay[] = [
  { language: "French", level: 5 },
  { language: "English", level: 4 },
  { language: "Spanish", level: 3 },
  { language: "Chinese", level: 2 },
  { language: "Japanese", level: 2 },
  { language: "Thai", level: 1 },
];

export const personalProjectsListing: PersonalProject[] = [
  {
    title: "REDIFOOD",
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
      "Successfully deployed a full-fledged food POS system on Digital Ocean using Docker and Kubernetes",
      "Utilized NextJS and Ant Design to create intuitive user interface",
      "Implement a complete and functional CI/CD pipeline using GitHub Actions",
      "Utilized Git version control and GitHub ",
      "Demonstrated strong problem-solving skills and adaptability",
      "Implemented authentication and authorization mechanisms using JWT cookies",
      "Test React components with React Testing Library",
      "Developed robust APIs using NestJS, ensuring smooth communication between frontend and backend components",
      "Follow the clean code principle by sharing code using git submodules",
      "Implemented web application workflow from testing to deployment online",
      "Create a RESTful API with NestJS",
    ],
  },
  {
    title: "BACKEND - FOOD POS SYSTEM",
    technologies: ["JWT Authentication", "Python", "SQL", "Django"],
    startDate: new Date(2023, 3, 22),
    endDate: new Date(2023, 3, 26),
    stillWorking: false,
    githubLink: "https://github.com/ghislaingenay/redifood-v1-api-python",
    websiteLink: "",
    keyResults: [
      "Developed a robust backend API using Django's REST framework",
      "Utilized Django's ORM to interact with the database",
      "Successfully implemented user authentication and registration functionalities with JWT tokens",
      "Utilized Git version control",
    ],
  },
  {
    title: 'BLOG - "MY PORTFOLIO"',
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
      "Utilized NextJS's server-side rendering to improve SEO",
      "Utilized TailwindCSS to create a responsive and mobile-first design",
      "Future feature: add different languages, add a dark mode",
      "Future feature: add a backend using Django",
    ],
    startDate: new Date(2023, 6, 22),
    endDate: null,
    stillWorking: true,
    githubLink: undefined,
    websiteLink: "https://ghislaingenay.vercel.app",
  },
];
