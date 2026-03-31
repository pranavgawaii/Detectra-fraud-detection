import type { Config } from "tailwindcss";

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
    },
  },
  plugins: [],
};
export default config;
