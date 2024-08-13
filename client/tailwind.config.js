const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily:{
        "OpenSans-Bold": ["OpenSans Bold", "sans-serif"],
        "OpenSans-Light": ["OpenSans Light", "sans-serif"],
        "OpenSans-Medium": ["OpenSans Medium", "sans-serif"],
        "OpenSans-Regular": ["OpenSans Regular", "sans-serif"],
        "OpenSans-SemiBold": ["OpenSans SemiBold", "sans-serif"],
        "DMSans-Bold": ["DMSans Bold", "sans-serif"],
        "DMSans-Medium": ["DMSans Medium", "sans-serif"],
        "DMSans-Regular": ["DMSans Regular", "sans-serif"],
        "DMSans-SemiBold": ["DMSans SemiBold", "sans-serif"],
      }
    },
  },
  plugins: [ flowbite.plugin()],
}

