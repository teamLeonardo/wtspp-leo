/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/renderer/src/pages/**/*.{ts,tsx}',
    'src/renderer/src/components/**/*.{ts,tsx}',
    'src/renderer/app/**/*.{ts,tsx}',
    'src/renderer/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave"],
  },
  plugins: [require("daisyui")],
}
