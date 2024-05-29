/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#E2E8F0",
        primary: "#7C3AED",
        secondary: "#783ce0",
      },
      animation: {
        textScrolling: "textScrolling 40s linear infinite",
        textScrollingReverse: "textScrollingReverse 40s linear infinite",
      },
      keyframes: {
        textScrolling: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        textScrollingReverse: {
          "0%": {
            transform: "translate3d(0%, 0, 0)",
          },
          "100%": {
            transform: "translate3d(-100%, 0, 0)",
          },
        },
      },
    },
    plugins: [],
  },
};
