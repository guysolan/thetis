/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />
/// <reference types="astro/client-image" />

interface ImportMetaEnv {
    readonly PUBLIC_SUPABASE_URL: string;
    readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
