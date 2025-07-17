/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{App,components,pages,contexts,lib}/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      colors: {
        'nsus-blue': '#4779C1',
        'nsus-light-blue': '#E6F0FF',
        'nsus-gray': {
          100: '#F7F8FA',
          200: '#EFF1F3',
          300: '#E0E3E8',
          500: '#8A92A0',
          700: '#4A5568',
          900: '#1A202C',
        },
      },
      spacing: {
        '6': '1.5rem', // 24px
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
      }
    },
  },
  plugins: [],
}
