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

這個頁面展示了不同方式顯示旅行照片的效果。

## 直接 HTML 標籤引用的圖片

以下是使用直接 HTML 標籤方式顯示的圖片：

<div class="html-gallery">
  <div class="image-container">
    <img src="../image/japan/river.jpg" alt="松本 上高地" />
    <h3>松本 上高地</h3>
    <p>冬天，上高地雖然封山，但請嚮導帶領還是可以入山健行，田代池，雖然不大但陽光灑落到水池跟空氣的樣子，配著山景也別有風味。</p>
  </div>
  
  <div class="image-container">
    <img src="../image/japan/college.jpg" alt="東京 東京大學" />
    <h3>東京 東京大學</h3>
    <p>上野附近的東京大學，幅員廣大擁有許多歷史感的建築，漫步校園裡可以花上數個小時，其中赤門是在災難中倖存下來的珍貴歷史建築。</p>
  </div>
  
  <div class="image-container">
    <img src="../image/switzerland/swiss_train1.jpg" alt="瑞士 蘇拉瓦" />
    <h3>瑞士 蘇拉瓦</h3>
    <p>伯爾尼納快車是瑞士的三大著名景觀列車，連接瑞士庫爾與波斯基亞沃及義大利蒂拉諾，穿梭在阿爾卑斯山脈中，其中的美無法言喻。</p>
  </div>
</div>

## 使用 Vue 組件的圖片畫廊

以下是使用 Vue 組件（與您之前成功的案例類似）顯示的圖片：

<TravelGallery 
  :images="galleryImages" 
  :titles="imageTitles" 
  :descriptions="imageDescriptions" 
/>

<style>
.html-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  margin: 30px 0;
}

.image-container {
  flex: 1;
  min-width: 30%;
  max-width: 30%;
  margin-bottom: 20px;
  text-align: center;
}

.image-container img {
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.image-container img:hover {
  transform: scale(1.03);
}

.image-container h3 {
  margin: 10px 0 5px;
  font-size: 1.2em;
}

.image-container p {
  font-size: 0.9em;
  color: #666;
  padding: 0 10px;
}

@media (max-width: 768px) {
  .image-container {
    min-width: 45%;
    max-width: 45%;
  }
}

@media (max-width: 480px) {
  .image-container {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>
