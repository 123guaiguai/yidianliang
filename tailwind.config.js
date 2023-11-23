module.exports = {
  purge: [
    "./src/App.vue",
    "./src/views/**/*.{vue,js,ts,jsx,tsx}",
    "./src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const topUtilities = {};
      const bottomUtilities = {}
      const leftUtilities = {};
      const rightUtilities = {};

      for (let i = 0; i <= 1000; i++) {
        topUtilities[`.mpt-${i}`] = { top: `${i}px` };
      }
      for (let i = 0; i <= 1000; i++) {
        bottomUtilities[`.mpb-${i}`] = { bottom: `${i}px` };
      }
      for (let i = 0; i <= 1000; i++) {
        leftUtilities[`.mpl-${i}`] = { left: `${i}%` };
      }
      for (let i = 0; i <= 1000; i++) {
        rightUtilities[`.mpr-${i}`] = { right: `${i}%` };
      }

      addUtilities(topUtilities, ['responsive']);
      addUtilities(bottomUtilities, ['responsive']);
      addUtilities(leftUtilities, ['responsive']);
      addUtilities(rightUtilities, ['responsive']);
    },
    function ({ addUtilities }) {
      const widthUtilities = {};

      for (let i = 0; i <= 1000; i++) {
        widthUtilities[`.mw-${i}`] = { width: `${i}px` };
      }
      addUtilities(widthUtilities, ['responsive']);
    },
    function ({ addUtilities }) {
      const heightUtilities = {};
      for (let i = 0; i <= 1000; i++) {
        heightUtilities[`.mh-${i}`] = { height: `${i}px` };
      }
      addUtilities(heightUtilities, ['responsive']);
    },
    function ({ addUtilities }) {
      const paddingUtilities = {};
      for (let i = 0; i <= 1000; i++) {
        paddingUtilities[`.mpt-${i}`] = { 'padding-top': `${i}px` };
        paddingUtilities[`.mpb-${i}`] = { 'padding-bottom': `${i}px` };
        paddingUtilities[`.mpl-${i}`] = { 'padding-left': `${i}px` };
        paddingUtilities[`.mpr-${i}`] = { 'padding-right': `${i}px` };
      }
      addUtilities(paddingUtilities, ['responsive']);
    },

    // Other plugins if you have...
  ],
}
