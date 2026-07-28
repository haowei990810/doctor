import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'

// 轻量化：Vant 按需自动引入，仅打包用到的组件与样式
export default defineConfig(({ command }) => ({
  // 部署到 GitHub Pages 子路径 https://haowei990810.github.io/doctor/
  // 本地 dev/preview 用根路径，避免资源 404
  base: command === 'build' ? '/doctor/' : '/',
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
