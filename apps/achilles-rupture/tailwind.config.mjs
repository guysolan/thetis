/** @type {import('tailwindcss').Config} */
import baseConfig from "@thetis/ui/tailwind.config";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [baseConfig],
};
