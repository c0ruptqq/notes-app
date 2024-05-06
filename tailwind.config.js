/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/theme'
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        black: '#222323',
        white: '#FFFFFF',
        'light-secondary': '#3F77EA',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    nextui(),
  ],
};
