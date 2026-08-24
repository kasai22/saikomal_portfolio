import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { DURATION } from "./lib/animations/constants";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        // Warm cream page, warm near-black text, one amber accent.
        // `brand` is the fill amber (always carries ink-coloured text on
        // top); `brand.ink` is the darkened amber used for accent TEXT,
        // because the fill amber does not reach AA on cream.
        paper: {
          DEFAULT: "#FBF9F2",
          raised: "#F5F1E6",
          panel: "#FFFFFF",
          sunk: "#EFEADC",
        },
        ink: {
          DEFAULT: "#14140F",
          soft: "#3D3D35",
        },
        brand: {
          DEFAULT: "#E8A33D",
          dark: "#C9871F",
          light: "#F6D9A6",
          ink: "#8A5A0A",
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
      },
      fontFamily: {
        // One typeface for the whole site — hierarchy comes from weight,
        // size and tracking, not from mixing typefaces. `display` is kept
        // as an alias (rather than removed) so existing `font-display`
        // usage across the case-study pages keeps working unchanged.
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Technical annotation face — every micro-label, index and FIG.
        // marker on the site is set in this, never in the body face.
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      // CSS transitions read from the same scale as the Motion tokens, so
      // hover states written in Tailwind and entrances written in Motion
      // cannot drift onto two different rhythms.
      transitionDuration: {
        instant: `${DURATION.instant * 1000}ms`,
        fast: `${DURATION.fast * 1000}ms`,
        base: `${DURATION.base * 1000}ms`,
        slow: `${DURATION.slow * 1000}ms`,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(2rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
