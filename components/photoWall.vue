<template>
    <div class="gallery">
      <div v-for="(img, index) in images" :key="index" class="gallery-item">
        <img :src="img" @click="showLightbox(index)" alt="Image" />
        <h3>{{ titles[index] }}</h3>
        <span>{{ descriptions[index] }}</span>
      </div>
      <vue-easy-lightbox
        :visible="visible"
        :imgs="images"
        :index="currentIndex"
        @hide="handleHide"
      />
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import river from '../docs/image/river.jpg'
import train1 from '../docs/image/swiss_train1.jpg'
import college from '../docs/image/college.jpg'

const images = ref([river, train1, college])

const titles = ref([
  '松本 上高地',
  '瑞士 蘇拉瓦',
  '東京 東京大學',
])

const descriptions = ref([
  '冬天，上高地雖然封山，但請嚮導帶領還是可以入山健行，田代池，雖然不大但陽光灑落到水池跟空氣的樣子，配著山景也別有風味。',
  '伯爾尼納快車是瑞士的三大著名景觀列車，連接瑞士庫爾與波斯基亞沃及義大利蒂拉諾，穿梭在阿爾卑斯山脈中，其中的美無法言喻。',
  '上野附近的東京大學，幅員廣大擁有許多歷史感的建築，漫步校園裡可以花上數個小時，其中赤門是在災難中倖存下來的珍貴歷史建築。',
])
  
const visible = ref(false)
const currentIndex = ref(0)
  
const showLightbox = (index) => {
    currentIndex.value = index
    visible.value = true
}
  
const handleHide = () => {
    visible.value = false
}
</script>
  
  <style>
  .image-gallery img {
    width: 200px;
    margin: 10px;
    cursor: pointer;
  }
  .gallery {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Adjusts space between columns */
  flex-wrap: wrap;
  padding: 20px; /* Adds space inside the gallery container */
  margin: 20px 0; /* Adds space above and below the gallery */
  /* border: 1px solid #ccc; 
  background-color: #f9f9f9; 
  border-radius: 8px;  */
}

.gallery-item {
  flex: 1;
  max-width: 30%; /* Ensures three columns */
  text-align: center;
}

.gallery-item img {
  width: 100%;
  cursor: pointer;
}

.gallery-item h3 {
  margin: 10px 0 5px;
  font-size: 1.2em;
}

.gallery-item p {
  font-size: 1em;
  color: #555;
}
  </style>
  