import { Dictionary } from "@interfaces/global.interface";
import dayjs from "dayjs";
import { Metadata } from "next";
import { INITIAL_METADATA, MissingMetadata } from "../constants/metadata.const";

const HOUR_IN_SECONDS = 3600;
const MINUTE_IN_SECONDS = 60;
const DAY_IN_SECONDS = 86400;
const WEEK_IN_SECONDS = 604800;
const MONTH_IN_SECONDS = 2592000;
const YEAR_IN_SECONDS = 31536000;

export const createMetaData = (meta: Prettify<MissingMetadata>): Metadata => {
  return { ...meta, ...INITIAL_METADATA };
};

export const capitalize = (str: string): string =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export const parseJS = (str: string): string => {
  const containJS = /(.*)js/g.test(str);
  if (!containJS) return str;
  return `${str.replace(/js$/g, "")} js`;
};

export const parseTag = (tag: string | number): string => {
  if (typeof tag === "number") return String(tag); // could do parseTag(String(tag))
  const words = tag.split("-");
  return words.map((word) => parseJS(word).toUpperCase()).join(" ");
};
export function generateKey() {
  return Math.random().toString(36).substring(2, 9);
}

export const range = (start: number, end?: number): number[] => {
  if (end === undefined) return [...Array(start)].map((_, i) => i);
  return [...Array(end - start)].map((_, i) => i + start);
};

export const getUnique = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const formatDate = (date: Date, format: string): string =>
  dayjs(date).format(format);

export const getTimeDiffInSeconds = (date: Date): number => {
  const now = dayjs();
  const then = dayjs(date);
  return now.diff(then, "second");
};

const getConstant = (
  condition: number,
  pluralVar: string,
  singularVar: string
) => (condition > 1 ? pluralVar : singularVar);

export const getTodayDateDiffString = (
  date: Date,
  dateDict: Dictionary["date"]
) => {
  const timeDiffSecond = getTimeDiffInSeconds(date);
  const timeDiffInMinutes = Math.floor(timeDiffSecond / MINUTE_IN_SECONDS);
  const timeDiffInHours = Math.floor(timeDiffSecond / HOUR_IN_SECONDS);
  const timeDiffInDays = Math.floor(timeDiffSecond / DAY_IN_SECONDS);
  const timeDiffInMonths = Math.floor(timeDiffSecond / MONTH_IN_SECONDS);
  const timeDiffInYears = Math.floor(timeDiffSecond / YEAR_IN_SECONDS);

  type Time = "second" | "minute" | "hour" | "day" | "month" | "year";
  type TimeDictionary = Record<Time, { value: number; constant: string }>;

  const timeDictionary: TimeDictionary = {
    month: {
      value: timeDiffInMonths,
      constant: getConstant(timeDiffInMonths, dateDict.months, dateDict.month),
    },
    year: {
      value: timeDiffInYears,
      constant: getConstant(timeDiffInYears, dateDict.months, dateDict.month),
    },
    day: {
      value: timeDiffInDays,
      constant: getConstant(timeDiffInDays, dateDict.days, dateDict.day),
    },
    hour: {
      value: timeDiffInHours,
      constant: getConstant(timeDiffInHours, dateDict.hours, dateDict.hour),
    },
    minute: {
      value: timeDiffInMinutes,
      constant: getConstant(
        timeDiffInMinutes,
        dateDict.minutes,
        dateDict.minute
      ),
    },
    second: {
      value: timeDiffSecond,
      constant: getConstant(timeDiffSecond, dateDict.seconds, dateDict.second),
    },
  };

  const displayDate = (timeDiff: number, timeConst: string) => {
    const { ago, dateLanguage } = dateDict;
    const dict: Record<string, string> = {
      en: `${timeDiff} ${timeConst} ${ago}`,
      fr: `${ago} ${timeDiff} ${timeConst}`,
    };
    return dict[dateLanguage];
  };

  const time = Object.entries(timeDictionary).find(
    ([_, { value }]) => value > 0
  );
  if (!time) return displayDate(0, timeDictionary.second.constant);
  const [_, { value, constant }] = time;
  return displayDate(value, constant);
};
