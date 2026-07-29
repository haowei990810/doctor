<script setup>
import { ref } from 'vue'
import { preventions } from '@/data/knowledge'
import AppHeader from '@/components/AppHeader.vue'

const active = ref(0)

const bodyParts = [
  '头皮', '耳后', '颈部', '腋窝', '肚脐', '腹股沟', '腘窝', '脚踝'
]
</script>

<template>
  <div>
    <AppHeader title="预防指南" subtitle="按地区与产品说明做好户外防护" back />

    <div class="page">
      <!-- 季节提示 -->
      <div class="season-card anim-fade-up">
        <div class="season-ico"><van-icon name="fire-o" /></div>
        <div>
          <strong>我国多地 4—10 月需重点防护</strong>
          <p>发热伴血小板减少综合征病例常在 5—7 月出现高峰，但各地季节不同；草地、灌木、林缘和牧场等均可能有蜱。</p>
        </div>
      </div>

      <!-- 四大预防模块 折叠 -->
      <div class="section-title"><span class="bar" /> 四步防护</div>
      <div class="prevent-list stagger">
        <div
          v-for="(p, i) in preventions"
          :key="p.title"
          class="prevent-card"
          :class="{ open: active === i }"
        >
          <button class="pv-head tappable" @click="active = active === i ? -1 : i">
            <span class="pv-ico" :style="{ background: p.color + '1a', color: p.color }">
              <van-icon :name="p.icon" />
            </span>
            <span class="pv-title">
              <em class="pv-step">STEP {{ i + 1 }}</em>
              <strong>{{ p.title }}</strong>
            </span>
            <van-icon name="arrow-down" class="pv-caret" />
          </button>
          <transition name="collapse">
            <ul v-show="active === i" class="pv-points">
              <li v-for="(pt, j) in p.points" :key="j">
                <span class="pt-dot" :style="{ background: p.color }" />
                {{ pt }}
              </li>
            </ul>
          </transition>
        </div>
      </div>

      <!-- 全身检查重点部位 -->
      <div class="section-title"><span class="bar" /> 回家重点自检部位</div>
      <div class="card body-card">
        <p class="body-tip">蜱偏好皮肤薄、隐蔽处，户外后重点检查：</p>
        <div class="body-chips">
          <span v-for="(b, i) in bodyParts" :key="b" class="body-chip" :style="{ animationDelay: (i * 0.05) + 's' }">
            <van-icon name="aim" /> {{ b }}
          </span>
        </div>
        <div class="pet-note">
          <van-icon name="cluster-o" />
          带宠物出行后，也要仔细梳毛检查“毛孩子”体表。
        </div>
      </div>

      <!-- 装备清单 -->
      <div class="section-title"><span class="bar" /> 出行装备清单</div>
      <div class="gear-grid">
        <div class="gear-item card"><van-icon name="gem-o" /><span>浅色长袖长裤</span></div>
        <div class="gear-item card"><van-icon name="shield-o" /><span>正规驱避剂</span></div>
        <div class="gear-item card"><van-icon name="brush-o" /><span>尖头除蜱镊</span></div>
        <div class="gear-item card"><van-icon name="bag-o" /><span>密封小袋/瓶</span></div>
        <div class="gear-item card"><van-icon name="balance-o" /><span>75%酒精/碘伏</span></div>
        <div class="gear-item card"><van-icon name="shrink" /><span>裤脚塞进袜子</span></div>
      </div>

      <div class="foot-note">
        <van-icon name="info-o" />
        以上防护建议依据中国疾控中心、国家疾控局和 CDC 公开指南整理，请按产品标签使用驱避剂。
      </div>
    </div>
  </div>
</template>

<style scoped>
.season-card {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 14px;
  padding: 14px;
  border-radius: var(--r-md);
  background: linear-gradient(120deg, #fff6ec, #fffaf0);
  border: 1px solid rgba(246, 161, 61, 0.15);
}
.season-ico {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(145deg, #ffd18c, #f6a13d);
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.season-card strong {
  font-size: 14.5px;
  color: var(--c-text);
}
.season-card p {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.55;
  color: var(--c-text-sub);
}

.prevent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.prevent-card {
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}
.pv-head {
  width: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
}
.pv-ico {
  width: 42px;
  height: 42px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  flex-shrink: 0;
}
.pv-title {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
}
.pv-step {
  font-style: normal;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--c-text-weak);
  letter-spacing: 1px;
}
.pv-title strong {
  font-size: 15.5px;
  color: var(--c-text);
  margin-top: 1px;
}
.pv-caret {
  color: var(--c-text-weak);
  transition: transform 0.3s ease;
}
.prevent-card.open .pv-caret {
  transform: rotate(180deg);
}
.pv-points {
  padding: 0 16px 16px 68px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pv-points li {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--c-text-sub);
}
.pt-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

/* 折叠动画 */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-6px);
}
.collapse-enter-to,
.collapse-leave-from {
  max-height: 400px;
}

/* 身体部位 */
.body-tip {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--c-text-sub);
}
.body-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}
.body-chip {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--c-primary-deep);
  background: var(--c-primary-050);
  padding: 7px 13px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.body-chip .van-icon {
  font-size: 13px;
}
.pet-note {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px dashed var(--c-line);
  font-size: 12.5px;
  color: var(--c-text-sub);
  display: flex;
  align-items: center;
  gap: 6px;
}
.pet-note .van-icon {
  color: var(--c-warn-deep);
  font-size: 16px;
}

/* 装备 */
.gear-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.gear-item {
  padding: 16px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}
.gear-item .van-icon {
  font-size: 24px;
  color: var(--c-primary-deep);
}
.gear-item span {
  font-size: 12px;
  color: var(--c-text-sub);
  font-weight: 600;
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
