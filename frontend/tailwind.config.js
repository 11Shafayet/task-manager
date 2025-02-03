/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jost: 'Jost',
        playfair: 'Playfair Display',
        protest: 'Protest Revolution',
      },
      colors: {
        primary: '#000',
        secondary: '#fff',
        theme: '#FF9771',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
};
