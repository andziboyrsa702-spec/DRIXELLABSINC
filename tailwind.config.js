/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        matte: '#0A0A0A',
        charcoal: '#141416',
        graphite: '#1E1E20',
        titanium: '#2A2B2E',
        warmWhite: '#F7F7F5',
        metalAluminium: '#D4D5D8',
        metalTitanium: '#8E8E93',
      },
      fontFamily: {
        heading: ['Syne', 'Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Outfit', 'monospace'],
      },
    },
  },
  plugins: [],
};
