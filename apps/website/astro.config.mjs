import { defineConfig } from "astro/config";

// Stack
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// Performance
import partytown from "@astrojs/partytown";
// Content
import { getSitemapUrls } from "./src/content/sitemap-utils";
// Services
import sitemap from "@astrojs/sitemap";

// For MD rendering Notion
import markdownIntegration from "@astropub/md";
const url = "https://thetismedical.com";

// Sitemap: only include URLs that have page files (avoids 404s)
const sitemapPages = getSitemapUrls(url);

// https://astro.build/config
export default defineConfig({
  site: "https://thetismedical.com",
  integrations: [
    sitemap({
      customPages: sitemapPages,
      // No filter: customPages only includes URLs with page files; Astro discovers the rest
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
