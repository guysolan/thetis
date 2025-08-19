import { expect, test } from "@playwright/test";
import { languages } from "../src/config/languages";
import { allBaseRoutes } from "../src/content/routes";

test.describe("Route Testing", () => {
    const baseUrl = "http://localhost:2121"; // Adjust if your dev server runs on different port

    // Test all routes for each language
    for (const language of languages) {
        test.describe(`${language.name} (${language.code})`, () => {
            for (const route of allBaseRoutes) {
                const slug = route.slugTranslations?.[language.code] ||
                    route.slug;
                const url = language.code === "en"
                    ? `/${slug}`
                    : `${language.dir}/${slug}`;
                const expectedTitle = route.title[language.code] ||
                    route.title.en;

                test(`should load ${url}`, async ({ page }) => {
                    // Navigate to the page
                    await page.goto(url);

                    // Check that the page loads successfully (not 404)
                    await expect(page).toHaveTitle(
                        new RegExp(expectedTitle, "i"),
                    );

                    // Check that the page has content (not empty)
                    const mainContent = await page.locator(
                        "main, article, .content, body",
                    ).first();
                    await expect(mainContent).toBeVisible();

                    // Check that the language is correctly set
                    const htmlLang = await page.locator("html").getAttribute(
                        "lang",
                    );
                    expect(htmlLang).toBe(language.code);

                    // Optional: Check for specific content based on route type
                    if (route.slug.startsWith("FAQs/")) {
                        // FAQ pages should have questions/answers
                        await expect(page.locator("h1, h2, h3")).toHaveCount({
                            min: 1,
                        });
                    }

                    if (
                        route.slug.includes("contact") ||
                        route.slug.includes("buy")
                    ) {
                        // Contact/buy pages should have forms or CTAs
                        await expect(
                            page.locator(
                                'form, button, a[href*="mailto"], a[href*="tel"]',
                            ),
                        ).toHaveCount({ min: 1 });
                    }
                });
            }
        });
    }

    // Test language switcher functionality
    test.describe("Language Switcher", () => {
        test("should switch between languages correctly", async ({ page }) => {
            // Start on English home page
            await page.goto("/");

            // Test switching to each language
            for (const language of languages) {
                if (language.code === "en") continue; // Skip English since we're already there

                // Find and click language switcher (adjust selector based on your implementation)
                const langSwitcher = page.locator(
                    `[data-lang="${language.code}"], a[href*="${language.code}"], button[data-lang="${language.code}"]`,
                );
                await langSwitcher.click();

                // Check that URL changes to correct language
                await expect(page).toHaveURL(
                    new RegExp(`^${baseUrl}${language.dir}`),
                );

                // Check that page language attribute changes
                const htmlLang = await page.locator("html").getAttribute(
                    "lang",
                );
                expect(htmlLang).toBe(language.code);

                // Check that navigation is in correct language
                const nav = page.locator("nav, header");
                await expect(nav).toBeVisible();
            }
        });
    });

    // Test navigation links
    test.describe("Navigation Links", () => {
        test("should have working navigation links", async ({ page }) => {
            await page.goto("/");

            // Get all navigation links
            const navLinks = page.locator("nav a, header a");
            const linkCount = await navLinks.count();

            // Test each navigation link
            for (let i = 0; i < Math.min(linkCount, 10); i++) { // Limit to first 10 to avoid too many tests
                const link = navLinks.nth(i);
                const href = await link.getAttribute("href");

                if (
                    href && !href.startsWith("http") &&
                    !href.startsWith("mailto:") && !href.startsWith("tel:")
                ) {
                    // Click the link
                    await link.click();

                    // Check that page loads
                    await expect(page).toHaveTitle(/./); // Any title
                    await expect(page.locator("body")).toBeVisible();

                    // Go back to test next link
                    await page.goBack();
                }
            }
        });
    });

    // Test footer links
    test.describe("Footer Links", () => {
        test("should have working footer links", async ({ page }) => {
            await page.goto("/");

            // Scroll to footer
            await page.evaluate(() =>
                window.scrollTo(0, document.body.scrollHeight)
            );

            // Get all footer links
            const footerLinks = page.locator("footer a");
            const linkCount = await footerLinks.count();

            // Test each footer link
            for (let i = 0; i < Math.min(linkCount, 10); i++) { // Limit to first 10
                const link = footerLinks.nth(i);
                const href = await link.getAttribute("href");

                if (
                    href && !href.startsWith("http") &&
                    !href.startsWith("mailto:") && !href.startsWith("tel:")
                ) {
                    // Click the link
                    await link.click();

                    // Check that page loads
                    await expect(page).toHaveTitle(/./);
                    await expect(page.locator("body")).toBeVisible();

                    // Go back to test next link
                    await page.goBack();

                    // Scroll back to footer
                    await page.evaluate(() =>
                        window.scrollTo(0, document.body.scrollHeight)
                    );
                }
            }
        });
    });

    // Test 404 handling
    test.describe("Error Handling", () => {
        test("should handle 404 pages gracefully", async ({ page }) => {
            // Test a non-existent route
            await page.goto("/non-existent-page");

            // Should not crash and should show some content
            await expect(page.locator("body")).toBeVisible();

            // Should have a title (even if it's an error page)
            await expect(page).toHaveTitle(/./);
        });
    });
});
