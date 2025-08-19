import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import {
    allBaseRoutes,
    type BaseRoute,
    generateRouteForLanguage,
    type Route,
} from "./routes";
import { type Language, languages } from "../config/languages";

// Helper function to check if a file exists
function fileExists(filePath: string): boolean {
    try {
        return fs.existsSync(filePath);
    } catch {
        return false;
    }
}

// Helper function to get all .astro files in a directory recursively
function getAstroFiles(dir: string): string[] {
    const files: string[] = [];

    try {
        const items = fs.readdirSync(dir, { withFileTypes: true });

        for (const item of items) {
            const fullPath = path.join(dir, item.name);

            if (item.isDirectory()) {
                // Skip node_modules and other non-page directories
                if (
                    !["node_modules", ".git", "dist", "build"].includes(
                        item.name,
                    )
                ) {
                    files.push(...getAstroFiles(fullPath));
                }
            } else if (item.name.endsWith(".astro")) {
                files.push(fullPath);
            }
        }
    } catch (error) {
        console.warn(`Could not read directory ${dir}:`, error);
    }

    return files;
}

// Helper function to convert file path to route slug
function filePathToSlug(filePath: string, pagesDir: string): string {
    // Remove pages directory prefix and .astro extension
    let slug = filePath
        .replace(pagesDir, "")
        .replace(/^\//, "") // Remove leading slash
        .replace(/\.astro$/, ""); // Remove .astro extension

    // Handle index.astro files
    if (slug.endsWith("/index")) {
        slug = slug.replace(/\/index$/, "");
    }

    // Handle language-specific routes (e.g., /de/aerzte -> aerzte)
    const languageCodes = languages.map((lang: Language) => lang.code);
    for (const langCode of languageCodes) {
        if (slug.startsWith(`${langCode}/`)) {
            slug = slug.substring(langCode.length + 1); // +1 for the slash
            break;
        }
    }

    return slug;
}

describe("Route Validation", () => {
    const pagesDir = path.join(process.cwd(), "src/pages");

    // Get all .astro files in the pages directory
    const astroFiles = getAstroFiles(pagesDir);

    // Convert file paths to slugs
    const existingSlugs = astroFiles.map((file) =>
        filePathToSlug(file, pagesDir)
    );

    // Generate all possible routes from routes.tsx
    const allRoutes: Route[] = [];
    for (const language of languages) {
        for (const baseRoute of allBaseRoutes) {
            allRoutes.push(generateRouteForLanguage(baseRoute, language));
        }
    }

    // Extract slugs from generated routes
    const routeSlugs = allRoutes.map((route) => {
        // Remove language prefix from href to get the slug
        let slug = route.href.replace(/^\//, "");
        const languageCodes = languages.map((lang: Language) => lang.code);
        for (const langCode of languageCodes) {
            if (slug.startsWith(`${langCode}/`)) {
                slug = slug.substring(langCode.length + 1);
                break;
            }
        }
        return slug;
    });

    // Remove duplicates and empty strings
    const uniqueRouteSlugs = [...new Set(routeSlugs)].filter((slug) =>
        slug.length > 0
    );

    describe("Route Coverage", () => {
        it("should have all route slugs covered by page files", () => {
            const missingSlugs = uniqueRouteSlugs.filter((slug) => {
                // Check if the slug exists as a file or directory
                const possibleFiles = [
                    path.join(pagesDir, `${slug}.astro`),
                    path.join(pagesDir, slug, "index.astro"),
                ];

                // Also check for language-specific versions
                for (const language of languages) {
                    if (language.code !== "en") {
                        possibleFiles.push(
                            path.join(pagesDir, language.code, `${slug}.astro`),
                            path.join(
                                pagesDir,
                                language.code,
                                slug,
                                "index.astro",
                            ),
                        );
                    }
                }

                return !possibleFiles.some((file) => fileExists(file));
            });

            if (missingSlugs.length > 0) {
                console.log("Missing page files for slugs:", missingSlugs);
                console.log(
                    "Available files:",
                    astroFiles.map((f) => f.replace(pagesDir, "")),
                );
            }

            expect(missingSlugs).toHaveLength(0);
        });

        it("should not have orphaned page files", () => {
            // Filter out common non-route files
            const routeFiles = astroFiles.filter((file) => {
                const fileName = path.basename(file, ".astro");
                // Skip common non-route files
                return !["404", "500", "sitemap", "robots"].includes(fileName);
            });

            const orphanedFiles = routeFiles.filter((file) => {
                const slug = filePathToSlug(file, pagesDir);
                return !uniqueRouteSlugs.includes(slug) && slug.length > 0;
            });

            if (orphanedFiles.length > 0) {
                console.log(
                    "Orphaned page files:",
                    orphanedFiles.map((f) => f.replace(pagesDir, "")),
                );
            }

            expect(orphanedFiles).toHaveLength(0);
        });
    });

    describe("Language-Specific Routes", () => {
        it("should have language-specific pages for all non-English routes", () => {
            const nonEnglishRoutes = allRoutes.filter((route) =>
                route.lang !== "en"
            );

            const missingLanguagePages = nonEnglishRoutes.filter((route) => {
                const slug = route.slug;
                const langCode = route.lang;
                const possibleFiles = [
                    path.join(pagesDir, langCode, `${slug}.astro`),
                    path.join(pagesDir, langCode, slug, "index.astro"),
                ];

                return !possibleFiles.some((file) => fileExists(file));
            });

            if (missingLanguagePages.length > 0) {
                console.log(
                    "Missing language-specific pages:",
                    missingLanguagePages.map((r) => `${r.lang}/${r.slug}`),
                );
            }

            expect(missingLanguagePages).toHaveLength(0);
        });
    });

    describe("Route Structure", () => {
        it("should have valid route objects", () => {
            for (const route of allRoutes) {
                expect(route).toHaveProperty("href");
                expect(route).toHaveProperty("title");
                expect(route).toHaveProperty("description");
                expect(route).toHaveProperty("lang");
                expect(route).toHaveProperty("slug");

                expect(typeof route.href).toBe("string");
                expect(typeof route.title).toBe("string");
                expect(typeof route.description).toBe("string");
                expect(typeof route.lang).toBe("string");
                expect(typeof route.slug).toBe("string");

                expect(route.href.length).toBeGreaterThan(0);
                expect(route.title.length).toBeGreaterThan(0);
                expect(route.description.length).toBeGreaterThan(0);
                expect(route.lang.length).toBeGreaterThan(0);
            }
        });

        it("should have unique hrefs", () => {
            const hrefs = allRoutes.map((route) => route.href);
            const uniqueHrefs = [...new Set(hrefs)];

            expect(hrefs.length).toBe(uniqueHrefs.length);
        });

        it("should have valid language codes", () => {
            const validLangCodes = languages.map((lang) => lang.code);

            for (const route of allRoutes) {
                expect(validLangCodes).toContain(route.lang);
            }
        });
    });

    describe("FAQ Routes", () => {
        it("should have all FAQ routes with proper structure", () => {
            const faqRoutes = allBaseRoutes.filter((route) =>
                route.slug.startsWith("FAQs/")
            );

            for (const faqRoute of faqRoutes) {
                expect(faqRoute).toHaveProperty("slugTranslations");
                expect(faqRoute.slugTranslations).toBeDefined();

                // Check that all languages have translations
                for (const language of languages) {
                    expect(faqRoute.slugTranslations![language.code])
                        .toBeDefined();
                    expect(typeof faqRoute.slugTranslations![language.code])
                        .toBe("string");
                    expect(faqRoute.slugTranslations![language.code].length)
                        .toBeGreaterThan(0);
                }
            }
        });
    });

    describe("Product Routes", () => {
        it("should have all product routes with proper structure", () => {
            const productRoutes = allBaseRoutes.filter((route) =>
                route.slug === "achilles-rupture-splint" ||
                route.slug === "reviews"
            );

            for (const productRoute of productRoutes) {
                expect(productRoute).toHaveProperty("slugTranslations");
                expect(productRoute.slugTranslations).toBeDefined();

                // Check that all languages have translations
                for (const language of languages) {
                    expect(productRoute.slugTranslations![language.code])
                        .toBeDefined();
                    expect(typeof productRoute.slugTranslations![language.code])
                        .toBe("string");
                    expect(productRoute.slugTranslations![language.code].length)
                        .toBeGreaterThan(0);
                }
            }
        });
    });
});
