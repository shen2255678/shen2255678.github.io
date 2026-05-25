---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Haowei Blog"
  text: "程式開發與AI技術探索"
  tagline: 經營自己的同時，紀錄生活上的點滴
  actions:
    - theme: brand
      text: 閱讀文章
      link: /posts/ai/mcp-introduction
    - theme: alt
      text: 關於我
      link: /about
features:
  - icon: 🤖
    title: AI技術
    details: 探索最新的AI技術和應用，深入了解LLM、機器學習與MCP架構
  - icon: 💻
    title: 程式開發
    details: 分享前後端開發技巧、最佳實踐和實用教程
  - icon: 🧠
    title: 思考隨筆
    details: 關於技術、生活和個人成長的思考
  - icon: 🌍
    title: 旅行見聞
    details: 記錄旅途中的所見所聞，分享不同文化的體驗
---


<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(128deg, #3eaf7c, #41d1ff);
}

.full-width-image {
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.feature-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 40px 0;
}

.feature-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}
</style>
