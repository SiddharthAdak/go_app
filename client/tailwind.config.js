/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fecb10"
      },
      backgroundImage: {
        'hero-pattern': "url('https://cdn.vectorstock.com/i/1000x1000/67/55/tile-pattern-with-cats-on-yellow-background-vector-17196755.webp')",
        'footer-texture': "url('/img/footer-texture.png')",
        'back-image': "url('https://www.shutterstock.com/image-photo/wooden-texture-natural-wood-pattern-260nw-177578429.jpg')"
      }
    },
  },
  plugins: [],
}