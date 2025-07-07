import { fileURLToPath, URL } from 'node:url'
 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port:8092,
    host:'0.0.0.0',
  //   // open: true, //配置自动启动浏览器 
    proxy: {
      '/api': {
        // target: 'http://113.45.182.107:8062', //对应自己的接口
        target: 'http://10.0.120.106:8062', //对应自己的接口

        // target: 'http://10.0.120.106:12050', //对应自己的接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    onProxyReq: (proxyReq, req) => {
      console.log(' 代理请求路径:', req.url);  // 输出转发路径 
      console.log(' 代理请求方法:', req.method);
      console.log(' 代理请求头:', proxyReq.getHeaders());
      console.log(' 代理请求体:', proxyReq.getBody());
    }
  },
  plugins: [
    vue(),cesium()
  ],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})