/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This is crucial for dark mode to work with class-based toggling
  theme: {
    extend: {},
  },
  plugins: [],
}
