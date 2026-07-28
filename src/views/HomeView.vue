<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { facts, diseases } from '@/data/knowledge'

const router = useRouter()

const modules = [
  { key: 'check', title: '症状自查', desc: '勾选症状·实时评估', icon: 'search', path: '/check', from: '#6fe0c0', to: '#3fbfa3' },
  { key: 'handle', title: '正确处理', desc: '六步拔虫·避坑', icon: 'plus', path: '/handle', from: '#8fd3ff', to: '#6db4f0' },
  { key: 'disease', title: '疾病百科', desc: '六大蜱媒疾病', icon: 'notes-o', path: '/disease', from: '#ffd18c', to: '#f6a13d' },
  { key: 'prevent', title: '预防指南', desc: '户外防护要点', icon: 'shield-o', path: '/prevent', from: '#a6e3b8', to: '#59cf9a' }
]

// 首页直给的“应急三步”，让被咬用户无需跳转即可获得核心指引
const emergency = [
  { no: 1, title: '别硬拔·别火烧', desc: '硬拔/拍打/火烧/涂油都会让蜱虫注入更多毒素', icon: 'warning-o', bad: true },
  { no: 2, title: '尖镊贴皮垂直拔', desc: '尖头镊子贴皮肤夹住头部，垂直匀速向上拔出', icon: 'aim' },
  { no: 3, title: '消毒并观察就医', desc: '碘伏消毒，2-4 周内发热/皮疹立即就医并说明咬史', icon: 'eye-o' }
]

const previewDiseases = diseases.slice(0, 3)
const factList = ref(facts)

