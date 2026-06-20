import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "var(--color-canvas)",
          muted: "var(--color-canvas-muted)",
          soft: "var(--color-canvas-soft)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          raised: "var(--color-surface-raised)",
          overlay: "var(--color-surface-overlay)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          heading: "var(--color-ink-heading)",
          muted: "var(--color-ink-muted)",
          faint: "var(--color-ink-faint)",
        },
        brand: {
          DEFAULT: "#C4A052",
          dark: "#9A7B3C",
          light: "#E8D5A8",
        },
        navy: {
          DEFAULT: "#1E293B",
          dark: "#0F172A",
        },
        line: "var(--color-line)",
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-hero": ["clamp(3.5rem,11vw,8.5rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(2.85rem,7vw,5.75rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.1rem,4.2vw,3.4rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backgroundImage: {
        "hero-mesh": "var(--hero-mesh)",
        "brand-accent": "linear-gradient(90deg, #C4A052, #E8D5A8)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        elevated: "var(--shadow-elevated)",
        glow: "0 0 0 1px rgba(196,160,82,0.2), 0 8px 32px rgba(196,160,82,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
