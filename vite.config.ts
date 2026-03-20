import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: {
    ignorePatterns: [
      "node_modules/**",
      "dist/**",
      ".next/**",
      "**/*.gen.ts",
      "**/routeTree.gen.ts",
      "**/supabase/functions/**",
      ".cursor/**",
      "*.lock",
      "*.lockb",
    ],
    options: {
      typeAware: false,
      typeCheck: false,
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  fmt: {
    indentWidth: 2,
    indentStyle: "space",
  },
});
