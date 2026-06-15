/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#106d38',
        'brand-green-hover': '#0a4f27',
        'brand-green-light': '#10e660',
      }
    },
  },
  plugins: [],
}
