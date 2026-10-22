/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pex: {
          dark: '#0B1220',
          surface: '#111C2E',
          card: '#16233B',
          border: '#233554',
          accent: '#10B981',
          accentLight: '#34D399',
          accentDark: '#059669',
          text: '#F8FAFC',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
