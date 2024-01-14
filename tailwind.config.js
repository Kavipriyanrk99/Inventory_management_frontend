/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'raisinblack' : '#212332',
        'richblack' : '#0F111A'
      },
    },
  },
  plugins: [],
}

