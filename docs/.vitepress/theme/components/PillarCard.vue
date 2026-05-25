<template>
  <a :href="link" class="pillar-card">
    <span class="pillar-card__eyebrow">{{ pillar.navLabel }}</span>
    <h3 class="pillar-card__title">{{ pillar.title }}</h3>
    <p class="pillar-card__desc">{{ pillar.description }}</p>
    <span class="pillar-card__cta">進入 →</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import type { Pillar } from '../../data/pillars'

const props = defineProps<{ pillar: Pillar }>()
const link = computed(() => withBase(`/${props.pillar.slug}/`))
</script>

<style scoped>
.pillar-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s, border-color 0.15s;
}
.pillar-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
}
.pillar-card__eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  font-weight: 500;
}
.pillar-card__title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.pillar-card__desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.55;
  flex: 1;
}
.pillar-card__cta {
  font-size: 0.88rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
