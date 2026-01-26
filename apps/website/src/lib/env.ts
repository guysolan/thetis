// Environment variables for cross-app linking
// In Astro, public env vars must be prefixed with PUBLIC_

export const WEBSITE_URL = import.meta.env.PUBLIC_WEBSITE_URL ||
    "https://thetismedical.com";

export const COURSE_URL = import.meta.env.PUBLIC_COURSE_URL ||
    "https://guide.thetismedical.com";
