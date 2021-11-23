module.exports = {
  mode: "jit",
  purge: ["./public/index.html", "./src/**/*.vue"],
  darkMode: false,
  theme: {
    colors: {
      gray: {
        900: "#121214",
        800: "#303031",
        700: "#4b4b4c",
        600: "#303236",
      },
      white: "#ffffff",
      green: "#0dc75b",
      red: "#ff054a",
      yellow: "#f5b916",
      blue: "#1acbf7",
      transparent: "rgba(0, 0, 0, 0)",
    },
    extend: {
      padding: {
        full: "50%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

/**
 *  npx tailwindcss -o ./src/assets/style.css -w -m
 */
