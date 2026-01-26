// Environment variables for cross-app linking
// In Vite, public env vars must be prefixed with VITE_
// Build trigger: 2026-01-22

export const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL ||
    "https://thetismedical.com";

export const COURSE_URL = import.meta.env.VITE_COURSE_URL ||
    "https://guide.thetismedical.com";

// Supabase configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ||
    "http://127.0.0.1:54321";

// Standard local Supabase anon key (for development)
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
