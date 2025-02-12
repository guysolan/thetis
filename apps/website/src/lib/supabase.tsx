/// <reference types="vite/client" />

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing required Supabase environment variables. Please ensure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are defined in your .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
