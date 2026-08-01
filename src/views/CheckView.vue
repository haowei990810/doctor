<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { symptomChecklist, evaluate } from '@/data/knowledge'
import { symptomGallery } from '@/data/media'
import MediaGallery from '@/components/MediaGallery.vue'
import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()
const checked = ref({})
const showResult = ref(false)
const bump = ref(false)

function toggle(item) {
  checked.value[item.id] = !checked.value[item.id]
  // 触发分级提示条的轻量反馈
  bump.value = true
  setTimeout(() => (bump.value = false), 320)
}

const selectedCount = computed(
  () => Object.values(checked.value).filter(Boolean).length
)

const selectedIds = computed(() =>
  Object.entries(checked.value)
    .filter(([, value]) => value)
    .map(([id]) => id)
)

const result = computed(() => evaluate(selectedIds.value))

// 只用于三档视觉提示，不代表患病概率或医学评分。
const actionProgress = computed(() => {
  if (selectedCount.value === 0) return 0
  if (result.value.level === 'emergency') return 100
  if (result.value.level === 'urgent') return 62
  return 24
})

const riskLabel = computed(() => {
  if (selectedCount.value === 0) return '尚未选择'
  return result.value.title
})
const riskColor = computed(() =>
  selectedCount.value === 0 ? '#9bb2ae' : result.value.color
)
const actionLabel = computed(() =>
  selectedCount.value === 0 ? '待选择' : result.value.actionLabel
)

function openResult() {
  if (selectedCount.value === 0) return
  showResult.value = true
}
function reset() {
  checked.value = {}
  showResult.value = false
}

// 每组已选数量，用于分组标题的实时提示
function groupSelected(group) {
  return group.items.filter((it) => checked.value[it.id]).length
}
</script>

