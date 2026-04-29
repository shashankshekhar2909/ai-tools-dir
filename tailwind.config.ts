import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#F8FAFC",
        ink: "#0F172A",
        brand: "#0E7490",
        accent: "#EA580C",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(15, 23, 42, 0.10)",
        "card-hover": "0 16px 40px -8px rgba(15, 23, 42, 0.18)",
      },
      borderRadius: {
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
