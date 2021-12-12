module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active", "disabled"],
      boxShadow: ["active"],
      textColor: ["disabled"],
      borderColor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
