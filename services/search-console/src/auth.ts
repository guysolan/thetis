import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleAuth } from "google-auth-library";

const READONLY = "https://www.googleapis.com/auth/webmasters.readonly";
const READWRITE = "https://www.googleapis.com/auth/webmasters";

/** Local default key (gitignored). See README. */
const DEFAULT_KEY_RELATIVE = "search-console-service-account-key.json";

const packageRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const defaultKeyPath = path.join(packageRoot, DEFAULT_KEY_RELATIVE);

export type AuthMode = "readonly" | "readwrite";

export function getScopes(mode: AuthMode): string[] {
  return mode === "readonly" ? [READONLY] : [READWRITE];
}

function resolveKeyFile(): string | undefined {
  const fromEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (fromEnv) return fromEnv;
  if (fs.existsSync(defaultKeyPath)) return defaultKeyPath;
  return undefined;
}

/**
 * Auth order: `GOOGLE_APPLICATION_CREDENTIALS`, else `./search-console-service-account-key.json`
 * in this package (gitignored), else Application Default Credentials (e.g. `gcloud auth application-default login`).
 * The service account email must be added in Search Console (Full or Owner).
 */
export function getGoogleAuth(mode: AuthMode): GoogleAuth {
  const keyFile = resolveKeyFile();
  return new GoogleAuth({
    scopes: getScopes(mode),
    ...(keyFile ? { keyFile } : {}),
  });
}
