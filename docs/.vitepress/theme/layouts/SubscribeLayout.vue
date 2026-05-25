<template>
  <article class="sub-wrap">
    <header class="sub-hero">
      <p class="sub-hero__eyebrow">免費電子報</p>
      <h1 class="sub-hero__title">7 天用 AI 認識真正的自己</h1>
      <p class="sub-hero__tag">
        每天一封信、一個練習、一個被命名的概念。
        <br />
        連續 7 天，把自己當成系統來理解。
      </p>
    </header>

    <section class="sub-form">
      <NewsletterInlineForm variant="landing" source="subscribe-landing" />
    </section>

    <section class="sub-block">
      <h2>這 7 天會收到什麼</h2>
      <ol class="sub-days">
        <li><strong>Day 1 — 你不是你以為的那個你。</strong>為什麼自我認識的第一步是「拆掉內建框架」。</li>
        <li><strong>Day 2 — 把混亂變成可命名的概念。</strong>用 AI 當鏡子，把模糊感受變成可指認的詞。</li>
        <li><strong>Day 3 — 你的決定背後的決定。</strong>找出真正在驅動你選擇的那條暗線。</li>
        <li><strong>Day 4 — 第二大腦不是工具，是你的延伸。</strong>為什麼 Notion 對大多數人沒用。</li>
        <li><strong>Day 5 — Prompt 是你跟自己對話的句型。</strong>把 AI 當教練的真正用法。</li>
        <li><strong>Day 6 — 系統會揭露你不想看的事。</strong>當系統開始反映你，你要怎麼接住自己。</li>
        <li><strong>Day 7 — 從此你不需要這封信。</strong>把這 7 天變成你自己的每週流程。</li>
      </ol>
    </section>

    <section class="sub-block">
      <h2>誰適合訂閱</h2>
      <ul>
        <li>覺得自己想得很多但沒整理出來的人。</li>
        <li>用過 Notion / Obsidian / Claude 但沒做出「會回應自己的系統」的人。</li>
        <li>對心理學、榮格、MBTI、印度占星感興趣，但受不了浮誇話術的人。</li>
        <li>正在重新思考「我到底想過什麼樣的生活」的高功能上班族。</li>
      </ul>
    </section>

    <section class="sub-block">
      <h2>常見問題</h2>
      <details>
        <summary>會被塞廣告嗎？</summary>
        <p>不會。這個電子報不接業配、不放第三方廣告。唯一會出現的「銷售」是我自己做的數位產品與一對一服務，而且只會出現在每封信的最末段，可以略過。</p>
      </details>
      <details>
        <summary>頻率多高？</summary>
        <p>前 7 天每天一封（mini-course）。之後改為每週一封的「主題長信」，不定期會多一封短的觀察。</p>
      </details>
      <details>
        <summary>怎麼退訂？</summary>
        <p>每封信底部都有退訂連結，一鍵完成。我不會用任何挽留話術。</p>
      </details>
    </section>

    <section class="sub-form sub-form--end">
      <NewsletterInlineForm variant="landing" source="subscribe-bottom">
        <template #title>準備好了？</template>
        <template #desc>留下 email，第一封信通常 1 分鐘內到達。</template>
      </NewsletterInlineForm>
    </section>
  </article>
</template>

<script setup lang="ts">
import NewsletterInlineForm from '../components/NewsletterInlineForm.vue'
</script>

<style scoped>
.sub-wrap {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}
.sub-hero {
  text-align: center;
  padding: 3rem 0 1.5rem;
}
.sub-hero__eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}
.sub-hero__title {
  margin: 0 0 1rem;
  font-size: clamp(1.8rem, 4.5vw, 2.4rem);
  font-weight: 700;
  line-height: 1.25;
}
.sub-hero__tag {
  margin: 0;
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}
.sub-form {
  margin: 1rem 0 2.5rem;
}
.sub-form--end {
  margin-top: 3rem;
}
.sub-block {
  margin: 2.5rem 0;
}
.sub-block h2 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 1rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}
.sub-days {
  padding-left: 1.2rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
}
.sub-days li {
  margin: 0.4rem 0;
}
.sub-block ul {
  padding-left: 1.2rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
}
details {
  margin: 0.6rem 0;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
details summary {
  cursor: pointer;
  font-weight: 600;
}
details p {
  margin: 0.6rem 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}
</style>
