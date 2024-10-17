module.exports = {
  content: ["./views/**/*.pug", "./public/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#1F2B6C",
        secondary: "#159EEC",
        accent: "#BFD2F8",
        red: {
          DEFAULT: "#F44336",
        },
        green: {
          DEFAULT: "#4CAF50",
        },
      },
    },
  },
  plugins: [],
};
