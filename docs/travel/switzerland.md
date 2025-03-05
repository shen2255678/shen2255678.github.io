---
layout: doc
title: 瑞士旅行紀錄
---

<script setup>
import ImageSlider from '../components/ImageSlider.vue'

// 在 VitePress 中，可以使用 import.meta.url 來獲取基於文件的相對路徑
// 但在 Markdown 文件中，我們仍然使用相對路徑的方式
const swissImages = [
  { 
    src: '/image/switzerland/swiss_train1.jpg', 
    alt: '瑞士火車',
    caption: '穿越阿爾卑斯山脈的瑞士火車'
  },
  { 
    src: '/image/switzerland/swiss_train2.jpg', 
    alt: '冰河列車',
    caption: '瑞士著名的冰河列車'
  },
  { 
    src: '/image/switzerland/swiss_m.jpg', 
    alt: '馬特洪峰',
    caption: '馬特洪峰 - 瑞士最著名的山峰之一'
  },
  { 
    src: '/image/switzerland/cableCar.jpg', 
    alt: '纜車',
    caption: '阿爾卑斯山纜車體驗'
  },
  { 
    src: '/image/switzerland/resort.jpg', 
    alt: '度假村',
    caption: '瑞士高級山間度假村'
  },
  { 
    src: '/image/switzerland/sky.jpg', 
    alt: '瑞士天空',
    caption: '瑞士壯麗的自然風光'
  }
]
</script>

# 瑞士旅行紀錄

<div class="travel-meta">
  <div class="meta-item">
    <span class="meta-label">旅行時間</span>
    <span class="meta-value">2023年8月</span>
  </div>
  <div class="meta-item">
    <span class="meta-label">旅行城市</span>
    <span class="meta-value">蘇黎世, 琉森, 因特拉肯, 策馬特</span>
  </div>
  <div class="meta-item">
    <span class="meta-label">旅行主題</span>
    <span class="meta-value">自然風光, 山岳探索, 文化體驗</span>
  </div>
</div>

## 旅行概況

瑞士，一個令人著迷的阿爾卑斯山國度，以其壯麗的山景、精緻的鐘錶和美味的巧克力而聞名。在這裡，您可以體驗到令人嘆為觀止的自然風光、高效的交通系統以及舒適的度假勝地。

我的瑞士之旅橫跨了該國多個著名城市，從蘇黎世的現代都市風光，到琉森的中世紀魅力，再到馬特洪峰的壯麗景色。每一步都充滿了驚喜和美好的回憶。

## 精選照片

下面是我在瑞士拍攝的一些精選照片：

<ImageSlider :images="swissImages" height="500px" />

## 行程亮點

### 琉森湖畔風光

琉森是瑞士最美麗的城市之一，其中世紀建築和湖泊風光相得益彰。卡佩爾木橋（Chapel Bridge）是琉森的標誌性建築，這座有蓋的木橋建於14世紀，是歐洲最古老的有蓋木橋之一。

### 策馬特滑雪勝地

策馬特是瑞士著名的滑雪度假勝地，也是觀賞馬特洪峰的最佳地點。這裡全年都能滑雪，夏季還可以進行徒步旅行，欣賞高山草甸和冰川美景。

### 冰河列車之旅

乘坐著名的冰河列車穿越阿爾卑斯山脈，這是一次難忘的體驗。列車沿途經過壯麗的山谷、瀑布和冰川，是欣賞瑞士自然風光的絕佳方式。

### 蘇黎世藝術之旅

蘇黎世不僅是瑞士的金融中心，也是一個充滿藝術氣息的城市。巴恩霍夫大街上的精品店、蘇黎世美術館和歷史悠久的老城區都是不可錯過的景點。

## 實用信息

### 最佳旅行季節

- **夏季 (6-8月)**: 天氣溫暖宜人，非常適合徒步和戶外活動
- **冬季 (12-3月)**: 滑雪季節，特別是阿爾卑斯山區
- **春秋季節 (4-5月，9-11月)**: 遊客較少，價格相對較低

### 交通方式

瑞士擁有世界上最完善的公共交通系統之一。瑞士通票（Swiss Pass）提供對火車、巴士和船的無限制使用權，非常值得購買。

### 美食推薦

- 起司火鍋 (Fondue)
- 瑞士巧克力
- 瑞士盧恩 (Rösti，馬鈴薯餅)
- 蘇黎世式切片肉 (Zürcher Geschnetzeltes)

## 旅行心得

瑞士雖然是一個小國，但其自然景觀和文化底蘊卻令人驚嘆。這裡的人們對環境保護極為重視，城市和鄉村都保持著令人難以置信的整潔和秩序。對於喜愛自然和戶外活動的人來說，瑞士絕對是一個值得一再重訪的地方。

<style>
.travel-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
  padding: 15px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.meta-value {
  font-weight: 500;
}
</style>
