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
    colors: {
      primary: '#036773',
      secondery: '#D83241',
      'light-gray': '#EBEBEB',
      'dark-gray': '#888888',
      yellow: '#E2E900',
      links: '#3B90A2',
    },
  },
  plugins: [],
};
