<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { diseases } from '@/data/knowledge'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()

const filters = [
  { key: 'all', label: '全部' },
  { key: 'high', label: '危重' },
  { key: 'mid', label: '需重视' }
]
const active = ref('all')

const list = computed(() => {
  if (active.value === 'all') return diseases
  return diseases.filter((d) => d.level === active.value)
})

function goDetail(id) {
  router.push(`/disease/${id}`)
}
</script>

<template>
  <div>
    <AppHeader title="疾病百科" subtitle="蜱虫可传播 20 余种疾病，认识常见 6 种" back />

    <div class="page">
      <!-- 过滤 -->
      <div class="filters">
        <button
          v-for="f in filters"
          :key="f.key"
          class="filter-chip tappable"
          :class="{ on: active === f.key }"
          @click="active = f.key"
        >
          {{ f.label }}
        </button>
      </div>

      <div class="d-list stagger">
        <button
          v-for="d in list"
          :key="d.id"
          class="d-row tappable"
          @click="goDetail(d.id)"
        >
          <span class="d-ico" :style="{ color: d.color, background: d.color + '18' }">
            <van-icon :name="d.icon" />
          </span>
          <span class="d-main">
            <span class="d-top">
              <strong>{{ d.name }}</strong>
              <em class="d-badge" :style="{ background: d.color }">{{ d.levelText }}</em>
            </span>
            <small class="d-alias">{{ d.alias }}</small>
            <small class="d-sum">{{ d.summary }}</small>
            <span class="d-meta">
              <span><van-icon name="clock-o" /> 潜伏 {{ d.incubation }}</span>
            </span>
          </span>
          <van-icon name="arrow" class="d-arrow" />
        </button>
      </div>

      <div class="foot-note">
        <van-icon name="info-o" />
        资料整理自中华医学会、中国疾控中心等公开科普，具体诊断请以医院检查为准。
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  margin: 14px 0 4px;
}
.filter-chip {
  border: 1px solid var(--c-line);
  background: #fff;
  color: var(--c-text-sub);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.filter-chip.on {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(145deg, var(--c-primary-soft), var(--c-primary-deep));
  box-shadow: 0 5px 12px rgba(47, 167, 176, 0.28);
}

.d-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}
.d-row {
  border: none;
  text-align: left;
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 14px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.d-ico {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  flex-shrink: 0;
}
.d-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.d-top {
  display: flex;
  align-items: center;
  gap: 8px;
}
.d-top strong {
  font-size: 15.5px;
  color: var(--c-text);
}
.d-badge {
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
}
.d-alias {
  font-size: 11.5px;
  color: var(--c-primary-deep);
  margin-top: 3px;
}
.d-sum {
  font-size: 12px;
  line-height: 1.5;
  color: var(--c-text-sub);
  margin-top: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.d-meta {
  margin-top: 7px;
  font-size: 11px;
  color: var(--c-text-weak);
  display: flex;
  gap: 4px;
  align-items: center;
}
.d-arrow {
  color: var(--c-text-weak);
  align-self: center;
  flex-shrink: 0;
}

.foot-note {
  margin-top: 20px;
  font-size: 11.5px;
  color: var(--c-text-weak);
  line-height: 1.6;
  display: flex;
  gap: 6px;
}
.foot-note .van-icon {
  flex-shrink: 0;
  margin-top: 2px;
}
</style>
