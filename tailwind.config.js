<<<<<<< HEAD
const flowbite = require("flowbite-react/tailwind");
=======
import flowbite from "flowbite-react/tailwind";

>>>>>>> 6ba71d82cdc9b92f3a9521cc4061a822f1c86fd6
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        greenBlack: "#000000",
        brandPrimary: "#00D8FF",
        whiteText: "#ffffff",
        neutralGrey: "#7E8589",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
