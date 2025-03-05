---
layout: doc
title: 旅行照片畫廊示例
---

<script setup>
import TravelGallery from '../components/TravelGallery.vue'

// 引入圖片文件
import river from '../image/japan/river.jpg'
import college from '../image/japan/college.jpg'
import swiss_train1 from '../image/switzerland/swiss_train1.jpg'
import cableCar from '../image/switzerland/cableCar.jpg'
import resort from '../image/switzerland/resort.jpg'

// 圖片數組
const galleryImages = [
  river,
  college,
  swiss_train1,
  cableCar,
  resort
]

// 標題數組
const imageTitles = [
  '松本 上高地',
  '東京 東京大學',
  '瑞士 蘇拉瓦',
  '策馬特 登山纜車',
  '瑞士 高級度假村'
]

// 描述數組
const imageDescriptions = [
  '冬天，上高地雖然封山，但請嚮導帶領還是可以入山健行，田代池，雖然不大但陽光灑落到水池跟空氣的樣子，配著山景也別有風味。',
  '上野附近的東京大學，幅員廣大擁有許多歷史感的建築，漫步校園裡可以花上數個小時，其中赤門是在災難中倖存下來的珍貴歷史建築。',
  '伯爾尼納快車是瑞士的三大著名景觀列車，連接瑞士庫爾與波斯基亞沃及義大利蒂拉諾，穿梭在阿爾卑斯山脈中，其中的美無法言喻。',
  '策馬特是瑞士著名的滑雪勝地，搭乘纜車可以欣賞到馬特洪峰的壯麗景色。這裡的纜車系統完善，能夠帶您到達各個絕佳的觀景點。',
  '瑞士的度假村通常融合了現代設施與自然環境，讓您在舒適的環境中享受阿爾卑斯山脈的壯麗景色。'
]
</script>

# 旅行照片畫廊示例

這個頁面展示了旅行照片畫廊的效果。

## 使用 Vue 組件的圖片畫廊

<TravelGallery 
  :images="galleryImages" 
  :titles="imageTitles" 
  :descriptions="imageDescriptions" 
/>

## 行程亮點

### 松本 上高地

冬天，上高地雖然封山，但請嚮導帶領還是可以入山健行，田代池，雖然不大但陽光灑落到水池跟空氣的樣子，配著山景也別有風味。

<img src="../image/japan/river.jpg" alt="松本 上高地" class="highlight-image" />

### 東京 東京大學

上野附近的東京大學，幅員廣大擁有許多歷史感的建築，漫步校園裡可以花上數個小時，其中赤門是在災難中倖存下來的珍貴歷史建築。

<img src="../image/japan/college.jpg" alt="東京 東京大學" class="highlight-image" />

### 瑞士 蘇拉瓦

伯爾尼納快車是瑞士的三大著名景觀列車，連接瑞士庫爾與波斯基亞沃及義大利蒂拉諾，穿梭在阿爾卑斯山脈中，其中的美無法言喻。

<img src="../image/switzerland/swiss_train1.jpg" alt="瑞士 蘇拉瓦" class="highlight-image" />

<style>
.highlight-image {
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: block;
}
</style>
