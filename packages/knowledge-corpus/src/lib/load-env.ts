import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT } from "./files.ts";

const ENV_FILES = [
  join(REPO_ROOT, "packages/knowledge-corpus/.env"),
  join(REPO_ROOT, "services/thetis/.env.prod"),
  join(REPO_ROOT, "services/thetis/.env.local"),
];

function parseEnvFile(path: string): void {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const m = trimmed.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

/** Derive project URL from ref when only SUPABASE_PROJECT_ID is set. */
function deriveSupabaseUrl(): void {
  if (process.env.SUPABASE_URL) return;
  const ref = process.env.SUPABASE_PROJECT_ID ??
    readProjectRef(
      join(REPO_ROOT, "services/thetis/supabase/.temp/project-ref"),
    );
  if (ref) {
    process.env.SUPABASE_URL = `https://${ref}.supabase.co`;
  }
}

function readProjectRef(path: string): string | undefined {
  if (!existsSync(path)) return undefined;
  return readFileSync(path, "utf-8").trim() || undefined;
}

/**
 * Fetch service_role key via Supabase CLI when logged in.
 * Avoids storing the secret in a local .env file.
 */
async function fetchServiceRoleKey(): Promise<void> {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) return;

  const ref = process.env.SUPABASE_PROJECT_ID ??
    readProjectRef(
      join(REPO_ROOT, "services/thetis/supabase/.temp/project-ref"),
    );
  if (!ref) return;

  try {
    const proc = Bun.spawn(
      ["supabase", "projects", "api-keys", "--project-ref", ref, "-o", "json"],
      {
        cwd: join(REPO_ROOT, "services/thetis"),
        stdout: "pipe",
        stderr: "pipe",
      },
    );
    const stdout = await new Response(proc.stdout).text();
    await proc.exited;
    if (proc.exitCode !== 0) return;

    const match = stdout.match(/\[[\s\S]*\]/);
    if (!match) return;

    const keys = JSON.parse(match[0]) as Array<{
      name?: string;
      api_key?: string;
    }>;
    const serviceKey = keys.find((k) => k.name === "service_role");
    if (serviceKey?.api_key) {
      process.env.SUPABASE_SERVICE_ROLE_KEY = serviceKey.api_key;
    }
  } catch {
    // CLI unavailable or not logged in — caller will surface a clear error
  }
}

export async function loadEnv(): Promise<void> {
  for (const path of ENV_FILES) parseEnvFile(path);
  deriveSupabaseUrl();
  await fetchServiceRoleKey();
}
