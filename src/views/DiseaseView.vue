<script setup>
import { useRouter } from 'vue-router'
import { diseases } from '@/data/knowledge'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()

function goDetail(id) {
  router.push(`/disease/${id}`)
}
</script>

<template>
  <div>
    <AppHeader title="疾病百科" subtitle="认识 6 种常见蜱相关疾病" back />

    <div class="page">
      <div class="d-list stagger">
        <button
          v-for="d in diseases"
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
              <em class="d-badge" :style="{ background: d.color }">{{ d.category }}</em>
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
        资料依据中国疾控中心等公开指南整理，仅用于识别就医信号；具体诊断与治疗以正规医疗机构为准。
      </div>
    </div>
  </div>
</template>

<style scoped>
.d-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
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
