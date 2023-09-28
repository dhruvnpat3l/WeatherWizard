/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        PantonRust: ['Panton Rust'],
        Wizard: ['Magical'],
        HarryPoter:['Herry']
      }
    },
  },
  plugins: [],
}