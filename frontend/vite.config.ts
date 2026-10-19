import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      // Bật chế độ liên tục kiểm tra thay đổi file (rất hữu ích nếu HMR mặc định bị lỗi)
      usePolling: true,
      interval: 100, // Kiểm tra mỗi 100ms
    },
  },
})
