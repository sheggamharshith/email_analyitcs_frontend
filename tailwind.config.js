// Example `tailwind.config.js` file
const { white } = require("tailwindcss/colors");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primaryRed: "#f05454",
      primaryBlue: "#30475e",
      primaryBlack: "#222831",
      primaryWhite: "#e8e8e8",
      white: "#ffff",
      primarySilver: "#ffff",
    }),
    textColor: {
      primaryRed: "#f05454",
      primaryBlue: "#30475e",
      primaryBlack: "#222831",
      primaryWhite: "#e8e8e8",
    },
  },

  variants: {
    extend: {
      borderColor: ["focus-visible"],
      opacity: ["disabled"],
      backgroundColor: ["active"],
    },
  },
};
