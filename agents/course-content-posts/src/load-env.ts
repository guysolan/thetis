import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function loadEnv(): void {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const envPath = join(__dirname, "..", ".env");
  try {
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const [, key, value] = match;
        const clean = value.replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = clean;
      }
    }
  } catch {
    // Use system env
  }
}
