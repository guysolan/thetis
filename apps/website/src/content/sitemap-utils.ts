/**
 * Sitemap utilities - shared between astro.config.mjs and sitemap.test.ts.
 * Ensures only URLs with corresponding page files are included in the sitemap.
 */
import fs from "fs";
import path from "path";
import { generateAllRoutes } from "./routes";

const LANGUAGE_CODES = ["fr", "de", "es", "it"];
const PAGES_DIR = path.join(process.cwd(), "src/pages");

function pathToPageFile(urlPath: string): string[] {
  const segments = urlPath.replace(/^\//, "").split("/").filter(Boolean);
  if (segments.length === 0) {
    return [path.join(PAGES_DIR, "index.astro"), path.join(PAGES_DIR, "index.html.astro")];
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
 * Returns URLs that should be in the sitemap: all routes (English + translations)
 * that have corresponding page files. Excludes routes without pages to avoid 404s.
 */
export function getSitemapUrls(baseUrl = "https://thetismedical.com"): string[] {
  const allRoutes = generateAllRoutes();
  const allPages = allRoutes.map((route) => `${baseUrl}${route.href}`);

  const seen = new Set<string>();
  return allPages.filter((pageUrl) => {
    const pathname = new URL(pageUrl).pathname;
    if (seen.has(pathname)) return false;
    seen.add(pathname);
    return pageExists(pathname);
  });
}
