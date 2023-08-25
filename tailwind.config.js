/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "mobile-bg": "url('./src/assets/images/bg-main-mobile.png')",
        "desktop-bg": "url('./src/assets/images/bg-main-desktop.png')",
      },
    },
    fontFamily: {
      creditCard: ['"Space Grotesk"', "sans-serif"],
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
      16: "4rem",
    },
  },
  plugins: [],
};
