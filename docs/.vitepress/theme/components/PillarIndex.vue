<template>
  <section class="pidx-sec">
    <div class="pidx-head">
      <span class="pidx-head__no">{{ sectionNo }}</span>
      <h2 class="pidx-head__label">{{ heading }}</h2>
      <span class="pidx-head__hint">每篇文章歸屬其中一條</span>
    </div>

    <nav class="pidx" aria-label="五條寫作路線">
      <a
        v-for="(p, i) in pillars"
        :key="p.slug"
        class="pidx__row"
        :href="withBase(`/${p.slug}/`)"
      >
        <span class="pidx__no">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="pidx__name">{{ p.title }}</span>
        <span class="pidx__desc">{{ p.description }}</span>
        <span class="pidx__count">{{ counts[p.slug] }} 篇</span>
        <span class="pidx__go" aria-hidden="true">→</span>
      </a>
    </nav>

    <div v-if="topTags.length" class="pidx__cross">
      <span class="pidx__crosslabel">想看跨路線的主題？</span>
      <a v-for="t in topTags" :key="t" class="tag" :href="withBase(`/tags#${encodeURIComponent(t)}`)">{{ t }}</a>
      <a class="pidx__crossmore" :href="withBase('/tags')">所有標籤 →</a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { pillars } from '../../data/pillars'
import type { PillarSlug } from '../../data/pillars'
import { data as posts } from '../posts.data.mts'

withDefaults(
  defineProps<{ heading?: string; sectionNo?: string; maxTags?: number }>(),
  { heading: '五條寫作路線', sectionNo: '03', maxTags: 5 }
)

const counts = computed(() => {
  const c = {} as Record<PillarSlug, number>
  for (const p of pillars) c[p.slug] = 0
  for (const post of posts) if (c[post.pillar] != null) c[post.pillar]++
  return c
})

const topTags = computed(() => {
  const freq = new Map<string, number>()
  for (const post of posts) for (const t of post.tags) freq.set(t, (freq.get(t) || 0) + 1)
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map((e) => e[0])
})
</script>

<style scoped>
.pidx-sec { padding-top: clamp(2.8rem, 6vw, 4.2rem); }
.pidx-head { display: flex; align-items: baseline; gap: 0.9rem; margin-bottom: 2rem; }
.pidx-head__no { font-family: var(--o-mono); font-size: 0.78rem; color: var(--o-slate); letter-spacing: 0.05em; }
.pidx-head__label { font-family: var(--o-serif); font-weight: 600; font-size: 1.25rem; color: var(--o-t1); margin: 0; }
.pidx-head__hint { margin-left: auto; font-family: var(--o-sans); font-weight: 300; font-size: 0.84rem; color: var(--o-t3); }

.pidx { border-top: 1px solid var(--o-line); }
.pidx__row {
  display: grid;
  grid-template-columns: 2.6rem 8.5rem 1fr auto 1.3rem;
  gap: 1.3rem; align-items: baseline;
  padding: 1.25rem 0.4rem;
  border-bottom: 1px solid var(--o-divider);
  text-decoration: none; color: inherit;
  transition: padding-left 0.3s ease, background 0.3s ease;
}
.pidx__row:hover { background: var(--o-bg-soft); padding-left: 1rem; }
.pidx__row:focus-visible { outline: 2px solid var(--o-slate); outline-offset: -2px; border-radius: 4px; }
.pidx__no { font-family: var(--o-mono); font-size: 0.74rem; color: var(--o-slate); letter-spacing: 0.04em; }
.pidx__name { font-family: var(--o-serif); font-weight: 600; font-size: 1.18rem; color: var(--o-t1); white-space: nowrap; transition: color 0.3s; }
.pidx__desc { font-family: var(--o-sans); font-weight: 300; font-size: 0.9rem; line-height: 1.7; color: var(--o-t2); }
.pidx__count { font-family: var(--o-mono); font-size: 0.72rem; color: var(--o-t3); white-space: nowrap; }
.pidx__go { font-family: var(--o-mono); color: var(--o-t3); text-align: right; transition: color 0.3s, transform 0.3s; }
.pidx__row:hover .pidx__go { color: var(--o-slate); transform: translateX(3px); }
.pidx__row:hover .pidx__name { color: var(--o-slate); }

.pidx__cross { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.8rem; }
.pidx__crosslabel { font-family: var(--o-sans); font-weight: 300; font-size: 0.92rem; color: var(--o-t2); margin-right: 0.35rem; }
.tag {
  font-family: var(--o-mono); font-size: 0.66rem; letter-spacing: 0.03em;
  color: var(--o-slate); background: color-mix(in srgb, var(--o-slate) 12%, var(--o-bg));
  padding: 0.22rem 0.55rem; border-radius: 3px; text-decoration: none; transition: background 0.2s;
}
.tag:hover { background: color-mix(in srgb, var(--o-slate) 20%, var(--o-bg)); }
.pidx__crossmore { font-family: var(--o-mono); font-size: 0.72rem; letter-spacing: 0.06em; color: var(--o-slate); text-decoration: none; margin-left: 0.3rem; }
.pidx__crossmore:hover { text-decoration: underline; }

@media (max-width: 640px) {
  .pidx__row { grid-template-columns: 2.2rem 1fr auto; gap: 0.35rem 1rem; }
  .pidx__no { grid-row: 1; grid-column: 1; }
  .pidx__name { grid-row: 1; grid-column: 2; }
  .pidx__count { grid-row: 1; grid-column: 3; }
  .pidx__desc { grid-row: 2; grid-column: 2 / 4; }
  .pidx__go { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .pidx__row, .pidx__go, .pidx__name, .tag { transition: none; }
  .pidx__row:hover .pidx__go { transform: none; }
}
</style>
