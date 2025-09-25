import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react-hook-form", "@hookform/resolvers", "react", "react-dom"],
  },
  build: {
    target: "es2020",
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "form-vendor": ["react-hook-form", "@hookform/resolvers"],
        },
      },
    },
  },
});
