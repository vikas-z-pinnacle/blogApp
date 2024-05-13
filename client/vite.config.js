import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  },
  plugins: [react()],
  define: {
    // eslint-disable-next-line no-undef
    'import.meta.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY)
  }
})
