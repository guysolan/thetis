import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";

// Create a single supabase client for the app
// Note: We're not using Supabase Auth - using localStorage-based auth instead
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
