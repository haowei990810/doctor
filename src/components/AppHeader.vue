<script setup>
import { useRouter } from 'vue-router'

defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  back: { type: Boolean, default: false },
  gradient: { type: Boolean, default: true }
})

const router = useRouter()
function onBack() {
  if (window.history.length > 1) router.back()
  else router.replace('/')
}
</script>

<template>
  <header class="app-header" :class="{ grad: gradient }">
    <div class="bar">
      <button v-if="back" class="back-btn tappable" aria-label="返回上一页" @click="onBack">
        <van-icon name="arrow-left" />
      </button>
      <div class="titles">
        <h1 class="title">{{ title }}</h1>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      </div>
      <slot name="right" />
    </div>
    <div v-if="gradient" class="blob blob-a" />
    <div v-if="gradient" class="blob blob-b" />
  </header>
</template>

<style scoped>
.app-header {
  position: relative;
  padding: calc(var(--safe-top) + 14px) 16px 16px;
  overflow: hidden;
}

.app-header.grad {
  background: linear-gradient(135deg, #e6fbf3 0%, #e3f4fb 100%);
}

.bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 34px;
}

.back-btn {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.75);
  color: var(--c-primary-deep);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.titles {
  flex: 1;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: 0.5px;
}

.subtitle {
  margin: 3px 0 0;
  font-size: 12.5px;
  color: var(--c-text-sub);
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(6px);
  opacity: 0.5;
  z-index: 1;
  animation: floatY 6s ease-in-out infinite;
}
.blob-a {
  width: 120px;
  height: 120px;
  top: -40px;
  right: -20px;
  background: radial-gradient(circle, rgba(111, 224, 192, 0.5), transparent 70%);
}
.blob-b {
  width: 90px;
  height: 90px;
  top: 10px;
  right: 70px;
  background: radial-gradient(circle, rgba(109, 180, 240, 0.4), transparent 70%);
  animation-delay: 1.5s;
}
</style>
