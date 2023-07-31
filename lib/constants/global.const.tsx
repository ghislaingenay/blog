export const BLOG_DATE_FORMAT = "MMMM dd, yyyy";
export const REVALIDATION_PERIOD =
  process.env.NODE_ENV === "production" ? 86400 : 0;
