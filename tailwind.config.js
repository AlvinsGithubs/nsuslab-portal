/** @type {import('tailwindcss').Config} */
export default {
  // ✅ content 경로를 src 폴더를 기준으로 찾도록 수정했습니다.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
      },
      screens: {
        '3xl': '1920px', // 1920px 너비 이상일 때 적용될 3xl 중단점 정의
      },
    },
  },
  plugins: [],
}