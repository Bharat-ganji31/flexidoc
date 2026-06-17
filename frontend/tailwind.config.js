/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "Inter", "system-ui", "sans-serif"],
        display: ["Cabinet Grotesk", "Satoshi", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#FF521B",
          hover: "#FF3D00",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
