/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: "#BDEBFF",
        leaf: "#3DDC84",
        "leaf-green": "#3DDC84",
        sunshine: "#FFD23F",
        "sunshine-yellow": "#FFD23F",
        coral: "#FF7B54",
        berry: "#7B4DFF",
        "berry-purple": "#7B4DFF",
        cream: "#FFF8E7",
        "deep-teal": "#0F4C5C",
      },
      fontFamily: {
        heading: ["'Fredoka'", "cursive", "sans-serif"],
        body: ["'Nunito'", "sans-serif"],
      },
      boxShadow: {
        'candy': '0 8px 0 rgba(0, 0, 0, 0.15)',
        'candy-sm': '0 4px 0 rgba(0, 0, 0, 0.15)',
        'candy-lg': '0 12px 0 rgba(0, 0, 0, 0.18)',
        'candy-pressed': '0 2px 0 rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'candy': '28px',
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
