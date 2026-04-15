/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'sb-beige':      '#F5F0E8',
        'sb-beige-dark': '#EDE8DE',
        'sb-brown':      '#8B6F47',
        'sb-brown-dark': '#5C4033',
        'sb-brown-med':  '#A0845C',
        'sb-green':      '#4A7C59',
        'sb-green-dark': '#2D5A3D',
        'sb-green-light':'#6B9B7D',
        'sb-cream':      '#FAF7F2',
        'sb-sand':       '#D4C5A9',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
