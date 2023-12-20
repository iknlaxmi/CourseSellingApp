/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      "roboto": ["Roboto", "sans-serif"],
      "sans": ["ui-sans-serif", "system-ui"],
    },
  },
  plugins: [],
});
