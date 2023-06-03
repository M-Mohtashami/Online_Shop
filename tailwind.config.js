/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        'iran-sans': ['IranSans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
