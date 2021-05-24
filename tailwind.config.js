module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkBlue: "#0966A2",
        lightBlue: "#0179BF",
        lightGrey: "#EBECF0",
        lightOrange: "#FF9F19",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
