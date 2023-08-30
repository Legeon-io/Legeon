/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#7F70E7",
        "custom-orange": "#FC5F2C",
      },
    },
  },
  plugins: [],
};
