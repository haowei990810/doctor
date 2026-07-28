import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vant 组件与样式由 unplugin-vue-components (VantResolver) 按需自动引入，
// 无需全量引入 vant/lib/index.css，保持轻量化。
// 仅保留基础样式（Toast/Dialog 等函数式组件用到）在使用处按需引入。
import './styles/global.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
