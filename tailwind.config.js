/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      keyframes: {
        updown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' }, // Adjust -20px as desired
        },
      },
      animation: {
        updown: 'updown 3s linear infinite',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
  darkMode: 'class',
}

