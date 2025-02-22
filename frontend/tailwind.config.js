/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#baddff',
          300: '#84c5ff',
          400: '#48a7ff',
          500: '#1a88ff',
          600: '#0066ff',
          700: '#0052db',
          800: '#0042b3',
          900: '#003a8c',
        },
      },
    },
  },
  plugins: [],
};