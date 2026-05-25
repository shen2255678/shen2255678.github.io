<template>
  <section class="arch-wrap">
    <header class="arch-hero">
      <nav class="arch-crumb">
        <a :href="withBase('/')">首頁</a>
        <span aria-hidden="true">›</span>
        <span>文章列表</span>
      </nav>
      <div class="arch-hero__row">
        <div>
          <h1 class="arch-hero__title">文章</h1>
          <p class="arch-hero__sub">把寫過的全部攤開來，依時間倒序。</p>
        </div>
        <dl class="arch-stats" aria-label="統計">
          <div>
            <dt>{{ posts.length }}</dt>
            <dd>篇文章</dd>
          </div>
          <div>
            <dt>{{ years.length }}</dt>
            <dd>個年份</dd>
          </div>
          <div>
            <dt>{{ startYear }}</dt>
            <dd>{{ startYear ? '年開始' : '尚無' }}</dd>
          </div>
        </dl>
      </div>
    </header>

    <div v-for="year in years" :key="year" class="arch-year">
      <div class="arch-year__head">
        <h2 class="arch-year__title">{{ year }}</h2>
        <span class="arch-year__badge">{{ grouped[year].length }} 篇</span>
      </div>

      <ul class="arch-list">
        <li v-for="post in grouped[year]" :key="post.url" class="arch-row">
          <a :href="withBase(post.url)" class="arch-row__link">
            <span class="arch-date">{{ formatMonthDay(post.date) }}</span>
            <div class="arch-body">
              <div class="arch-row__title-line">
                <span class="arch-title">{{ post.title }}</span>
                <span v-if="post.pin" class="arch-pin">精選</span>
              </div>
              <div v-if="post.tags.length" class="arch-tags">
                <span v-for="t in post.tags" :key="t" class="arch-tag">#{{ t }}</span>
              </div>
            </div>
            <span class="arch-arrow" aria-hidden="true">›</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data.mts'
import type { Post } from '../posts.data.mts'

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

const startYear = computed(() =>
  years.value.length ? years.value[years.value.length - 1] : ''
)

function formatMonthDay(date: string): string {
  const d = new Date(date)
  return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
.arch-wrap {
  max-width: 880px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}
.arch-hero {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.75rem 1.75rem 1.5rem;
}
.arch-crumb {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 1rem;
  display: flex;
  gap: 0.4rem;
  align-items: center;
}
.arch-crumb a {
  color: var(--vp-c-text-3);
  text-decoration: none;
}
.arch-crumb a:hover {
  color: var(--vp-c-brand-1);
}
.arch-hero__row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.arch-hero__title {
  margin: 0 0 0.3rem;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}
.arch-hero__sub {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}
.arch-stats {
  display: flex;
  gap: 1.75rem;
  margin: 0;
}
.arch-stats > div {
  text-align: center;
}
.arch-stats dt {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}
.arch-stats dd {
  margin: 0.15rem 0 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  letter-spacing: 0.05em;
}

.arch-year {
  margin-top: 1.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}
.arch-year__head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.1rem 1.5rem 0.85rem;
}
.arch-year__title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.arch-year__badge {
  font-size: 0.75rem;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}
.arch-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.arch-row {
  border-top: 1px solid var(--vp-c-divider);
}
.arch-row__link {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.12s;
}
.arch-row__link:hover {
  background: var(--vp-c-bg-soft);
}
.arch-date {
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  font-size: 0.85rem;
  font-family: ui-monospace, monospace;
}
.arch-body {
  min-width: 0;
}
.arch-row__title-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}
.arch-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}
.arch-row__link:hover .arch-title {
  color: var(--vp-c-brand-1);
}
.arch-pin {
  display: inline-block;
  padding: 0.05rem 0.45rem;
  border-radius: 4px;
  background: var(--vp-c-yellow-soft, #fff5d6);
  color: var(--vp-c-yellow-1, #c08400);
  font-size: 0.7rem;
  font-weight: 600;
}
.arch-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.arch-tag {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
}
.arch-arrow {
  color: var(--vp-c-text-3);
  font-size: 1.2rem;
  transition: transform 0.15s, color 0.15s;
}
.arch-row__link:hover .arch-arrow {
  color: var(--vp-c-brand-1);
  transform: translateX(3px);
}
@media (max-width: 640px) {
  .arch-hero {
    padding: 1.5rem 1.25rem 1.25rem;
  }
  .arch-stats {
    gap: 1.25rem;
  }
  .arch-row__link {
    grid-template-columns: 50px 1fr auto;
    padding: 0.85rem 1rem;
  }
}
</style>
