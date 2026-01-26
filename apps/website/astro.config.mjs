import { defineConfig } from "astro/config";

// Stack
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// Performance
import partytown from "@astrojs/partytown";
// Content
import { generateAllRoutes } from "./src/content/routes";
// Services
import sitemap from "@astrojs/sitemap";

// For MD rendering Notion
import markdownIntegration from "@astropub/md";
const url = "https://thetismedical.com";

// Generate all pages for all languages
const allRoutes = generateAllRoutes();
const allPages = allRoutes.map((route) => `${url}${route.href}`);

// Language codes to exclude from automatic discovery (we handle these via customPages)
const languageCodes = ["fr", "de", "es", "it"];

// https://astro.build/config
export default defineConfig({
  site: "https://thetismedical.com",
  integrations: [
    sitemap({
      customPages: allPages,
      filter: (page) => {
        // Exclude pages that start with language codes - we handle these via customPages with translated slugs
        try {
          const pathname = new URL(page).pathname;
          const segments = pathname.split("/").filter(Boolean); // Remove empty strings
          const firstSegment = segments[0];
          // Include the page if it doesn't start with a language code
          // This allows English pages and other non-language-specific pages through
          return !firstSegment || !languageCodes.includes(firstSegment);
        } catch {
          // If URL parsing fails, include the page (better safe than sorry)
          return true;
        }
      },
    }),
    partytown(),
    react(),
    markdownIntegration(),
    tailwind({ applyBaseStyles: false }),
  ],
  output: "server",
  adapter: vercel(),
  vite: {
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    build: {
      rollupOptions: {
        external: ["googleapis"],
      },
    },
    ssr: {
      noExternal: ["nanostores", "@nanostores/react"],
    },
  },
});
