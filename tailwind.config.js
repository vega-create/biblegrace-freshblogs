/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D4A843',
        'primary-dark': '#B8922F',
        'primary-light': '#E8C96E',
        dark: '#3B2412',
        cream: '#FDF6E8',
        'card-bg': '#FAF0D7',
        'text-main': '#333333',
        'text-secondary': '#8B6F47',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        verse: ['Georgia', 'Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
