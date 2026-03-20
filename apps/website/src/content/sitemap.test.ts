import { describe, expect, it } from "vitest";
import { getSitemapUrls, pageExists, sitemapLanguageFilter } from "./sitemap-utils";

/**
 * Sitemap accuracy tests - ensure every URL in the sitemap has a corresponding page file.
 * Uses the same getSitemapUrls() as astro.config.mjs.
 */
const baseUrl = "https://thetismedical.com";

describe("Sitemap accuracy", () => {
  const sitemapUrls = getSitemapUrls(baseUrl);

  it("every sitemap URL should have a corresponding page file", () => {
    const pathnames = sitemapUrls.map((url) => new URL(url).pathname);
    const missingPages = pathnames.filter((p) => !pageExists(p));

    if (missingPages.length > 0) {
      console.error("Sitemap URLs without page files (would 404):", missingPages);
    }

    expect(missingPages).toHaveLength(0);
  });

  it("sitemap should not include duplicate URLs", () => {
    const pathnames = sitemapUrls.map((url) => new URL(url).pathname);
    const unique = new Set(pathnames);
    expect(pathnames.length).toBe(unique.size);
  });

  it("sitemap URLs should be valid", () => {
    for (const url of sitemapUrls) {
      expect(() => new URL(url)).not.toThrow();
      expect(url.startsWith(baseUrl)).toBe(true);
      const pathname = new URL(url).pathname;
      expect(pathname.startsWith("/")).toBe(true);
    }
  });

  it("sitemap should include translations when pages exist", () => {
    const pathnames = sitemapUrls.map((url) => new URL(url).pathname);
    const hasTranslations = pathnames.some((p) =>
      ["de", "fr", "es", "it"].includes(p.split("/").filter(Boolean)[0] ?? ""),
    );
    expect(hasTranslations).toBe(true);
  });

  it("sitemap language filter utility excludes non-English paths when used", () => {
    expect(sitemapLanguageFilter("https://x.com/de/evidenzbasierte-genesung")).toBe(false);
    expect(sitemapLanguageFilter("https://x.com/fr/recuperation-basee-preuves")).toBe(false);
    expect(sitemapLanguageFilter("https://x.com/evidence-based-recovery")).toBe(true);
    expect(sitemapLanguageFilter("https://x.com/")).toBe(true);
  });
});
