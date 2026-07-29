<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { diseases } from '@/data/knowledge'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const router = useRouter()

const disease = computed(() => diseases.find((d) => d.id === route.params.id))

const infoRows = computed(() => {
  if (!disease.value) return []
  return [
    { label: '病原体', value: disease.value.pathogen, icon: 'cluster-o' },
    { label: '潜伏期', value: disease.value.incubation, icon: 'clock-o' },
    { label: '类型', value: disease.value.category, icon: 'label-o' }
  ]
})
</script>

<template>
  <div v-if="disease">
    <AppHeader :title="disease.name" :subtitle="disease.alias" back />

    <div class="page">
      <!-- 概览卡 -->
      <div
        class="overview anim-fade-up"
        :style="{ background: `linear-gradient(135deg, ${disease.color}14, ${disease.color}06)` }"
      >
        <div class="ov-top">
          <span class="ov-ico" :style="{ color: disease.color, background: disease.color + '1f' }">
            <van-icon :name="disease.icon" />
          </span>
          <span class="ov-level" :style="{ background: disease.color }">
            {{ disease.category }}
          </span>
        </div>
        <p class="ov-summary">{{ disease.summary }}</p>
      </div>

      <!-- 关键信息 -->
      <div class="info-grid stagger">
        <div v-for="row in infoRows" :key="row.label" class="info-cell card">
          <span class="info-ico"><van-icon :name="row.icon" /></span>
          <small>{{ row.label }}</small>
          <strong>{{ row.value }}</strong>
        </div>
      </div>

      <!-- 主要症状 -->
      <div class="section-title"><span class="bar" /> 主要症状</div>
      <div class="card">
        <ul class="sym-list">
          <li v-for="(s, i) in disease.symptoms" :key="i" class="anim-fade-up" :style="{ animationDelay: (i * 0.05) + 's' }">
            <span class="sym-dot" :style="{ background: disease.color }" />
            {{ s }}
          </li>
        </ul>
      </div>

      <!-- 危险提示 -->
      <div class="section-title"><span class="bar" /> 危险提示</div>
      <div class="danger-box">
        <van-icon name="warning-o" />
        <p>{{ disease.danger }}</p>
      </div>

      <!-- 治疗与预后 -->
      <div class="section-title"><span class="bar" /> 治疗与预后</div>
      <div class="card treat-box">
        <van-icon name="like-o" />
        <p>{{ disease.treat }}</p>
      </div>

      <!-- 行动按钮 -->
      <div class="detail-actions">
        <button class="ghost-btn tappable" @click="router.push('/check')">
          <van-icon name="search" /> 症状自查
        </button>
        <button class="primary-btn tappable" @click="router.push('/handle')">
          <van-icon name="plus" /> 处理方法
        </button>
      </div>
    </div>
  </div>

  <div v-else class="empty">
    <van-empty description="未找到该疾病信息" />
    <button class="primary-btn tappable" style="margin:0 auto;max-width:200px" @click="router.replace('/disease')">
      返回百科
    </button>
  </div>
</template>

<style scoped>
.overview {
  border-radius: var(--r-lg);
  padding: 18px;
  margin-top: 14px;
}
.ov-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ov-ico {
  width: 52px;
  height: 52px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 27px;
}
.ov-level {
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 999px;
}
.ov-summary {
  margin: 14px 0 0;
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--c-text);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 14px;
}
.info-cell {
  padding: 12px 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.info-ico {
  color: var(--c-primary-deep);
  font-size: 18px;
  margin-bottom: 2px;
}
.info-cell small {
  font-size: 11px;
  color: var(--c-text-weak);
}
.info-cell strong {
  font-size: 12.5px;
  color: var(--c-text);
  line-height: 1.4;
}

.sym-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sym-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--c-text);
}
.sym-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-top: 7px;
  flex-shrink: 0;
}

.danger-box {
  display: flex;
  gap: 10px;
  padding: 14px;
  border-radius: var(--r-md);
  background: linear-gradient(120deg, #fff3f0, #fff8ef);
  border: 1px solid rgba(242, 85, 95, 0.12);
}
.danger-box .van-icon {
  color: var(--c-danger-deep);
  font-size: 20px;
  flex-shrink: 0;
}
.danger-box p {
  margin: 0;
  font-size: 13px;
  line-height: 1.65;
  color: var(--c-text-sub);
}

.treat-box {
  display: flex;
  gap: 10px;
}
.treat-box .van-icon {
  color: var(--c-safe);
  font-size: 20px;
  flex-shrink: 0;
}
.treat-box p {
  margin: 0;
  font-size: 13px;
  line-height: 1.65;
  color: var(--c-text-sub);
}

.detail-actions {
  display: flex;
  gap: 12px;
  margin-top: 22px;
}
.ghost-btn,
.primary-btn {
  flex: 1;
  border: none;
  border-radius: 999px;
  padding: 13px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.ghost-btn {
  background: var(--c-primary-050);
  color: var(--c-primary-deep);
}
.primary-btn {
  color: #fff;
  background: linear-gradient(145deg, var(--c-primary-soft), var(--c-primary-deep));
  box-shadow: 0 8px 18px rgba(47, 167, 176, 0.3);
}

.empty {
  padding-top: 60px;
}
</style>
