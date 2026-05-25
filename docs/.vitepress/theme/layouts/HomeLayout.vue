<template>
  <div class="home-wrap">
    <header class="home-hero">
      <h1 class="home-hero__name">用 AI 認識真正的你自己</h1>
      <p class="home-hero__tag">
        一個工程師如何用
        <strong>AI × 第二大腦 × 深度自我認識</strong>
        ，重新設計自己的生活作業系統。
      </p>
      <p class="home-hero__sub">這裡記錄的不是技術教學，是一個人怎麼用系統的方式，活成自己。</p>
    </header>

    <section class="home-section home-section--cta">
      <NewsletterInlineForm variant="inline" source="home-hero">
        <template #title>免費電子報：「7 天用 AI 認識真正的自己」</template>
        <template #desc>留下 email，立刻收到第一封信。每天一個練習，連續 7 天。</template>
      </NewsletterInlineForm>
    </section>

    <section class="home-section">
      <div class="home-section__head">
        <h2 class="home-h2">最新文章</h2>
        <a :href="withBase('/archive')" class="home-section__more">查看全部 →</a>
      </div>
      <div v-if="latest.length" class="home-cards">
        <PostCard v-for="p in latest" :key="p.url" :post="p" />
      </div>
      <p v-else class="home-empty">還沒有 Post — 寫作中。</p>
    </section>

    <section class="home-section">
      <h2 class="home-h2">五個寫作支柱</h2>
      <div class="home-grid">
        <PillarCard v-for="p in pillars" :key="p.slug" :pillar="p" />
      </div>
    </section>

    <section class="home-section">
      <NewsletterInlineForm variant="footer" source="home-bottom" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import NewsletterInlineForm from '../components/NewsletterInlineForm.vue'
import PillarCard from '../components/PillarCard.vue'
import PostCard from '../components/PostCard.vue'
import { pillars } from '../../data/pillars'
import { data as posts } from '../posts.data.mts'

const latest = computed(() => posts.slice(0, 6))
</script>

<style scoped>
.home-wrap {
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}
.home-hero {
  text-align: center;
  padding: 3rem 0 2.5rem;
}
.home-hero__name {
  margin: 0 0 1rem;
  font-size: clamp(1.8rem, 4.5vw, 2.6rem);
  font-weight: 700;
  line-height: 1.25;
  background: linear-gradient(128deg, #3eaf7c, #41d1ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.home-hero__tag {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}
.home-hero__sub {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.98rem;
  line-height: 1.6;
}
.home-section {
  margin-top: 3rem;
}
.home-section--cta {
  margin-top: 2rem;
}
.home-section__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 0 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}
.home-h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}
.home-section > .home-h2 {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
  margin-bottom: 1.25rem;
}
.home-section__more {
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.home-section__more:hover {
  text-decoration: underline;
}
.home-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}
.home-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.home-empty {
  color: var(--vp-c-text-3);
  font-style: italic;
  padding: 1rem 0;
}
</style>
