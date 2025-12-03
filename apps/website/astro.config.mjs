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

// https://astro.build/config
export default defineConfig({
  site: "https://thetismedical.com",
  integrations: [
    sitemap({
      customPages: allPages,
    }),
    partytown(),
    react(),
    markdownIntegration(),
    tailwind(),
  ],
  output: "server",
  adapter: vercel(),
  vite: {
    resolve: {
      conditions: ["import", "module", "browser", "default"],
      alias: {
        "country-flag-icons/unicode": "country-flag-icons/unicode/index.js",
      },
    },
    build: {
      rollupOptions: {
        external: ["googleapis"],
      },
    },
  },
});
