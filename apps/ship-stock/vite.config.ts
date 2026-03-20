import { defineConfig } from "vite-plus";
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
    dedupe: ["react", "react-dom", "react-hook-form"],
  },
  optimizeDeps: {
    include: [
      "react-hook-form",
      "@hookform/resolvers",
      "react",
      "react-dom",
      "next-themes",
      "sonner",
    ],
  },
  build: {
    target: "es2020",
    rollupOptions: {
      external: [],
      output: {
        // Vite 8/Rolldown: manualChunks must be a function
        manualChunks: (id) => {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/"))
            return "react-vendor";
          if (
            id.includes("node_modules/react-hook-form/") ||
            id.includes("node_modules/@hookform/resolvers/")
          )
            return "form-vendor";
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/, /packages/],
    },
  },
});
