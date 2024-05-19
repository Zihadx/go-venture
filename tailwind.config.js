/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'gradient-custom': 'linear-gradient(to right top, #2095ae, transparent)',
          'gradient-secondary': 'linear-gradient(to top, #2095ae, transparent)',
          'gradient-tertiary': 'linear-gradient(to right bottom, #2095ae, transparent)',
      },
      colors: {
        primary: '#2095ae',
        secondary: '#023f4e',
        tertiary: "#b59677"
      },
    },
  },
  plugins: [require("daisyui")],
};
