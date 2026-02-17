/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        brand: {
          black: '#0a0a0a',
          dark: '#121212', 
          gray: '#1e1e1e',
          gold: '#D4AF37',
        }
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [],
}
