/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sanji)', 'sans-serif'],
        num: ['var(--font-alimama)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
