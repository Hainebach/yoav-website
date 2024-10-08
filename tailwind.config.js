/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGray: "rgb(var(--foreground-rgb))",
        secondaryGray: "rgb(var(--secondary-gray))",
        midGray: "rgb(var(--mid-gray))",
        backgroundColor: "rgb(var(--background-rgb))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        mono: ["var(--font-space_mono)", "monospace"],
      },
      colors: {
        "primary-color": "rgb(var(--foreground-rgb))",
        "background-color": "rgb(var(--background-rgb))",
        "background-color-opacity": "rgba(var(--background-rgb), 1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
