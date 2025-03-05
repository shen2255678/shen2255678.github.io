---
layout: doc
title: 旅行見聞
---

# 旅行見聞

在這個部分，我分享旅行中的所見所聞、攝影作品以及文化體驗。透過旅行，探索世界的多樣性和美麗。

## 目的地導航

<div class="destination-grid">
  <a href="./europe" class="destination-card">
    <div class="destination-image">🏰</div>
    <div class="destination-info">
      <h3>歐洲</h3>
      <p>法國、德國、瑞士、義大利</p>
      <div class="destination-tags">
        <span>歷史</span>
        <span>藝術</span>
        <span>建築</span>
      </div>
    </div>
  </a>
  
  <a href="./switzerland" class="destination-card">
    <div class="destination-image">🏔️</div>
    <div class="destination-info">
      <h3>瑞士</h3>
      <p>阿爾卑斯山脈、湖泊與雪景</p>
      <div class="destination-tags">
        <span>自然</span>
        <span>山區</span>
        <span>湖泊</span>
      </div>
    </div>
  </a>
  
  <a href="./japan" class="destination-card">
    <div class="destination-image">🗾</div>
    <div class="destination-info">
      <h3>日本</h3>
      <p>東京、京都、大阪、奈良</p>
      <div class="destination-tags">
        <span>美食</span>
        <span>文化</span>
        <span>城市</span>
      </div>
    </div>
  </a>
  
  <div class="destination-card coming-soon">
    <div class="destination-image">🏝️</div>
    <div class="destination-info">
      <h3>東南亞</h3>
      <p>泰國、越南、新加坡、馬來西亞</p>
      <div class="destination-tags">
        <span>海灘</span>
        <span>美食</span>
        <span>自然</span>
      </div>
      <div class="coming-soon-label">即將推出</div>
    </div>
  </div>
</div>

## 最新旅行

<div class="latest-travel">
  <div class="travel-card">
    <h3>瑞士阿爾卑斯山脈之旅</h3>
    <p class="travel-date">2023年8月</p>
    <p>探索瑞士壯麗的山脈、湖泊和小鎮，體驗世界級的火車旅行和纜車景觀。</p>
    <a href="./switzerland" class="read-more">閱讀全文 →</a>
  </div>
</div>

## 旅行攝影

<div class="photo-preview">
  <p>探索我在各地拍攝的精選照片，捕捉世界各地的美麗風景和文化。</p>
  <div class="photo-buttons">
    <a href="./switzerland#精選照片" class="photo-button">瑞士照片集</a>
    <a href="./japan#精選照片" class="photo-button">日本照片集</a>
    <a href="./gallery-demo" class="photo-button highlight">照片畫廊示例</a>
  </div>
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
/* 移除所有鏈接的底線 */
a {
  text-decoration: none !important;
}

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
  text-decoration: none;
  color: inherit;
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

.destination-info h3 {
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

.coming-soon {
  opacity: 0.7;
  position: relative;
  cursor: not-allowed;
}

.coming-soon-label {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--vp-c-gray);
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
}

.latest-travel {
  margin: 30px 0;
}

.travel-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
}

.travel-card h3 {
  margin-top: 0;
}

.travel-date {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.read-more {
  display: inline-block;
  margin-top: 10px;
  font-weight: 500;
  color: var(--vp-c-brand);
  text-decoration: none !important;
}

.photo-preview {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 25px;
  margin: 30px 0;
  text-align: center;
}

.photo-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

/* 統一按鈕樣式，確保文字始終可見 */
.photo-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #4263eb; /* 更鮮明的藍色 */
  color: white;
  min-width: 140px;
  min-height: 40px;
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 500;
  text-decoration: none !important;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  text-align: center;
  overflow: visible; /* 確保標籤可以溢出顯示 */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  border: none;
}

.photo-button:hover {
  background-color: #3b5bdb;
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* 高亮按鈕樣式 */
.photo-button.highlight {
  background-color: #ff5722;
  position: relative;
}

.photo-button.highlight:hover {
  background-color: #e64a19;
}

/* 重新設計NEW標籤，確保不覆蓋文字 */
.photo-button.highlight::after {
  content: "NEW";
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ffeb3b;
  color: #333;
  font-size: 0.6rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
  transform: rotate(15deg);
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 確保按鈕在移動設備上也能正常顯示 */
@media (max-width: 640px) {
  .photo-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .photo-button {
    width: 80%;
    max-width: 240px;
  }
}
</style>

<script>
// 確保所有鏈接沒有底線
document.addEventListener('DOMContentLoaded', function() {
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.style.textDecoration = 'none';
  });
});
</script>
