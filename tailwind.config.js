/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aceDialogue: ['"VT323"', "monospace"], // DS-style crisp pixel dialogue font
        aceHeader: ['"Press Start 2P"', "cursive"], // Arcade/Retro headers
        aceUi: ['"Trebuchet MS"', 'sans-serif'], // Modern localized Ace Attorney UI font
      },
    },
  },
  plugins: [],
};