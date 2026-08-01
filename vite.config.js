import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'

// 轻量化：Vant 按需自动引入，仅打包用到的组件与样式
export default defineConfig(() => ({
  // 用相对路径 './'：同时兼容根路径(Cloudflare)与子路径(GitHub Pages /doctor/)，
  // 避免资源 404 白屏。配合 hash 路由，页面刷新也不丢资源。
  base: './',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
      dts: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800
  }
}))
