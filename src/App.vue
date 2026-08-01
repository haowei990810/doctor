<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  { name: 'home', path: '/', label: '首页', icon: 'wap-home-o' },
  { name: 'check', path: '/check', label: '自查', icon: 'search' },
  { name: 'handle', path: '/handle', label: '处理', icon: 'plus' },
  { name: 'disease', path: '/disease', label: '百科', icon: 'notes-o' },
  { name: 'prevent', path: '/prevent', label: '预防', icon: 'shield-o' }
]

const showTab = computed(() => route.meta.tab === true)
const activeName = computed(() => {
  if (route.name === 'diseaseDetail') return 'disease'
  return route.name
})

function go(tab) {
  if (route.path !== tab.path) router.push(tab.path)
}
</script>

<template>
  <div class="app-shell">
    <router-view v-slot="{ Component, route: r }">
      <component :is="Component" :key="r.path" class="route-view" />
    </router-view>

    <!-- 自定义底部导航：中间“处理”为强调按钮 -->
    <nav v-if="showTab" class="tabbar">
      <div class="tabbar-inner">
        <template v-for="tab in tabs" :key="tab.name">
          <button
            v-if="tab.name !== 'handle'"
            class="tab-item"
            :class="{ active: activeName === tab.name }"
            @click="go(tab)"
          >
            <van-icon :name="tab.icon" class="tab-icon" />
            <span class="tab-label">{{ tab.label }}</span>
          </button>

          <button
            v-else
            class="tab-center tappable"
            :class="{ active: activeName === tab.name }"
            @click="go(tab)"
          >
            <span class="center-bubble">
              <van-icon name="plus" />
            </span>
            <span class="tab-label center-label">{{ tab.label }}</span>
          </button>
        </template>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
}

.tabbar {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  bottom: 0;
  z-index: 100;
  padding-bottom: var(--safe-bottom);
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: saturate(160%) blur(14px);
  -webkit-backdrop-filter: saturate(160%) blur(14px);
  border-top: 1px solid var(--c-line);
  box-shadow: 0 -6px 20px rgba(47, 167, 176, 0.08);
}

.tabbar-inner {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 58px;
  max-width: 640px;
  margin: 0 auto;
}

.tab-item {
  flex: 1;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: var(--c-text-weak);
  padding: 8px 0;
  transition: color 0.2s ease, transform 0.2s ease;
}

.tab-icon {
  font-size: 22px;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-label {
  font-size: 11px;
  font-weight: 600;
}

.tab-item.active {
  color: var(--c-primary-deep);
}
.tab-item.active .tab-icon {
  transform: translateY(-2px) scale(1.12);
}

/* 中间强调按钮：整体上移，保证凸起圆形仍在按钮可点击盒内 */
.tab-center {
  flex: 1;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-top: -20px;
  padding: 0 0 8px;
  position: relative;
}

.center-bubble {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  background: linear-gradient(145deg, var(--c-primary-soft), var(--c-primary-deep));
  box-shadow: 0 8px 18px rgba(47, 167, 176, 0.4);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-center.active .center-bubble,
.tab-center:active .center-bubble {
  transform: translateY(-2px) scale(1.06) rotate(90deg);
}

.center-label {
  color: var(--c-text-weak);
}
.tab-center.active .center-label {
  color: var(--c-primary-deep);
}
</style>
