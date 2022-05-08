module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        xxxl: '4px 4px 0 #dc6633',
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
      },
    },
    colors: {
      background: '#fcd8d4',
      brand: {
        50: '#fdf5ef',
        100: '#fbe6d9',
        200: '#f5c6aa',
        300: '#f0a881',
        400: '#e97b4e',
        500: '#e3592c',
        600: '#d54221',
        700: '#b1301d',
        800: '#8d291f',
        900: '#72241c',
      },
    },
  },
  plugins: [],
};
