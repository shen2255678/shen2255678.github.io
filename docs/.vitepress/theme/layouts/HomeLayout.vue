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
      <h2 class="home-h2">從這裡開始</h2>
      <FeaturedPosts :posts="featured" />
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
import NewsletterInlineForm from '../components/NewsletterInlineForm.vue'
import PillarCard from '../components/PillarCard.vue'
import FeaturedPosts from '../components/FeaturedPosts.vue'
import { pillars } from '../../data/pillars'

const featured = [
  {
    slug: 'system/mcp-introduction',
    title: 'MCP 架構：現代 AI 開發的新範式',
    desc: 'Model–Controller–Producer 為什麼比 MVC 更適合 AI 應用。'
  },
  {
    slug: 'system/enterprise-ai',
    title: '企業級 AI 應用：從理論到實踐',
    desc: '把 AI 從實驗室帶進實際業務的策略與框架。'
  },
  {
    slug: 'library/tech-stack',
    title: '我的工具棧',
    desc: 'VitePress、Notion、Claude、Beehiiv — 一人公司的軟體選型。'
  }
]
</script>

<style scoped>
.home-wrap {
  max-width: 880px;
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
.home-h2 {
  margin: 0 0 1.25rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}
.home-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
</style>
