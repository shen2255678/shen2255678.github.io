<template>
  <section class="cat-wrap">
    <header class="cat-hero">
      <h1>分類</h1>
      <p class="cat-hero__sub">
        五個 Pillar，每篇 Post 都歸屬其中一個。
        想看跨 Pillar 的主題，請到
        <a :href="withBase('/tags.html')">標籤</a>。
      </p>
    </header>

    <div v-for="pillar in pillars" :key="pillar.slug" class="cat-pillar">
      <div class="cat-pillar__head">
        <h2 class="cat-pillar__title">
          <a :href="withBase(`/${pillar.slug}/`)">{{ pillar.title }}</a>
          <span class="cat-pillar__count">{{ countByPillar(pillar.slug) }} 篇</span>
        </h2>
      </div>
      <p class="cat-pillar__desc">{{ pillar.description }}</p>
      <ul class="cat-list">
        <li v-for="post in postsByPillar(pillar.slug)" :key="post.url" class="cat-item">
          <a :href="withBase(post.url)" class="cat-title">{{ post.title }}</a>
          <span class="cat-date">{{ post.date.substring(0, 10) }}</span>
        </li>
        <li v-if="countByPillar(pillar.slug) === 0" class="cat-empty">
          這個 Pillar 還沒有 Post — 寫作中。
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data'
import { pillars } from '../../data/pillars'
import type { PillarSlug } from '../../data/pillars'

function postsByPillar(slug: PillarSlug) {
  return posts.filter((p) => p.pillar === slug)
}
function countByPillar(slug: PillarSlug): number {
  return postsByPillar(slug).length
}
</script>

<style scoped>
.cat-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}
.cat-hero {
  text-align: center;
  padding: 2rem 0 1rem;
}
.cat-hero h1 {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  font-weight: 700;
}
.cat-hero__sub {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}
.cat-hero__sub a {
  color: var(--vp-c-brand-1);
}
.cat-pillar {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
.cat-pillar__head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.cat-pillar__title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}
.cat-pillar__title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.cat-pillar__title a:hover {
  color: var(--vp-c-brand-1);
}
.cat-pillar__count {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-weight: 400;
}
.cat-pillar__desc {
  margin: 0.5rem 0 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.6;
}
.cat-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.cat-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.cat-title {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.cat-title:hover {
  color: var(--vp-c-brand-1);
}
.cat-date {
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  font-size: 0.85rem;
}
.cat-empty {
  padding: 0.6rem 0;
  color: var(--vp-c-text-3);
  font-style: italic;
  font-size: 0.9rem;
}
</style>
