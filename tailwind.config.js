/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
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
        fadeIn: `fadeIn 0.25s  `,
        fadeOut: `fadeOut 0.25s forwards`,
        slideFromBot: `slideFromBot 0.2s forwards`,
      },
    },
  },
  plugins: [],
};
