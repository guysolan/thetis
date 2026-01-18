// Environment variables for cross-app linking
// In Vite, public env vars must be prefixed with VITE_

export const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL ||
    "https://thetismedical.com";

export const COURSE_URL = import.meta.env.VITE_COURSE_URL ||
    "https://guide.thetismedical.com";

// Supabase configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ||
    "http://127.0.0.1:54321";

export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH";
