import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // var(--font-outfit) is injected by next/font/google; nb-architekt loads from public/fonts/
        sans: ["nb-architekt", "var(--font-outfit)", "Outfit", "sans-serif"],
        mono: ["monospace"],
      },
      maxWidth: {
        container: "1248px",
      },
      colors: {
        // Map CSS custom properties so Tailwind classes use the theme
        background:  "var(--background)",
        foreground:  "var(--foreground)",
        card:        "var(--card)",
        "card-fg":   "var(--card-foreground)",
        primary:     "var(--primary)",
        "primary-fg":"var(--primary-foreground)",
        secondary:   "var(--secondary)",
        muted:       "var(--muted)",
        "muted-fg":  "var(--muted-foreground)",
        accent:      "var(--accent)",
        "accent-fg": "var(--accent-foreground)",
        border:      "var(--border)",
        input:       "var(--input)",
        ring:        "var(--ring)",
        destructive: "var(--destructive)",
        sidebar:     "var(--sidebar)",
        // Static brand tokens used in hardcoded component classes
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
          green:    "#72e3ad",
          navy:     "#0F1E3C",
          navytext: "#1B2A4A",
          blue:     "#3b82f6",
          red:      "#EF4444",
          amber:    "#F59E0B",
          safe:     "#22C55E",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      boxShadow: {
        card: "0px 1px 3px rgba(0,0,0,0.17)",
      },
      keyframes: {
        appear: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "appear-zoom": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        appear: "appear 0.5s ease-out forwards",
        "appear-zoom": "appear-zoom 0.5s ease-out forwards",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".fade-bottom": {
          "mask-image": "linear-gradient(to bottom, black 60%, transparent 100%)",
          "-webkit-mask-image": "linear-gradient(to bottom, black 60%, transparent 100%)",
        },
      });
    }),
  ],
};
export default config;

