export interface Experience {
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

export type BasicInfo =
  | "title"
  | "startDate"
  | "endDate"
  | "stillWorking"
  | "missions"
  | "websiteLink";

export interface PersonalProject extends Pick<Experience, BasicInfo> {
  githubLink?: string;
  technologies: string[];
}

export interface CourseTaken {
  author?: string;
  prioritized: boolean;
  title: string;
  link: string;
  description: string;
  obtainedDate: Date;
  organization: string;
}

export interface LanguageDisplay {
  language: string;
  level: number;
}

export interface ITSkills {
  title: string;
  skills: string[];
}
