const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    path.resolve(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
    path.resolve(__dirname, 'src/index.html'),
  ],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        primary: colors.blue,
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
