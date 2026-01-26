import { expect, test } from "@playwright/test";
import { languages } from "../src/config/languages";
import { allBaseRoutes } from "../src/content/routes";

test.describe("Route Testing", () => {
    const baseUrl = "http://localhost:2122";

    // Test 1: Simple existence check - just verify pages load without 404
    test.describe("Page Existence", () => {
        for (const language of languages) {
            test.describe(`${language.name} (${language.code})`, () => {
                for (const route of allBaseRoutes) {
                    const slug = route.slugTranslations?.[language.code] ||
                        route.slug;
                    const url = language.code === "en"
                        ? `/${slug}`
                        : `${language.dir}/${slug}`;

                    test(`should load ${url} (${route.slug})`, async ({ page }) => {
                        // Set longer timeout for complex pages
                        test.setTimeout(60000);

                        // Navigate to the page
                        await page.goto(url);

                        // Just check that the page loads (not 404)
                        await expect(page).toHaveTitle(/./); // Any title
                        await expect(page.locator("body")).toBeVisible();
                    });
                }
            });
        }
    });
});
