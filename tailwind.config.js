/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2A0E0E',
        maroon: '#5A1220',
        deepmaroon: '#3B0A16',
        rose: '#B23A48',
        blush: '#E9B7B0',
        gold: '#C9A24B',
        lightgold: '#E6C878',
        cream: '#FBF3E4',
        parchment: '#F6E9CE',
        marigold: '#E7A11A',
        henna: '#2F5233',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        flourish: ['"Pinyon Script"', 'cursive'],
        title: ['"Cinzel"', 'serif'],
        serif2: ['"Marcellus"', 'serif'],
        quote: ['"Cormorant Infant"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        flicker: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(0.97)' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        float: 'float 6s ease-in-out infinite',
        flicker: 'flicker 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
