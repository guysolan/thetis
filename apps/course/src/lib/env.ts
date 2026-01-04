// Environment variables for cross-app linking
// In Vite, public env vars must be prefixed with VITE_

export const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL ||
    "https://thetismedical.com";

export const COURSE_URL = import.meta.env.VITE_COURSE_URL ||
    "https://guide.thetismedical.com";
