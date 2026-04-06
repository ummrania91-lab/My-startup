/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'sb-green': '#39FF14',
        'sb-purple': '#8B5CF6',
        'sb-orange': '#FF6B35',
        'sb-dark': '#1A1A2E',
        'sb-gray': '#2D2D44',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
