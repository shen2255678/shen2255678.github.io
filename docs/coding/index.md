---
layout: doc
title: 程式開發
---

# 程式開發文章

在這個部分，我分享關於程式開發的經驗、教程和最佳實踐。從前端到後端，從基礎概念到進階技巧，這裡有各種與程式開發相關的內容。

## 最新文章

<div class="article-grid">
  <div class="article-card">
    <div class="article-header">
      <h3><a href="/coding/vitepress-tutorial">VitePress 進階教程</a></h3>
      <span class="article-date">2025-03-01</span>
    </div>
    <p class="article-desc">深入了解如何使用VitePress建立專業的技術文檔和個人博客網站...</p>
    <div class="article-tags">
      <span>VitePress</span>
      <span>前端</span>
      <span>教程</span>
    </div>
  </div>

  <div class="article-card">
    <div class="article-header">
      <h3><a href="/coding/first-coding-post">VitePress 入門教程</a></h3>
      <span class="article-date">2025-02-28</span>
    </div>
    <p class="article-desc">從零開始學習使用VitePress搭建個人技術博客...</p>
    <div class="article-tags">
      <span>VitePress</span>
      <span>前端</span>
      <span>教程</span>
    </div>
  </div>
</div>

## 主題分類

- **前端開發**：Vue.js, React, TypeScript, 響應式設計
- **後端開發**：Node.js, .NET, Python, API設計
- **開發工具**：Git, Docker, CI/CD, 效率工具
- **最佳實踐**：代碼風格, 架構模式, 測試策略

## 訂閱更新

如果您想收到最新的文章更新通知，可以：
- 關注我的 [GitHub](https://github.com/shen2255678)
- 訂閱 [RSS Feed](/feed.xml)

<style>
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.article-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid var(--vp-c-divider);
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.article-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.article-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.article-desc {
  margin: 10px 0;
  color: var(--vp-c-text-1);
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 15px;
}

.article-tags span {
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 20px;
}
</style>
