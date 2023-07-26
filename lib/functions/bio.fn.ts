import { CourseTaken } from "@interfaces/bio.interface";
import dayjs from "dayjs";

export const sortCoursesByDate = (courses: CourseTaken[]) => {
  return courses.sort((a, b) => {
    return dayjs(b.obtainedDate).diff(a.obtainedDate);
  });
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