<template>
  <div>
    <AppHeader title="症状自查" subtitle="分级提示下一步，不计算患病概率" back />

    <!-- 顶部行动分级提示（sticky）：不是患病概率或医学评分 -->
    <div class="risk-panel" aria-live="polite">
      <div class="risk-top">
        <div class="risk-meta">
          <span class="risk-label" :style="{ color: riskColor }">{{ riskLabel }}</span>
          <span class="risk-sub">
            {{ selectedCount ? `已选 ${selectedCount} 项 · 行动分级（非诊断）` : '请按实际情况勾选' }}
          </span>
        </div>
        <div class="risk-score" :class="{ bump }" :style="{ color: riskColor }">
          {{ actionLabel }}
        </div>
      </div>
      <div class="risk-track">
        <div
          class="risk-fill"
          :class="{ bump }"
          :style="{ width: actionProgress + '%', background: `linear-gradient(90deg, ${riskColor}aa, ${riskColor})` }"
        />
      </div>
      <div class="risk-scale">
        <span>继续观察</span><span>尽快就医</span><span>急诊处理</span>
      </div>
    </div>

    <div class="page check-page">
      <div class="stagger">
        <section
          v-for="group in symptomChecklist"
          :key="group.group"
          class="card group-card"
        >
          <div class="group-head">
            <span class="dot" :style="{ background: group.color }" />
            <h3>{{ group.group }}</h3>
            <span
              v-if="groupSelected(group)"
              class="group-count"
              :style="{ background: group.color + '1a', color: group.color }"
            >
              已选 {{ groupSelected(group) }}
            </span>
          </div>
          <ul class="opt-list">
            <li
              v-for="item in group.items"
              :key="item.id"
            >
              <button
                type="button"
                class="opt tappable"
                :class="{ on: checked[item.id] }"
                :aria-pressed="Boolean(checked[item.id])"
                @click="toggle(item)"
              >
                <span class="checkbox" :class="{ on: checked[item.id] }">
                  <van-icon v-if="checked[item.id]" name="success" />
                </span>
                <span class="opt-text">
                  {{ item.text }}
                  <em v-if="item.flag" class="key-flag" :class="item.triage">{{ item.flag }}</em>
                </span>
              </button>
            </li>
          </ul>
        </section>
      </div>

      <!-- 皮肤表现对照：真实图片（默认模糊，点按查看） -->
      <div class="ref-block">
        <div class="ref-head">
          <span class="ref-ico"><van-icon name="photo-o" /></span>
          <div>
            <strong>皮肤表现对照图</strong>
            <small>真实医学图片，默认模糊，点击后查看</small>
          </div>
        </div>
        <MediaGallery :items="symptomGallery" sensitive />
      </div>

      <!-- 行内操作区（随内容滚动，不与底部导航冲突） -->
      <div class="check-actions">
        <button
          class="eval-btn tappable"
          :class="{ disabled: selectedCount === 0 }"
          :disabled="selectedCount === 0"
          @click="openResult"
        >
          <van-icon name="records" />
          {{ selectedCount === 0 ? '请先勾选症状' : `查看行动建议 (${selectedCount})` }}
        </button>
        <button v-if="selectedCount" class="reset-link" @click="reset">
          <van-icon name="replay" /> 清空重选
        </button>
      </div>

      <p class="mini-tip">
        <van-icon name="info-o" /> 本工具不计算患病概率，不能排除疾病或替代医生诊断。
      </p>
    </div>

    <!-- 结果弹窗 -->
    <van-popup
      v-model:show="showResult"
      position="bottom"
      round
      closeable
      close-icon="cross"
      :style="{ maxHeight: '88%' }"
    >
      <div class="result-sheet">
        <div class="result-hero" :style="{ background: result.color + '14' }">
          <div class="result-ring" :style="{ borderColor: result.color }">
            <span class="pulse" :style="{ background: result.color }" />
            <van-icon
              :name="result.level === 'observe' ? 'checked' : 'warning'"
              :style="{ color: result.color }"
            />
          </div>
          <h2 :style="{ color: result.color }">{{ result.title }}</h2>
          <div class="score-chip">已选 {{ selectedCount }} 项 · 行动分级，不是诊断</div>
        </div>

        <div class="result-body">
          <p class="result-desc">{{ result.desc }}</p>

          <div class="advice-title"><span class="bar" /> 建议行动</div>
          <ul class="advice-list">
            <li v-for="(a, i) in result.advice" :key="i">
              <span class="num" :style="{ background: result.color }">{{ i + 1 }}</span>
              {{ a }}
            </li>
          </ul>

          <!-- 仅明确急症信号直达急救 -->
          <a v-if="result.level === 'emergency'" class="call-btn tappable" href="tel:120">
            <van-icon name="phone-o" /> 立即拨打 120
          </a>

          <div class="result-actions">
            <button class="ghost-btn tappable" @click="router.push('/handle')">
              <van-icon name="plus" /> 处理方法
            </button>
            <button class="primary-btn tappable" @click="router.push('/disease')">
              <van-icon name="notes-o" /> 了解相关疾病
            </button>
          </div>
          <button class="link-btn" @click="reset">重新自查</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style scoped>
/* 顶部实时风险仪表 */
.risk-panel {
  position: sticky;
  top: var(--safe-top);
  z-index: 20;
  margin: 0 16px;
  margin-top: -6px;
  background: #fff;
  border-radius: var(--r-md);
  box-shadow: var(--shadow-md);
  padding: 14px 16px 12px;
}
.risk-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.risk-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.risk-label {
  font-size: 16px;
  font-weight: 800;
  transition: color 0.3s ease;
}
.risk-sub {
  font-size: 11.5px;
  color: var(--c-text-weak);
  margin-top: 2px;
}
.risk-score {
  flex-shrink: 0;
  margin-left: 12px;
  font-size: 17px;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  transition: color 0.3s ease, transform 0.3s ease;
}
.risk-score.bump {
  transform: scale(1.14);
}
.risk-track {
  margin-top: 10px;
  height: 9px;
  border-radius: 999px;
  background: #eef3f1;
  overflow: hidden;
}
.risk-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.45s cubic-bezier(0.34, 1.4, 0.64, 1), background 0.3s ease;
}
.risk-fill.bump {
  filter: brightness(1.08);
}
.risk-scale {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 10px;
  color: var(--c-text-weak);
}

.check-page {
  padding-top: 14px;
}

