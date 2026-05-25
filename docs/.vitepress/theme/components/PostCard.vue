<template>
  <a :href="withBase(post.url)" class="pc">
    <div class="pc__media" :class="{ 'pc__media--placeholder': !post.cover }">
      <img v-if="post.cover" :src="withBase(post.cover)" :alt="post.title" loading="lazy" />
      <span v-else class="pc__placeholder">{{ pillarLabel }}</span>
    </div>

    <div class="pc__body">
      <div v-if="visibleTags.length" class="pc__tags">
        <span v-for="t in visibleTags" :key="t" class="pc__tag">{{ t }}</span>
        <span v-if="overflow > 0" class="pc__tag pc__tag--more">+{{ overflow }}</span>
      </div>

      <h3 class="pc__title">{{ post.title }}</h3>
      <p v-if="post.excerpt" class="pc__excerpt">{{ post.excerpt }}</p>
      <time class="pc__date">{{ formattedDate }}</time>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import type { Post } from '../posts.data.mts'
import { pillarsBySlug } from '../../data/pillars'

const props = withDefaults(
  defineProps<{ post: Post; maxTags?: number }>(),
  { maxTags: 2 }
)

const visibleTags = computed(() => props.post.tags.slice(0, props.maxTags))
const overflow = computed(() => Math.max(0, props.post.tags.length - props.maxTags))
const pillarLabel = computed(() => pillarsBySlug[props.post.pillar]?.title ?? '')

const formattedDate = computed(() => {
  const d = new Date(props.post.date)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate()
  ).padStart(2, '0')}`
})
</script>

<style scoped>
.pc {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  height: 100%;
}
.pc:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand-1);
}
.pc__media {
  aspect-ratio: 16 / 9;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pc__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.pc:hover .pc__media img {
  transform: scale(1.04);
}
.pc__media--placeholder {
  background: var(--vp-c-bg-soft);
}
.pc__placeholder {
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}
.pc__body {
  padding: 1rem 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}
.pc__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.2rem;
}
.pc__tag {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  background: var(--vp-c-red-soft, #fde8e8);
  color: var(--vp-c-red-1, #c0392b);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.pc__tag--more {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
}
.pc__title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.pc__excerpt {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.pc__date {
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
</style>
