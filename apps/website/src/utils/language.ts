import { type Language, languages } from "../config/languages";
import {
    getAlternateRoutesForSlug,
    getRouteBySlugAndLanguage,
    getTranslatedUrlForLanguage,
} from "../content/routes.tsx";

/**
 * Extract language code from a path
 * @param path - The URL path (e.g., '/de/contact', '/contact', '/')
 * @returns Language code or 'en' as default
 */
export function getLanguageFromPath(path: string): string {
    // Remove leading slash and split path
    const segments = path.replace(/^\//, "").split("/");

    // Check if first segment is a language code
    const possibleLangCode = segments[0];
    const language = languages.find((lang) => lang.code === possibleLangCode);

    return language ? language.code : "en";
}

/**
 * Extract slug from a path, removing language prefix
 * @param path - The URL path (e.g., '/de/contact', '/contact', '/')
 * @returns Slug without language prefix
 */
export function getSlugFromPath(path: string): string {
    const langCode = getLanguageFromPath(path);

    if (langCode === "en") {
        // For English, the path is the slug
        return path.replace(/^\//, "") || "";
    }
    // For other languages, remove the language prefix
    const langPrefix = `/${langCode}`;
    if (path.startsWith(langPrefix)) {
        const slug = path.substring(langPrefix.length).replace(/^\//, "") || "";
        // Decode URL to handle special characters like ñ -> %C3%B1
        return decodeURIComponent(slug);
    }

    return path.replace(/^\//, "") || "";
}

/**
 * Generate a localized path for a given slug and language
 * @param slug - The base slug (e.g., 'contact', 'FAQs/achilles-rupture-timeline')
 * @param langCode - Language code
 * @returns Localized path
 */
export function generateLocalizedPath(slug: string, langCode: string): string {
    const language = languages.find((lang) => lang.code === langCode);
    if (!language) return `/${slug}`;

    if (language.code === "en") {
        return slug ? `/${slug}` : "/";
    }

    // Don't encode the slug - let the browser handle URL encoding naturally
    return slug ? `${language.dir}/${slug}` : language.dir;
}

/**
 * Get language-specific route information
 * @param slug - The route slug
 * @param langCode - Language code
 * @returns Route object with localized content
 */
export function getLocalizedRoute(slug: string, langCode: string) {
    return getRouteBySlugAndLanguage(slug, langCode);
}

/**
 * Get alternate language links for a given slug
 * @param slug - The route slug
 * @param currentLangCode - Current language code
 * @returns Array of alternate language links
 */
export function getAlternateLanguageLinks(
    slug: string,
    currentLangCode: string,
) {
    return getAlternateRoutesForSlug(slug, currentLangCode);
}

/**
 * Get language object by code
 * @param langCode - Language code
 * @returns Language object or English as fallback
 */
export function getLanguageByCode(langCode: string): Language {
    return languages.find((lang) => lang.code === langCode) || languages[0];
}

/**
 * Get current language from various sources (path, headers, etc.)
 * @param request - Request object (optional for server-side)
 * @param path - Current path
 * @returns Language object
 */
export function getCurrentLanguage(path: string, request?: Request): Language {
    const langCode = getLanguageFromPath(path);
    return getLanguageByCode(langCode);
}

/**
 * Generate hreflang links for SEO
 * @param slug - Current page slug
 * @param baseUrl - Base URL of the site
 * @returns Array of hreflang objects
 */
export function generateHreflangLinks(
    slug: string,
    baseUrl = "https://thetismedical.com",
) {
    const hreflangs = [];

    for (const language of languages) {
        const route = getRouteBySlugAndLanguage(slug, language.code);
        if (route) {
            hreflangs.push({
                hreflang: language.hreflang,
                href: `${baseUrl}${route.href}`,
            });
        }
    }

    // Add x-default pointing to English version
    const englishRoute = getRouteBySlugAndLanguage(slug, "en");
    if (englishRoute) {
        hreflangs.push({
            hreflang: "x-default",
            href: `${baseUrl}${englishRoute.href}`,
        });
    }

    return hreflangs;
}

/**
 * Check if a language code is supported
 * @param langCode - Language code to check
 * @returns Boolean indicating if language is supported
 */
export function isLanguageSupported(langCode: string): boolean {
    return languages.some((lang) => lang.code === langCode);
}

/**
 * Get browser language preference from Accept-Language header
 * @param acceptLanguageHeader - Accept-Language header value
 * @returns Preferred supported language code
 */
export function getPreferredLanguage(acceptLanguageHeader?: string): string {
    if (!acceptLanguageHeader) return "en";

    // Parse Accept-Language header
    const languagePreferences = acceptLanguageHeader
        .split(",")
        .map((lang) => {
            const [code, q = "1"] = lang.trim().split(";q=");
            return {
                code: code.toLowerCase().split("-")[0],
                quality: Number.parseFloat(q),
            };
        })
        .sort((a, b) => b.quality - a.quality);

    // Find first supported language
    for (const pref of languagePreferences) {
        if (isLanguageSupported(pref.code)) {
            return pref.code;
        }
    }

    return "en";
}

/**
 * Generate canonical URL for a page
 * @param slug - Page slug
 * @param langCode - Language code
 * @param baseUrl - Base URL
 * @returns Canonical URL
 */
export function getCanonicalUrl(
    slug: string,
    langCode: string,
    baseUrl = "https://thetismedical.com",
): string {
    const route = getRouteBySlugAndLanguage(slug, langCode);
    return route ? `${baseUrl}${route.href}` : `${baseUrl}/`;
}

/**
 * URL utilities for language switching
 */
export const urlUtils = {
    /**
     * Switch current URL to different language
     * @param currentPath - Current URL path
     * @param targetLangCode - Target language code
     * @returns New URL path for target language
     */
    switchLanguage(currentPath: string, targetLangCode: string): string {
        const currentSlug = getSlugFromPath(currentPath);
        return generateLocalizedPath(currentSlug, targetLangCode);
    },

    /**
     * Get language switcher options for current page
     * @param currentPath - Current URL path
     * @returns Array of language options with URLs
     */
    getLanguageSwitcherOptions(currentPath: string) {
        const currentLangCode = getLanguageFromPath(currentPath);

        return languages.map((language) => {
            // Use the new function that can handle any URL and map it to the correct translated URL
            const href = getTranslatedUrlForLanguage(
                currentPath,
                language.code,
            );

            return {
                ...language,
                href,
                isActive: language.code === currentLangCode,
            };
        });
    },
};
