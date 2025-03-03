---
layout: home

hero:
  name: "Haowei's Blog"
  text: "程式開發與AI技術探索"
  tagline: 經營自己的同時，紀錄生活上的點滴
  image:
    src: https://i.pinimg.com/736x/5b/f6/a9/5bf6a9efe2bac9f12b42fa41fa78a979.jpg
    alt: Blog Logo
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
    link: /posts/ai/
  - icon: 💻
    title: 程式開發
    details: 分享前後端開發技巧、最佳實踐和實用教程
    link: /coding/
  - icon: 🧠
    title: 思考隨筆
    details: 關於技術、生活和個人成長的思考
    link: /life/
  - icon: 🌍
    title: 旅行見聞
    details: 記錄旅途中的所見所聞，分享不同文化的體驗
    link: /travel/
---

## 最新文章

這裡是我最近的一些思考和技術分享，希望能對您有所啟發。

### [MCP架構：現代AI開發的新範式](/posts/ai/mcp-introduction)

深入探討Model-Controller-Producer架構及其在AI應用開發中的優勢...

### [企業級AI應用：從理論到實踐](/posts/ai/enterprise-ai)

探討AI技術如何在企業環境中落地應用並創造實際價值...

## 技術棧

以下是我日常使用的一些技術工具：

- **前端**：Vue.js, React, TypeScript, TailwindCSS
- **後端**：Node.js, .NET, Python, Go
- **AI開發**：LangChain, OpenAI API, HuggingFace
- **DevOps**：Docker, GitHub Actions, AWS, Azure

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