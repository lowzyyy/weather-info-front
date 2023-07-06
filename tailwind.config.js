/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "450px",
      ...defaultTheme.screens,
    },
    extend: {
      keyframes: {
        scaling: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" },
          // "75%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeOutRadar: {
          "0%": { opacity: "1" },
          "95%": { opacity: "0.95" },
          "100%": { opacity: "0" },
        },
        slideFromBot: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      animation: {
        scaleInfinity: `scaling 1.5s ease-in infinite`,
        fadeIn: `fadeIn 0.25s  `,
        fadeOut: `fadeOut 0.25s forwards`,
        slideFromBot: `slideFromBot 0.2s forwards`,
      },
    },
  },
  plugins: [],
};
