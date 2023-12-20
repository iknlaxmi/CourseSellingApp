/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      "roboto": ["Roboto", "sans-serif"],
      "sans": ["ui-sans-serif", "system-ui"],
    },
  },
  plugins: [],
});
