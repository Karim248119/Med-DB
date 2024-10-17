/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.pug", "./public/**/*.js"], // Ensure paths are correct here
  theme: {
    extend: {
      colors: {
        primary: "#1F2B6C",
        secondary: "#159EEC",
        accent: "#BFD2F8",
        red: {
          DEFAULT: "#F44336", // Your custom red
        },
        green: {
          DEFAULT: "#4CAF50", // Your custom green
        },
      },
    },
  },
  plugins: [],
};
