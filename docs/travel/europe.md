---
layout: doc
title: 歐洲旅行紀錄
---

<script setup>
import TravelGallery from '../components/TravelGallery.vue'

// 引入圖片文件
import swiss_train1 from '../image/switzerland/swiss_train1.jpg'
import cableCar from '../image/switzerland/cableCar.jpg'
import resort from '../image/switzerland/resort.jpg'

// 瑞士照片數組
const europeImages = [
  swiss_train1,
  cableCar,
  resort
]

// 照片標題
const europeTitles = [
  '瑞士 蘇拉瓦',
  '策馬特 登山纜車',
  '瑞士 高級度假村'
]

// 照片描述
const europeDescriptions = [
  '伯爾尼納快車是瑞士的三大著名景觀列車，連接瑞士庫爾與波斯基亞沃及義大利蒂拉諾，穿梭在阿爾卑斯山脈中，其中的美無法言喻。',
  '策馬特是瑞士著名的滑雪勝地，搭乘纜車可以欣賞到馬特洪峰的壯麗景色。這裡的纜車系統完善，能夠帶您到達各個絕佳的觀景點。',
  '瑞士的度假村通常融合了現代設施與自然環境，讓您在舒適的環境中享受阿爾卑斯山脈的壯麗景色。'
]
</script>

# 歐洲旅行紀錄

歐洲是一個充滿歷史、文化和自然美景的大陸。從北歐的挪威峽灣到地中海的希臘島嶼，從西歐的法國葡萄園到東歐的捷克古城，每個國家都有其獨特的魅力。

## 我的歐洲照片

目前我主要探索了瑞士，以下是一些精選照片：

<TravelGallery 
  :images="europeImages" 
  :titles="europeTitles" 
  :descriptions="europeDescriptions" 
/>

## 我的歐洲目的地

<div class="destination-grid">
  <a href="./switzerland" class="destination-card">
    <h3>瑞士</h3>
    <p>阿爾卑斯山的壯麗風光</p>
    <div class="card-footer">
      <span class="tag">自然風光</span>
      <span class="tag">火車之旅</span>
      <span class="tag">滑雪勝地</span>
    </div>
  </a>
  
  <div class="destination-card coming-soon">
    <h3>法國</h3>
    <p>藝術、美食與浪漫之都</p>
    <div class="card-footer">
      <span class="coming-soon-badge">即將推出</span>
    </div>
  </div>
  
  <div class="destination-card coming-soon">
    <h3>德國</h3>
    <p>童話城堡與現代都市</p>
    <div class="card-footer">
      <span class="coming-soon-badge">即將推出</span>
    </div>
  </div>
  
  <div class="destination-card coming-soon">
    <h3>義大利</h3>
    <p>歷史遺跡與地中海風情</p>
    <div class="card-footer">
      <span class="coming-soon-badge">即將推出</span>
    </div>
  </div>
</div>

## 關於歐洲旅行

### 最佳旅行季節

歐洲最佳的旅行季節取決於您想去的具體國家和地區：

- **春季 (3-5月)**: 南歐如西班牙、義大利和希臘天氣宜人，花朵盛開
- **夏季 (6-8月)**: 北歐如挪威、瑞典和芬蘭的最佳時期，日照時間長
- **秋季 (9-11月)**: 中歐如德國、法國的葡萄收獲季節，節慶活動多
- **冬季 (12-2月)**: 阿爾卑斯山地區滑雪季節，圣誕市場遍布歐洲各地

### 交通方式

歐洲有完善的交通網絡，主要包括：

- **火車**: 歐洲鐵路網絡發達，歐鐵通票（Eurail Pass）提供多國旅行便利
- **廉價航空**: 多家廉價航空公司提供城市間的便捷連接
- **公共交通**: 大多數歐洲城市都有完善的公共交通系統
- **租車**: 適合鄉村地區或小城鎮間的旅行

### 必備旅行用品

- 通用電源轉換器
- 舒適的步行鞋
- 輕便的雨具
- 歐元現金（雖然信用卡普遍接受，但小店和市場可能需要現金）
- 旅行保險

## 未來計劃

我計劃在未來幾年內探索更多的歐洲國家，包括：

- 西班牙：巴塞羅那、馬德里、塞維利亞
- 荷蘭：阿姆斯特丹、鹿特丹
- 捷克：布拉格、庫特納霍拉
- 奧地利：維也納、薩爾茨堡

敬請期待更多歐洲旅行日記的更新！

<style>
.destination-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.destination-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}

.destination-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.destination-card h3 {
  margin-top: 0;
  color: var(--vp-c-brand);
}

.destination-card p {
  color: var(--vp-c-text-2);
  flex-grow: 1;
}

.card-footer {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 20px;
}

.coming-soon {
  opacity: 0.7;
  cursor: not-allowed;
}

.coming-soon-badge {
  background-color: var(--vp-c-gray-dimm);
  color: var(--vp-c-gray);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 20px;
}

/* Dark mode adjustments */
.dark .tag {
  background-color: rgba(23, 77, 108, 0.5);
}

.dark .coming-soon-badge {
  color: rgba(235, 235, 235, 0.8);
}
</style>
