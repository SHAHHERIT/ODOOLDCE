/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: "#070A16",
          DEFAULT: "#0D1224",
          800: "#131A33",
          700: "#1A2340",
          600: "#232E52",
        },
        brass: {
          DEFAULT: "#C9A227",
          light: "#E4C55E",
          dim: "#8C7420",
        },
        teal: {
          DEFAULT: "#2DD4BF",
          dim: "#1B8377",
        },
        ivory: "#F5F3EE",
        muted: "#9CA6C4",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(7,10,22,0) 0%, rgba(7,10,22,0.6) 60%, rgba(7,10,22,1) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(201,162,39,0.15)",
        card: "0 20px 60px -20px rgba(0,0,0,0.5)",
      },
      keyframes: {
        drawline: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        drawline: "drawline 2s ease-out forwards",
        floaty: "floaty 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
