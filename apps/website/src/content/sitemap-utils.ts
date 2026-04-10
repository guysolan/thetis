/**
 * Sitemap utilities shared between astro.config.mjs and sitemap tests.
 */
import fs from "fs";
import path from "path";

const LANGUAGE_CODES = ["fr", "de", "es", "it"];
const PAGES_DIR = path.join(process.cwd(), "src/pages");
const EXCLUDED_SITEMAP_SEGMENTS = new Set([
  "sitemap",
  "plan-du-site",
  "mapa-del-sitio",
  "mappa-del-sito",
]);
const EXCLUDED_EXACT_PATHS = new Set(["/old-index"]);

function pathToPageFile(urlPath: string): string[] {
  const segments = urlPath.replace(/^\//, "").split("/").filter(Boolean);
  if (segments.length === 0) {
    return [
      path.join(PAGES_DIR, "index.astro"),
      path.join(PAGES_DIR, "index.html.astro"),
    ];
  }

  const candidates: string[] = [];
  const slug = segments.join("/");

  candidates.push(path.join(PAGES_DIR, `${slug}.astro`));
  candidates.push(path.join(PAGES_DIR, slug, "index.astro"));

  if (LANGUAGE_CODES.includes(segments[0])) {
    const langSlug = segments.slice(1).join("/");
    candidates.push(path.join(PAGES_DIR, segments[0], `${langSlug}.astro`));
    candidates.push(path.join(PAGES_DIR, segments[0], langSlug, "index.astro"));
  }

  return candidates;
}

export function pageExists(urlPath: string): boolean {
  const candidates = pathToPageFile(urlPath);
  return candidates.some((file) => fs.existsSync(file));
}

/** Exclude URLs whose first path segment is a language code. Used when we want English-only. */
export function sitemapLanguageFilter(pageUrl: string): boolean {
  try {
    const pathname = new URL(pageUrl).pathname;
    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    return !firstSegment || !LANGUAGE_CODES.includes(firstSegment);
  } catch {
    return true;
  }
}

/**
 * Filters out utility/legacy pages that should not appear in the XML sitemap.
 * Astro already discovers static routes for us, so this filter is safer than
 * generating a second list from route metadata that can drift from real files.
 */
export function sitemapPageFilter(pageUrl: string): boolean {
  try {
    const pathname = new URL(pageUrl).pathname;
    const normalizedPath = pathname.replace(/\/$/, "") || "/";
    const segments = normalizedPath.split("/").filter(Boolean);
    const lastSegment = segments.at(-1);

    if (EXCLUDED_EXACT_PATHS.has(normalizedPath)) {
      return false;
    }

    if (lastSegment && EXCLUDED_SITEMAP_SEGMENTS.has(lastSegment)) {
      return false;
    }

    if (normalizedPath.endsWith(".html")) {
      return false;
    }

    return true;
  } catch {
    return true;
  }
}
