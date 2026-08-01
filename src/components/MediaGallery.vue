<script setup>
import { ref } from 'vue'
import { showImagePreview } from 'vant'
import 'vant/es/image-preview/style'

const props = defineProps({
  items: { type: Array, required: true },
  // 是否默认对图片做轻微模糊（真实医学图片，点按查看）
  sensitive: { type: Boolean, default: false }
})

const revealed = ref(props.sensitive ? {} : null)

function onTap(index) {
  if (props.sensitive && !revealed.value[index]) {
    revealed.value[index] = true
    return
  }
  showImagePreview({
    images: props.items.map((i) => i.src),
    startPosition: index,
    closeable: true
  })
}
</script>

<template>
  <div class="gallery">
    <figure
      v-for="(it, i) in items"
      :key="it.src"
      class="g-item tappable"
      @click="onTap(i)"
    >
      <div class="g-imgwrap">
        <img
          :src="it.src"
          :alt="it.title"
          class="g-img"
          :class="{ blurred: sensitive && !revealed[i] }"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
        <span v-if="it.tag" class="g-tag">{{ it.tag }}</span>
        <span v-if="sensitive && !revealed[i]" class="g-mask">
          <van-icon name="eye-o" />
          <em>点击查看真实图片</em>
        </span>
        <span v-else class="g-zoom"><van-icon name="expand-o" /></span>
      </div>
      <figcaption class="g-cap">
        <strong>{{ it.title }}</strong>
        <small>{{ it.desc }}</small>
        <span class="g-credit">{{ it.credit }}</span>
      </figcaption>
    </figure>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.g-item {
  background: var(--c-card);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  margin: 0;
}
.g-imgwrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #eef3f1;
}
.g-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;
}
.g-item:active .g-img {
  transform: scale(1.04);
}
.g-img.blurred {
  filter: blur(11px);
  transform: scale(1.1);
}
.g-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  background: rgba(242, 85, 95, 0.9);
  padding: 3px 8px;
  border-radius: 999px;
}
.g-mask {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #fff;
  background: rgba(31, 59, 56, 0.34);
  font-size: 22px;
}
.g-mask em {
  font-style: normal;
  font-size: 11px;
  font-weight: 600;
}
.g-zoom {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.32);
  color: #fff;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.g-cap {
  padding: 10px 11px 12px;
  display: flex;
  flex-direction: column;
}
.g-cap strong {
  font-size: 13px;
  color: var(--c-text);
}
.g-cap small {
  font-size: 11px;
  color: var(--c-text-sub);
  line-height: 1.45;
  margin-top: 3px;
}
.g-credit {
  font-size: 9.5px;
  color: var(--c-text-weak);
  margin-top: 6px;
}
</style>
