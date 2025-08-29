import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@' 별칭이 'src' 폴더를 가리키도록 설정합니다.
      '@': path.resolve(__dirname, './src'),
    },
  },
})