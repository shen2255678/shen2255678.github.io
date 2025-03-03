---
layout: doc
title: 旅行見聞
---

# 旅行見聞

在這個部分，我分享旅行中的所見所聞、攝影作品以及文化體驗。透過旅行，探索世界的多樣性和美麗。

## 即將推出

<div class="travel-banner">
  <div class="banner-content">
    <h2>旅行專欄即將上線</h2>
    <p>我正在整理日本、歐洲和東南亞的旅行筆記和照片，即將與大家分享。</p>
  </div>
</div>

## 計劃內容

這個欄目將涵蓋以下內容：

- **旅行遊記**：詳細的旅行經歷和文化體驗
- **實用攻略**：行前準備、交通、住宿等實用信息
- **攝影作品**：旅途中的風景和人文攝影
- **文化觀察**：不同地區的文化差異和特色

## 熱門目的地預覽

<div class="destination-grid">
  <div class="destination-card">
    <div class="destination-image">🗾</div>
    <div class="destination-info">
      <h4>日本</h4>
      <p>東京、京都、大阪、北海道</p>
      <div class="destination-tags">
        <span>美食</span>
        <span>文化</span>
        <span>城市</span>
      </div>
    </div>
  </div>
  
  <div class="destination-card">
    <div class="destination-image">🏰</div>
    <div class="destination-info">
      <h4>歐洲</h4>
      <p>法國、德國、瑞士、義大利</p>
      <div class="destination-tags">
        <span>歷史</span>
        <span>藝術</span>
        <span>建築</span>
      </div>
    </div>
  </div>
  
  <div class="destination-card">
    <div class="destination-image">🏝️</div>
    <div class="destination-info">
      <h4>東南亞</h4>
      <p>泰國、越南、新加坡、馬來西亞</p>
      <div class="destination-tags">
        <span>海灘</span>
        <span>美食</span>
        <span>自然</span>
      </div>
    </div>
  </div>
</div>

## 旅行攝影

<div class="photo-preview">
  <p class="photo-coming-soon">攝影作品集即將上線，敬請期待！</p>
</div>

## 旅行資源推薦

除了我的文章外，這裡還推薦一些旅行相關的優質資源：

- **旅行攝影入門** (即將推出)
- **行前準備清單** (即將推出)
- **文化禮儀指南** (即將推出)

## 訂閱更新

如果您想收到最新的旅行文章更新通知，可以：
- 關注我的 [GitHub](https://github.com/shen2255678)
- 訂閱 [RSS Feed](/feed.xml)

<style>
.travel-banner {
  background-color: var(--vp-c-brand-dimm);
  border-radius: 8px;
  padding: 30px;
  margin: 30px 0;
  text-align: center;
}

.banner-content h2 {
  margin-top: 0;
  color: var(--vp-c-brand-dark);
}

.destination-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.destination-card {
  display: flex;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid var(--vp-c-divider);
}

.destination-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.destination-image {
  font-size: 3rem;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.destination-info {
  flex: 1;
}

.destination-info h4 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.destination-info p {
  margin: 0 0 10px 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.destination-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.destination-tags span {
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 20px;
}

.photo-preview {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 40px;
  margin: 30px 0;
  text-align: center;
  border: 1px dashed var(--vp-c-divider);
}

.photo-coming-soon {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
}
</style>
