const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: "1rem",
      sm: "1.08rem",
      default: "1.15rem",
      md: "1.15rem",
      lg: "1.4rem",
      xl: "1.8rem",
      "2xl": "2.4rem",
      "3xl": "3rem",
      "4xl": "4rem",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xl: "1200px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#E3EEEB",
          100: "#D6E7E2",
          200: "#BDD7CF",
          300: "#A3C8BD",
          400: "#8AB9AA",
          500: "#70AA98",
          600: "#5A9784",
          700: "#457465",
          800: "#305147",
          900: "#1B2E28",
          950: "#111C18",
        },
        figma: {
          red: "#FBC8C1",
          orange: "#F8D19A",
          yellow: "#FDE8A0",
          green: "#B6F3C6",
          blue: "#C1E3FF",
          purple: "#E2CDFF",
          gray: "#E6E6E6",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        backgroundImage: {
          "night-splint-bed":
            "url('images/night-splint/achilles_rupture_night_splint_bed_thetis_medical.jpg')",
        },
      },
      maxWidth: {
        xs: "400px",
        sm: "600px",
        md: "800px",
        lg: "1000px",
        xl: "1200px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}
