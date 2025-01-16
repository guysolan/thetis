import baseConfig from "@thetis/ui/tailwind.config";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  darkMode: "class",
  presets: [baseConfig],
};
