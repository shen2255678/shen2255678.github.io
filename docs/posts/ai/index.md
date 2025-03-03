---
layout: doc
title: AI技術
---

# AI技術文章

在這個部分，我分享關於人工智能和機器學習的見解、研究和實踐經驗。從基礎理論到實際應用，探索AI如何改變我們的工作和生活。

## 精選文章

<div class="article-grid">
  <div class="article-card">
    <div class="article-header">
      <h3><a href="/posts/ai/mcp-introduction">MCP架構：現代AI開發的新範式</a></h3>
      <span class="article-date">2025-03-03</span>
    </div>
    <p class="article-desc">深入探討Model-Controller-Producer架構及其在AI應用開發中的優勢...</p>
    <div class="article-tags">
      <span>架構</span>
      <span>MCP</span>
      <span>AI開發</span>
    </div>
  </div>

  <div class="article-card">
    <div class="article-header">
      <h3><a href="/posts/ai/enterprise-ai">企業級AI應用：從理論到實踐</a></h3>
      <span class="article-date">2025-03-02</span>
    </div>
    <p class="article-desc">探討AI技術如何在企業環境中落地應用並創造實際價值...</p>
    <div class="article-tags">
      <span>企業AI</span>
      <span>應用實踐</span>
      <span>商業價值</span>
    </div>
  </div>
</div>

## 主題領域

- **大型語言模型 (LLMs)**：架構、應用場景、最佳實踐
- **機器學習系統設計**：可擴展性、可解釋性、可靠性
- **AI應用架構**：MCP、專用框架、設計模式
- **產業應用**：金融、醫療、製造業中的AI落地

## AI資源推薦

除了我的文章外，這裡還推薦一些優質的AI學習資源：

- [機器學習公開課程](/posts/ai/ml-courses)（即將推出）
- [AI論文導讀](/posts/ai/research-papers)（即將推出）
- [開源AI工具集](/posts/ai/open-source-tools)（即將推出）

## 訂閱更新

如果您想收到最新的AI文章更新通知，可以：
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
