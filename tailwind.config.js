/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: 'class' n'est plus nécessaire en Tailwind v4
  theme: {
    extend: {},
  },
  plugins: [],
}
