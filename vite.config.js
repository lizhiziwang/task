import { fileURLToPath, URL } from 'node:url'
 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
// https://vitejs.dev/config/
export default defineConfig({
  devServer: {
    host: '127.0.0.1',
    // https:true,
    port: 8080,
    client: {
      webSocketURL: 'ws://127.0.0.1:8080/websocket-endpoint',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
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