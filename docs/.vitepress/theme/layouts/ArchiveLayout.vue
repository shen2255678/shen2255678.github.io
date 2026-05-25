<template>
  <section class="arch-wrap">
    <header class="arch-hero">
      <h1>歸檔</h1>
      <p class="arch-hero__sub">全部 {{ posts.length }} 篇 Post，按時間倒序排列。</p>
    </header>

    <div v-for="year in years" :key="year" class="arch-year">
      <h2 class="arch-year__title">{{ year }}</h2>
      <ul class="arch-list">
        <li v-for="post in grouped[year]" :key="post.url" class="arch-item">
          <span class="arch-date">{{ formatMonthDay(post.date) }}</span>
          <a :href="withBase(post.url)" class="arch-title">{{ post.title }}</a>
          <span class="arch-pillar">{{ pillarLabel(post.pillar) }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data'
import { pillarsBySlug } from '../../data/pillars'
import type { Post } from '../posts.data'

const grouped = computed(() => {
  const out: Record<string, Post[]> = {}
  for (const post of posts) {
    const year = new Date(post.date).getFullYear().toString()
    ;(out[year] ??= []).push(post)
  }
  return out
})

const years = computed(() =>
  Object.keys(grouped.value).sort((a, b) => Number(b) - Number(a))
)

function formatMonthDay(date: string): string {
  const d = new Date(date)
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
}

function pillarLabel(slug: Post['pillar']): string {
  return pillarsBySlug[slug]?.title ?? slug
}
</script>

<style scoped>
.arch-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}
.arch-hero {
  text-align: center;
  padding: 2rem 0 1rem;
}
.arch-hero h1 {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  font-weight: 700;
}
.arch-hero__sub {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
.arch-year {
  margin-top: 2.5rem;
}
.arch-year__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: var(--vp-c-brand-1);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}
.arch-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.arch-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 0.75rem;
  align-items: baseline;
  padding: 0.6rem 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.arch-date {
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  font-size: 0.88rem;
}
.arch-title {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.arch-title:hover {
  color: var(--vp-c-brand-1);
}
.arch-pillar {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
}
@media (max-width: 640px) {
  .arch-item {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
  .arch-pillar {
    justify-self: start;
  }
}
</style>
