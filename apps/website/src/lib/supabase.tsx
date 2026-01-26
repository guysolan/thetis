/// <reference types="vite/client" />

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing required Supabase environment variables. Please ensure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are defined in your .env file.",
  );
  console.error("PUBLIC_SUPABASE_URL:", supabaseUrl ? "Set" : "Missing");
  console.error(
    "PUBLIC_SUPABASE_ANON_KEY:",
    supabaseAnonKey ? "Set" : "Missing",
  );
  throw new Error(
    "Missing required Supabase environment variables. Please ensure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are defined in your .env file.",
  );
}

// Validate that the URL is pointing to the API port (54321), not Studio port (54323)
if (supabaseUrl.includes(":54323")) {
  console.error(
    "⚠️ WARNING: PUBLIC_SUPABASE_URL is pointing to Studio port (54323) instead of API port (54321).",
  );
  console.error(
    "This will cause CORS errors. Please update your .env file to use port 54321:",
  );
  console.error("PUBLIC_SUPABASE_URL=http://127.0.0.1:54321");
  console.error("Current URL:", supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