function goModule(m) {
  router.push(m.path)
}
function goDisease(id) {
  router.push(`/disease/${id}`)
}
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <span class="ring r1" />
        <span class="ring r2" />
        <span class="ring r3" />
      </div>
      <div class="hero-top">
        <div class="brand">
          <img src="/logo.svg" alt="蜱护 logo" class="logo" />
          <div class="brand-text">
            <h1>蜱护 <span class="pin">TickGuard</span></h1>
            <p>蜱虫叮咬 · 自查 · 处理 · 科普</p>
          </div>
        </div>
      </div>

      <div class="hero-card">
        <div class="hc-left">
          <div class="hc-badge">被蜱虫咬了？先别慌</div>
          <h2>3 步搞清怎么办</h2>
          <p>自查症状 → 判断风险 → 科学处理</p>
        </div>
        <div class="hc-tick" aria-hidden="true">
          <div class="tick-body">
            <span class="leg l1" /><span class="leg l2" /><span class="leg l3" />
            <span class="leg r1" /><span class="leg r2" /><span class="leg r3" />
          </div>
        </div>
      </div>

      <!-- 双主按钮：最高频诉求直达 -->
      <div class="hero-cta">
        <button class="cta cta-primary tappable" @click="router.push('/check')">
          <van-icon name="search" />
          <span><strong>症状自查</strong><small>我有哪些症状</small></span>
        </button>
        <button class="cta cta-second tappable" @click="router.push('/handle')">
          <van-icon name="plus" />
          <span><strong>怎么处理</strong><small>正确取出蜱虫</small></span>
        </button>
      </div>
    </section>

    <div class="page">
      <!-- 应急三步：首页直给，不必跳转 -->
      <div class="section-title">
        <span class="bar" /> 应急三步走
        <span class="more" @click="router.push('/handle')">详细步骤 <van-icon name="arrow" /></span>
      </div>
      <div class="sos-list stagger">
        <div
          v-for="e in emergency"
          :key="e.no"
          class="sos-item tappable"
          :class="{ bad: e.bad }"
          @click="router.push('/handle')"
        >
          <span class="sos-no" :class="{ bad: e.bad }">{{ e.no }}</span>
          <span class="sos-ico"><van-icon :name="e.icon" /></span>
          <span class="sos-body">
            <strong>{{ e.title }}</strong>
            <small>{{ e.desc }}</small>
          </span>
        </div>
      </div>

      <!-- 功能导航 -->
      <div class="section-title"><span class="bar" /> 功能导航</div>
      <div class="modules stagger">
        <button
          v-for="m in modules"
          :key="m.key"
          class="mod-card tappable"
          @click="goModule(m)"
        >
          <span
            class="mod-icon"
            :style="{ background: `linear-gradient(145deg, ${m.from}, ${m.to})` }"
          >
            <van-icon :name="m.icon" />
          </span>
          <span class="mod-body">
            <strong>{{ m.title }}</strong>
            <small>{{ m.desc }}</small>
          </span>
        </button>
      </div>

      <!-- 常见蜱媒疾病：纵向列表 -->
      <div class="section-title">
        <span class="bar" /> 常见蜱媒疾病
        <span class="more" @click="router.push('/disease')">全部 <van-icon name="arrow" /></span>
      </div>
      <div class="d-list stagger">
        <button
          v-for="d in previewDiseases"
          :key="d.id"
          class="d-row tappable"
          @click="goDisease(d.id)"
        >
          <span class="d-ico" :style="{ color: d.color, background: d.color + '18' }">
            <van-icon :name="d.icon" />
          </span>
          <span class="d-main">
            <span class="d-top">
              <strong>{{ d.name }}</strong>
              <em class="d-badge" :style="{ background: d.color }">{{ d.levelText }}</em>
            </span>
            <small class="d-sum">{{ d.summary }}</small>
          </span>
          <van-icon name="arrow" class="d-arrow" />
        </button>
      </div>

      <!-- 蜱虫小知识 -->
      <div class="section-title"><span class="bar" /> 蜱虫小知识</div>
      <van-swipe
        class="fact-swipe"
        :autoplay="4000"
        indicator-color="#3fbfa3"
        :loop="true"
      >
        <van-swipe-item v-for="(f, i) in factList" :key="i">
          <div class="fact-card">
            <span class="fact-no">{{ String(i + 1).padStart(2, '0') }}</span>
            <p>{{ f }}</p>
          </div>
        </van-swipe-item>
      </van-swipe>

      <!-- 免责声明 -->
      <div class="disclaimer">
        <van-icon name="info-o" />
        <p>本站为健康科普信息，整理自中国疾控中心、中华医学会等公开资料，不能替代专业医疗诊断。出现不适请及时就医。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  padding: calc(var(--safe-top) + 18px) 16px 10px;
  background: linear-gradient(150deg, #e7fbf2 0%, #e3f3fb 60%, #f4faf8 100%);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(63, 191, 163, 0.18);
}
.r1 { width: 160px; height: 160px; top: -60px; right: -40px; animation: floatY 7s ease-in-out infinite; }
.r2 { width: 100px; height: 100px; top: 30px; right: 40px; border-color: rgba(109,180,240,0.18); animation: floatY 6s ease-in-out infinite 1s; }
.r3 { width: 60px; height: 60px; top: 100px; left: -20px; border-color: rgba(63,191,163,0.14); animation: floatY 8s ease-in-out infinite 0.5s; }

.hero-top {
  position: relative;
  z-index: 2;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo {
  width: 52px;
  height: 52px;
  filter: drop-shadow(0 6px 10px rgba(47, 167, 176, 0.28));
  animation: pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.brand-text h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: var(--c-text);
}
.brand-text .pin {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-primary-deep);
  letter-spacing: 1px;
  margin-left: 2px;
}
.brand-text p {
  margin: 2px 0 0;
  font-size: 12.5px;
  color: var(--c-text-sub);
}

.hero-card {
  position: relative;
  z-index: 2;
  margin-top: 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(120deg, #ffffff 0%, #f3fdf9 100%);
  border: 1px solid rgba(63, 191, 163, 0.12);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 16px;
  animation: fadeUp 0.5s ease both 0.1s;
}
.hc-left { flex: 1; z-index: 2; }
.hc-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: var(--c-danger-deep);
  background: #fff0f0;
  padding: 3px 9px;
  border-radius: 999px;
}
.hc-left h2 {
  margin: 8px 0 4px;
  font-size: 20px;
  font-weight: 800;
  color: var(--c-text);
}
.hc-left p {
  margin: 0;
  font-size: 13px;
  color: var(--c-text-sub);
}

