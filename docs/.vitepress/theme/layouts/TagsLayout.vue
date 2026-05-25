<template>
  <section class="tag-wrap">
    <header class="tag-hero">
      <h1>標籤</h1>
      <p class="tag-hero__sub">
        {{ allTags.length }} 個標籤，{{ posts.length }} 篇 Post。
        標籤跨 Pillar — 同一個標籤可能在不同支柱底下出現。
      </p>
    </header>

    <div class="tag-cloud">
      <button
        type="button"
        :class="['tag-chip', { 'tag-chip--active': active === '' }]"
        @click="active = ''"
      >
        全部 <span class="tag-chip__count">{{ posts.length }}</span>
      </button>
      <button
        v-for="t in allTags"
        :key="t.name"
        type="button"
        :class="['tag-chip', { 'tag-chip--active': active === t.name }]"
        @click="active = t.name"
      >
        {{ t.name }} <span class="tag-chip__count">{{ t.count }}</span>
      </button>
    </div>

    <ul class="tag-list">
      <li v-for="post in filtered" :key="post.url" class="tag-item">
        <a :href="withBase(post.url)" class="tag-title">{{ post.title }}</a>
        <div class="tag-meta">
          <span class="tag-pillar">{{ pillarLabel(post.pillar) }}</span>
          <span class="tag-date">{{ post.date.substring(0, 10) }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data'
import { pillarsBySlug } from '../../data/pillars'
import type { Post } from '../posts.data'

const active = ref('')

const allTags = computed(() => {
  const counts: Record<string, number> = {}
  for (const post of posts) for (const t of post.tags) counts[t] = (counts[t] ?? 0) + 1
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
})

const filtered = computed(() => {
  if (!active.value) return posts
  return posts.filter((p: Post) => p.tags.includes(active.value))
})

function pillarLabel(slug: Post['pillar']): string {
  return pillarsBySlug[slug]?.title ?? slug
}
</script>

<style scoped>
.tag-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}
.tag-hero {
  text-align: center;
  padding: 2rem 0 1rem;
}
.tag-hero h1 {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  font-weight: 700;
}
.tag-hero__sub {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0 2rem;
  justify-content: center;
}
.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.88rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.tag-chip:hover {
  border-color: var(--vp-c-brand-1);
}
.tag-chip--active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.tag-chip__count {
  font-size: 0.78rem;
  opacity: 0.75;
}
.tag-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tag-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.6rem 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.tag-title {
  color: var(--vp-c-text-1);
  text-decoration: none;
  flex: 1;
}
.tag-title:hover {
  color: var(--vp-c-brand-1);
}
.tag-meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.85rem;
}
.tag-pillar {
  color: var(--vp-c-text-2);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
}
.tag-date {
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
</style>
