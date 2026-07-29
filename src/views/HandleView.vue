<script setup>
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { removeSteps, dontList, seeDoctorSigns } from '@/data/knowledge'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()

onMounted(async () => {
  await nextTick()
  if (route.hash) {
    const el = document.querySelector(route.hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})
</script>

<template>
  <div>
    <AppHeader title="正确处理" subtitle="尽快移除 · 清洁 · 记录 · 观察" back />

    <div class="page">
      <!-- 顶部警示 -->
      <div class="alert-card anim-fade-up">
        <div class="alert-ico"><van-icon name="warning-o" /></div>
        <div>
          <strong>发现正在吸血的蜱虫，先冷静！</strong>
          <p>应尽快用镊子稳定移除；不要火烧、涂油、捏压或反复扭拽。</p>
        </div>
      </div>

      <!-- 六步处理时间线 -->
      <div class="section-title"><span class="bar" /> 六步科学移除</div>
      <div class="timeline stagger">
        <div v-for="s in removeSteps" :key="s.step" class="tl-item">
          <div class="tl-left">
            <span class="tl-node">{{ s.step }}</span>
            <span v-if="s.step !== removeSteps.length" class="tl-line" />
          </div>
          <div class="tl-card card">
            <div class="tl-head">
              <span class="tl-ico"><van-icon :name="s.icon" /></span>
              <h3>{{ s.title }}</h3>
            </div>
            <p class="tl-desc">{{ s.desc }}</p>
            <div v-if="s.tips && s.tips.length" class="tl-tips">
              <span v-for="(t, i) in s.tips" :key="i" class="tl-tip">
                <van-icon name="bulb-o" /> {{ t }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 禁止操作 -->
      <div id="dont" class="section-title"><span class="bar" /> 千万别这样做</div>
      <div class="dont-grid stagger">
        <div v-for="(d, i) in dontList" :key="i" class="dont-card">
          <div class="dont-x"><van-icon name="cross" /></div>
          <strong>{{ d.text }}</strong>
          <p>{{ d.reason }}</p>
        </div>
      </div>

      <!-- 就医指征 -->
      <div id="doctor" class="section-title"><span class="bar" /> 何时就医或急诊</div>
      <div class="card doctor-card">
        <p class="doctor-tip">
          请按症状紧急程度就医，并主动告知医生
          <em>“我有蜱叮咬或野外暴露史”</em>：
        </p>
        <ul class="doctor-list">
          <li v-for="(sign, i) in seeDoctorSigns" :key="i">
            <span class="dm-ico"><van-icon name="checked" /></span>
            {{ sign }}
          </li>
        </ul>
        <a class="call-btn tappable" href="tel:120">
          <van-icon name="phone-o" /> 呼吸/意识等急症拨打 120
        </a>
      </div>

      <!-- 观察提示 -->
      <div class="watch-card">
        <van-icon name="clock-o" />
        <div>
          <strong>重点观察 2 周，之后数周仍需留意</strong>
          <p>记录叮咬与移除时间，留意发热、逐渐扩大的红斑、明显乏力等。进行性肢体无力、呼吸困难、意识改变或大量难止出血属于急症信号。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert-card {
  display: flex;
  gap: 12px;
  align-items: center;
  background: linear-gradient(120deg, #fff3f0, #fff8ef);
  border: 1px solid rgba(242, 85, 95, 0.15);
  border-radius: var(--r-md);
  padding: 14px;
  margin-top: 14px;
}
.alert-ico {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(145deg, #ff9a8b, #f2555f);
  color: #fff;
  font-size: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: floatY 3s ease-in-out infinite;
}
.alert-card strong {
  font-size: 15px;
  color: var(--c-text);
}
.alert-card p {
  margin: 4px 0 0;
  font-size: 12.5px;
  color: var(--c-text-sub);
}

/* 时间线 */
.timeline {
  display: flex;
  flex-direction: column;
}
.tl-item {
  display: flex;
  gap: 12px;
}
.tl-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}
.tl-node {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(145deg, var(--c-primary-soft), var(--c-primary-deep));
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 12px rgba(47, 167, 176, 0.3);
  z-index: 2;
}
.tl-line {
  flex: 1;
  width: 2px;
  background: linear-gradient(180deg, var(--c-primary-soft), transparent);
  margin: 2px 0;
}
.tl-card {
  flex: 1;
  margin-bottom: 14px;
  padding: 14px;
}
.tl-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.tl-ico {
  color: var(--c-primary-deep);
  font-size: 18px;
}
.tl-head h3 {
  margin: 0;
  font-size: 15.5px;
  font-weight: 700;
}
.tl-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--c-text-sub);
}
.tl-tips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.tl-tip {
  font-size: 11px;
  color: var(--c-warn-deep);
  background: #fff7ec;
  padding: 3px 9px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

/* 禁止操作 */
.dont-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.dont-card {
  background: #fff;
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  padding: 14px;
  border: 1px solid rgba(242, 85, 95, 0.1);
}
.dont-x {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #fff0f0;
  color: var(--c-danger-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin-bottom: 8px;
}
.dont-card strong {
  font-size: 14px;
  color: var(--c-text);
}
.dont-card p {
  margin: 5px 0 0;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--c-text-weak);
}

/* 就医 */
.doctor-card {
  border: 1px solid rgba(242, 85, 95, 0.12);
}
.doctor-tip {
  margin: 0 0 12px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--c-text);
}
.doctor-tip em {
  font-style: normal;
  color: var(--c-danger-deep);
  font-weight: 700;
}
.doctor-list {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.doctor-list li {
  display: flex;
  gap: 10px;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--c-text-sub);
}
.dm-ico {
  color: var(--c-danger);
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}
.call-btn {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 13px;
  border-radius: 999px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  background: linear-gradient(145deg, #ff9a8b, #f2555f);
  box-shadow: 0 8px 18px rgba(242, 85, 95, 0.3);
}

.watch-card {
  margin-top: 18px;
  display: flex;
  gap: 12px;
  padding: 14px;
  border-radius: var(--r-md);
  background: rgba(109, 180, 240, 0.09);
}
.watch-card .van-icon {
  color: var(--c-info);
  font-size: 22px;
  flex-shrink: 0;
}
.watch-card strong {
  font-size: 14px;
  color: var(--c-text);
}
.watch-card p {
  margin: 5px 0 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--c-text-sub);
}
</style>
