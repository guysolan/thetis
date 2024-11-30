import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = import.meta.env.PUBLIC_SUPABASE_URL!
const supabaseKey: string = import.meta.env.PUBLIC_SUPABASE_API_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
