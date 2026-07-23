import { defineConfig } from "astro/config";

// Stack
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// Performance
import partytown from "@astrojs/partytown";
// Content
import {
  serializeSitemapItem,
  sitemapPageFilter,
} from "./src/content/sitemap-utils";
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
      serialize: serializeSitemapItem,
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
    server: {
      watch: {
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.vercel/**",
          "**/dist/**",
          "**/.astro/**",
        ],
        usePolling: process.platform === "win32",
        interval: 1000,
      },
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
