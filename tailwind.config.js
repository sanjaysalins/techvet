/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#dbe5f1',
          500: '#334d77',
          600: '#27406a',
          700: '#1e2f4e',
          800: '#162238',
          900: '#0F172A',
          950: '#0a0f1f'
        },
        brand: {
          DEFAULT: '#10B981',
          light: '#34d399',
          dark: '#059669'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(15, 23, 42, 0.12)',
        glow: '0 0 0 4px rgba(16, 185, 129, 0.15)'
      }
    },
  },
  plugins: [],
}
