const {nextui} = require('@nextui-org/theme');
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(chip|pagination|table|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      colors: {
        blue1: '#21BAD5',
        blue2: '#1A95AA'
      },
    },
  },
  plugins: [nextui()],
}
