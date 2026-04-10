import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import {
  pageExists,
  sitemapLanguageFilter,
  sitemapPageFilter,
} from "./sitemap-utils";

const PAGES_DIR = path.join(process.cwd(), "src/pages");
const LOCALIZED_LANGS = ["de", "fr", "es", "it"] as const;

function filePathToUrlPath(filePath: string): string {
  const relativePath = path.relative(PAGES_DIR, filePath).replace(/\\/g, "/");

  if (relativePath === "index.astro") {
    return "/";
  }

  if (relativePath.endsWith("/index.astro")) {
    return `/${relativePath.replace(/\/index\.astro$/, "")}/`;
  }

  return `/${relativePath.replace(/\.astro$/, "")}/`;
}

function getLocalizedSitemapCounts(): Record<
  (typeof LOCALIZED_LANGS)[number],
  number
> {
  const counts = {
    de: 0,
    fr: 0,
    es: 0,
    it: 0,
  };

  for (const lang of LOCALIZED_LANGS) {
    const languageDir = path.join(PAGES_DIR, lang);
    const entries = fs.readdirSync(languageDir, {
      recursive: true,
      withFileTypes: true,
    });

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".astro")) continue;

      const parentPath = "parentPath" in entry ? entry.parentPath : languageDir;
      const filePath = path.join(parentPath, entry.name);
      const pageUrl = `https://thetismedical.com${filePathToUrlPath(filePath)}`;

      if (sitemapPageFilter(pageUrl)) {
        counts[lang] += 1;
      }
    }
  }

  return counts;
}

/**
 * Sitemap utility tests.
 */
describe("Sitemap accuracy", () => {
  it("pageExists resolves known localized pages", () => {
    expect(pageExists("/fr/attelle-rupture-tendon-achille")).toBe(true);
    expect(pageExists("/de/großhandel-bestellen")).toBe(true);
    expect(pageExists("/es/guia/semanas-13-25")).toBe(true);
    expect(pageExists("/it/guida/settimane-13-25")).toBe(true);
    expect(pageExists("/fr/nachweis")).toBe(false);
  });

  it("sitemap page filter excludes utility and legacy paths", () => {
    expect(sitemapPageFilter("https://x.com/sitemap/")).toBe(false);
    expect(sitemapPageFilter("https://x.com/de/sitemap/")).toBe(false);
    expect(sitemapPageFilter("https://x.com/fr/plan-du-site/")).toBe(false);
    expect(sitemapPageFilter("https://x.com/es/mapa-del-sitio/")).toBe(false);
    expect(sitemapPageFilter("https://x.com/it/mappa-del-sito/")).toBe(false);
    expect(sitemapPageFilter("https://x.com/old-index/")).toBe(false);
    expect(sitemapPageFilter("https://x.com/achilles-ruptures.html/")).toBe(
      false,
    );
    expect(sitemapPageFilter("https://x.com/fr/preuves/")).toBe(true);
  });

  it("sitemap language filter utility excludes non-English paths when used", () => {
    expect(sitemapLanguageFilter("https://x.com/de/evidenzbasierte-genesung"))
      .toBe(false);
    expect(sitemapLanguageFilter("https://x.com/fr/recuperation-basee-preuves"))
      .toBe(false);
    expect(sitemapLanguageFilter("https://x.com/evidence-based-recovery")).toBe(
      true,
    );
    expect(sitemapLanguageFilter("https://x.com/")).toBe(true);
  });

  it("localized sitemap counts stay aligned with the localized page tree", () => {
    expect(getLocalizedSitemapCounts()).toEqual({
      de: 36,
      fr: 35,
      es: 35,
      it: 35,
    });
  });
});