/* 蜱虫爬动装饰 */
.hc-tick {
  position: relative;
  z-index: 1;
  width: 40px;
  flex-shrink: 0;
  opacity: 0.9;
}
.tick-body {
  position: relative;
  width: 26px;
  height: 32px;
  margin: 0 auto;
  border-radius: 50% 50% 48% 48%;
  background: radial-gradient(circle at 50% 30%, #8a5a3c, #5c3a24);
  animation: crawl 2.6s ease-in-out infinite;
}
.tick-body::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4a2f1e;
}
.leg {
  position: absolute;
  width: 9px;
  height: 2.4px;
  border-radius: 2px;
  background: #5c3a24;
  top: 8px;
}
.leg.l1 { left: -8px; transform: rotate(18deg); }
.leg.l2 { left: -9px; top: 14px; transform: rotate(2deg); }
.leg.l3 { left: -8px; top: 20px; transform: rotate(-16deg); }
.leg.r1 { right: -8px; transform: rotate(-18deg); }
.leg.r2 { right: -9px; top: 14px; transform: rotate(-2deg); }
.leg.r3 { right: -8px; top: 20px; transform: rotate(16deg); }

/* 双主按钮 */
.hero-cta {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 12px;
  margin-top: 14px;
}
.cta {
  flex: 1;
  border: none;
  border-radius: var(--r-md);
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
}
.cta .van-icon {
  font-size: 22px;
  flex-shrink: 0;
}
.cta span {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.cta strong { font-size: 15px; }
.cta small { font-size: 11px; opacity: 0.85; margin-top: 2px; }
.cta-primary {
  color: #fff;
  background: linear-gradient(145deg, var(--c-primary-soft), var(--c-primary-deep));
  box-shadow: 0 8px 18px rgba(47, 167, 176, 0.32);
}
.cta-second {
  color: var(--c-primary-deep);
  background: #fff;
  box-shadow: var(--shadow-card);
}

/* 应急三步 */
.sos-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sos-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 13px 14px;
  border-left: 4px solid var(--c-primary);
}
.sos-item.bad {
  border-left-color: var(--c-danger);
}
.sos-no {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--c-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sos-no.bad { background: var(--c-danger); }
.sos-ico {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: var(--c-primary-050);
  color: var(--c-primary-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  flex-shrink: 0;
}
.sos-item.bad .sos-ico { background: #fff0f0; color: var(--c-danger-deep); }
.sos-body { display: flex; flex-direction: column; min-width: 0; }
.sos-body strong { font-size: 14.5px; color: var(--c-text); }
.sos-body small {
  font-size: 11.5px;
  color: var(--c-text-sub);
  margin-top: 3px;
  line-height: 1.4;
}

/* 模块 2×2 */
.modules {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.mod-card {
  border: none;
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
}
.mod-icon {
  width: 42px;
  height: 42px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 21px;
  flex-shrink: 0;
  box-shadow: 0 6px 12px rgba(47, 167, 176, 0.22);
}
.mod-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.mod-body strong {
  font-size: 15px;
  color: var(--c-text);
}
.mod-body small {
  font-size: 11px;
  color: var(--c-text-weak);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 疾病纵向列表 */
.d-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.d-row {
  border: none;
  text-align: left;
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.d-ico {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.d-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.d-top { display: flex; align-items: center; gap: 8px; }
.d-top strong { font-size: 15px; color: var(--c-text); }
.d-badge {
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
  font-style: normal;
}
.d-sum {
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--c-text-sub);
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.d-arrow { color: var(--c-text-weak); flex-shrink: 0; }

/* 知识轮播 */
.fact-swipe {
  border-radius: var(--r-md);
  overflow: hidden;
}
.fact-card {
  position: relative;
  background: linear-gradient(120deg, #f0fdf8, #eaf6fd);
  padding: 20px 18px 30px;
  min-height: 86px;
  display: flex;
  align-items: center;
}
.fact-no {
  font-size: 34px;
  font-weight: 800;
  color: rgba(63, 191, 163, 0.28);
  margin-right: 12px;
  line-height: 1;
}
.fact-card p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--c-text);
}

.disclaimer {
  margin: 22px 0 8px;
  display: flex;
  gap: 8px;
  padding: 12px 14px;
  background: rgba(109, 180, 240, 0.08);
  border-radius: var(--r-sm);
  color: var(--c-text-sub);
}
.disclaimer .van-icon {
  color: var(--c-info);
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}
.disclaimer p {
  margin: 0;
  font-size: 11.5px;
  line-height: 1.6;
}
</style>
