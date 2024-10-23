import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

export function setupSupabaseClient() {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseKey) {
        throw new Error(
            "Supabase URL or key is not set in environment variables",
        );
    }

    return createClient(supabaseUrl, supabaseKey);
}

export const supabase = setupSupabaseClient();
