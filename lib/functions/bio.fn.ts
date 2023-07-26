import { CourseTaken, PersonalProject } from "@interfaces/bio.interface";
import dayjs from "dayjs";

const sortCoursesByDate = (courses: CourseTaken[]) => {
  return courses.sort((a, b) => {
    return dayjs(b.obtainedDate).diff(a.obtainedDate);
  });
};

const separateProjectsByFinishedState = (projects: PersonalProject[]) => {
  return {
    finishedProjects: projects.filter(({ stillWorking }) => !stillWorking),
    onGoingProjects: projects.filter(({ stillWorking }) => stillWorking),
  };
};

const sortProjectsByEndDate = (projects: PersonalProject[]) => {
  return projects.sort((a, b) => {
    return dayjs(b.endDate).diff(a.endDate);
  });
};

const sortProjectsByStartDate = (projects: PersonalProject[]) => {
  return projects.sort((a, b) => {
    return dayjs(b.startDate).diff(a.startDate);
  });
};

export const sortProjects = (projects: PersonalProject[]) => {
  const { finishedProjects, onGoingProjects } =
    separateProjectsByFinishedState(projects);
  const sortedFinishedProjects = sortProjectsByEndDate(finishedProjects);
  const sortedOnGoingProjects = sortProjectsByStartDate(onGoingProjects);
  return [...sortedFinishedProjects, ...sortedOnGoingProjects];
};

export const sortCourses = (courses: CourseTaken[]) => {
  const prioritizedCourses = courses.filter((course) => course.prioritized);
  const nonPrioritizedCourses = courses.filter((course) => !course.prioritized);
  const finalCourses = [
    ...sortCoursesByDate(prioritizedCourses),
    ...sortCoursesByDate(nonPrioritizedCourses),
  ];
  return finalCourses;
};
