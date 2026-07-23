import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

/** Monorepo root, resolved from this package's location. */
export const REPO_ROOT = resolve(import.meta.dirname, "../../../..");

export function repoPath(...parts: string[]): string {
  return join(REPO_ROOT, ...parts);
}

export function relToRepo(absPath: string): string {
  return relative(REPO_ROOT, absPath);
}

export function read(absPath: string): string {
  return readFileSync(absPath, "utf-8");
}

/** Recursively list files under dir matching the extension filter. */
export function walk(dir: string, extensions: string[]): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

export function exists(absPath: string): boolean {
  return existsSync(absPath) && statSync(absPath).isFile();
}