.group-card {
  margin-bottom: 14px;
}
.group-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.group-head .dot {
  width: 10px;
  height: 10px;
}
.group-head h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
}
.group-count {
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 999px;
}

.opt-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.opt {
  width: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 10px;
  border-radius: var(--r-sm);
  text-align: left;
  font-family: inherit;
  transition: background 0.2s ease;
}
.opt.on {
  background: var(--c-primary-050);
}
.checkbox {
  width: 23px;
  height: 23px;
  border-radius: 7px;
  border: 2px solid #d6e4e0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.checkbox.on {
  background: linear-gradient(145deg, var(--c-primary-soft), var(--c-primary-deep));
  border-color: var(--c-primary);
  transform: scale(1.08);
}
.opt-text {
  font-size: 14px;
  line-height: 1.5;
  color: var(--c-text);
}
.key-flag {
  font-style: normal;
  font-size: 10px;
  font-weight: 700;
  color: var(--c-warn-deep);
  background: #fff7ec;
  padding: 1px 6px;
  border-radius: 999px;
  margin-left: 4px;
  vertical-align: middle;
}
.key-flag.emergency {
  color: var(--c-danger-deep);
  background: #fff0f0;
}

/* 皮肤对照图区块 */
.ref-block {
  margin-top: 18px;
}
.ref-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.ref-ico {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--c-primary-050);
  color: var(--c-primary-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.ref-head strong {
  font-size: 14.5px;
  color: var(--c-text);
  display: block;
}
.ref-head small {
  font-size: 11px;
  color: var(--c-text-weak);
}

/* 行内操作 */
.check-actions {
  margin-top: 20px;
}
.eval-btn {
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(145deg, var(--c-primary-soft), var(--c-primary-deep));
  box-shadow: 0 10px 22px rgba(47, 167, 176, 0.34);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.eval-btn.disabled {
  background: #e3ede9;
  box-shadow: none;
  color: #8299a0;
}
.reset-link {
  width: 100%;
  margin-top: 12px;
  border: none;
  background: transparent;
  color: var(--c-text-sub);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.mini-tip {
  margin: 16px 0 0;
  text-align: center;
  font-size: 11.5px;
  color: var(--c-text-weak);
}
.mini-tip .van-icon {
  vertical-align: -1px;
}

/* 结果弹窗 */
.result-sheet {
  overflow: hidden;
}
.result-hero {
  text-align: center;
  padding: 28px 20px 22px;
}
.result-ring {
  position: relative;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  border: 3px solid;
  margin: 0 auto 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  background: #fff;
}
.pulse {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  opacity: 0.3;
  animation: pulseRing 1.8s ease-out infinite;
}
.result-hero h2 {
  margin: 0 0 8px;
  font-size: 21px;
  font-weight: 800;
}
.score-chip {
  display: inline-block;
  font-size: 12px;
  color: var(--c-text-sub);
  background: #fff;
  padding: 4px 12px;
  border-radius: 999px;
}
.result-body {
  padding: 20px;
  padding-bottom: calc(20px + var(--safe-bottom));
}
.result-desc {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--c-text);
}
.advice-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 12px;
}
.advice-title .bar {
  width: 4px;
  height: 15px;
  border-radius: 3px;
  background: linear-gradient(180deg, var(--c-primary-soft), var(--c-primary-deep));
}
.advice-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
}
.advice-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  color: var(--c-text-sub);
}
.advice-list .num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.call-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 13px;
  margin-bottom: 14px;
  border-radius: 999px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  background: linear-gradient(145deg, #ff9a8b, #f2555f);
  box-shadow: 0 8px 18px rgba(242, 85, 95, 0.3);
}
.result-actions {
  display: flex;
  gap: 12px;
}
.ghost-btn,
.primary-btn {
  flex: 1;
  border-radius: 999px;
  padding: 13px;
  font-size: 15px;
  font-weight: 700;
  border: none;
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
.link-btn {
  width: 100%;
  margin-top: 14px;
  border: none;
  background: transparent;
  color: var(--c-text-sub);
  font-size: 13px;
  padding: 6px;
}
</style>
