/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9E7FFF',
        secondary: '#38bdf8',
        accent: '#f472b6',
        background: '#171717',
        surface: '#262626',
        text: '#FFFFFF',
        'text-secondary': '#A3A3A3',
        border: '#2F2F2F',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif']
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      keyframes: {
        'subtle-glow': {
          '0%, 100%': { boxShadow: '0 0 20px -5px rgba(158, 127, 255, 0.3)' },
          '50%': { boxShadow: '0 0 25px 0px rgba(158, 127, 255, 0.4)' },
        }
      },
      animation: {
        'subtle-glow': 'subtle-glow 5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
