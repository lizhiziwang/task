import { fileURLToPath, URL } from 'node:url'
 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
  //   // open: true, //配置自动启动浏览器 
    proxy: {
      '/api': {
        target: 'http://localhost:8061', //对应自己的接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),cesium()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})