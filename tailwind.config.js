/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          // "primary": "#F5AF19",

          // "secondary": "#637bd3",

          // "accent": "#d4f97c",

          // "neutral": "#19212E",

          // "base-100": "#EDEAF1",

          // "info": "#256EE4",

          // "success": "#1A7459",

          // "warning": "#ECA44B",

          // "error": "#E66074",
        },
      },
    ],
  },

  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
