<template>
  <a
    class="pjc"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <span v-if="index" class="pjc__no">{{ index }}</span>
    <div class="pjc__body">
      <h3 class="pjc__title">{{ title }}</h3>
      <p class="pjc__desc">{{ description }}</p>
      <div v-if="stack.length || status" class="pjc__stack">
        <span v-for="s in stack" :key="s">{{ s }}</span>
        <span v-if="status" class="pjc__status">{{ status }}</span>
      </div>
    </div>
    <span class="pjc__go" aria-hidden="true">{{ isExternal ? '↗' : '→' }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = withDefaults(
  defineProps<{
    title: string
    description: string
    link: string
    index?: string
    stack?: string[]
    status?: string
  }>(),
  { index: '', stack: () => [], status: '' }
)

const isExternal = computed(() => /^https?:\/\//.test(props.link))
const href = computed(() => (isExternal.value ? props.link : withBase(props.link)))
</script>

<style scoped>
.pjc {
  display: grid;
  grid-template-columns: 3.2rem 1fr auto;
  gap: 1.4rem;
  text-decoration: none;
  color: inherit;
  padding: 1.5rem 0.4rem;
  border-top: 1px solid var(--o-divider);
  transition: background 0.3s, padding-left 0.3s;
  align-items: start;
}
.pjc:hover { background: var(--o-bg-soft); padding-left: 1rem; }
.pjc:focus-visible { outline: 2px solid var(--o-slate); outline-offset: 2px; border-radius: 4px; }
.pjc__no { font-family: var(--o-mono); font-size: 0.95rem; color: var(--o-t3); padding-top: 0.2rem; transition: color 0.3s; }
.pjc:hover .pjc__no { color: var(--o-slate); }
.pjc__title { font-family: var(--o-serif); font-weight: 600; font-size: 1.3rem; color: var(--o-t1); margin: 0 0 0.5rem; line-height: 1.4; transition: color 0.25s; }
.pjc:hover .pjc__title { color: var(--o-slate); }
.pjc__desc { font-family: var(--o-sans); font-weight: 300; font-size: 0.93rem; line-height: 1.8; color: var(--o-t2); margin: 0; max-width: 40em; }
.pjc__stack { font-family: var(--o-mono); font-size: 0.68rem; letter-spacing: 0.08em; color: var(--o-t3); margin-top: 0.85rem; display: flex; gap: 1rem; flex-wrap: wrap; }
.pjc__status { color: var(--o-slate); }
.pjc__go { font-family: var(--o-mono); font-size: 1.1rem; color: var(--o-t3); padding-top: 0.1rem; transition: color 0.3s, transform 0.3s; }
.pjc:hover .pjc__go { color: var(--o-slate); transform: translateX(3px); }
@media (max-width: 600px) {
  .pjc { grid-template-columns: 2.4rem 1fr; }
  .pjc__go { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .pjc, .pjc__go, .pjc__no, .pjc__title { transition: none; }
  .pjc:hover .pjc__go { transform: none; }
}
</style>
