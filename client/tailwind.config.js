/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        yeseva: ["Yeseva One", "sans-serif"],
        pacifico: ["Pacifico", "sans-serif"],
      },
      colors: {
        primary: "#0085FF",
        blue: {
          100: "#F2F8FF",
          200: "#CCE1FF",
          300: "#99C8FF",
          400: "#66B2FF",
          500: "#369BFF",
          600: "#0085FF",
          700: "#0072E6",
          800: "#005DC0",
          900: "#004799",
          1000: "#002B66",
        },
      },
    },
  },

  plugins: [],
};
