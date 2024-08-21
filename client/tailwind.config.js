const {nextui} = require('@nextui-org/theme');
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(chip|dropdown|pagination|popover|table|menu|divider|button|ripple|spinner|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      colors: {
        blue1: '#21BAD5',
        blue2: '#1A95AA',
        gray1: '#FBFBFD'
      },
    },
  },
  plugins: [nextui()],
}
