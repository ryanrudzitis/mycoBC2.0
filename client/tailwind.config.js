/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "/public/index.html",
    "src/App.js",
    "client/src/components/Modal.js",
    "client/src/components/recordList.js",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
