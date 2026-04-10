import { defineConfig } from "astro/config";

// Stack
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// Performance
import partytown from "@astrojs/partytown";
// Content
import { sitemapPageFilter } from "./src/content/sitemap-utils";
// Services
import sitemap from "@astrojs/sitemap";

// For MD rendering Notion
import markdownIntegration from "@astropub/md";

// https://astro.build/config
export default defineConfig({
  site: "https://thetismedical.com",
  integrations: [
    sitemap({
      filter: sitemapPageFilter,
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
