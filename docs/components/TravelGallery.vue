<template>
  <div class="gallery">
    <div v-for="(img, index) in images" :key="index" class="gallery-item">
      <div class="img-container">
        <img :src="img" @click="showLightbox(index)" alt="Image" />
      </div>
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

// 接收傳入的圖片路徑數組
const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  titles: {
    type: Array,
    default: () => []
  },
  descriptions: {
    type: Array,
    default: () => []
  }
})

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
.gallery {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Adjusts space between columns */
  flex-wrap: wrap;
  padding: 20px; /* Adds space inside the gallery container */
  margin: 20px 0; /* Adds space above and below the gallery */
}

.gallery-item {
  flex: 1;
  min-width: 30%; /* Ensures three columns */
  max-width: 30%;
  text-align: center;
  margin-bottom: 20px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.gallery-item .img-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item img:hover {
  transform: scale(1.05);
}

.gallery-item h3 {
  margin: 15px 0 5px;
  font-size: 1.2em;
  color: var(--vp-c-text-1);
  padding: 0 10px;
}

.gallery-item span {
  display: block;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  padding: 0 10px;
  flex-grow: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .gallery-item {
    min-width: 45%;
    max-width: 45%;
  }
}

@media (max-width: 480px) {
  .gallery-item {
    min-width: 100%;
    max-width: 100%;
  }
}

/* Dark mode specific adjustments */
.dark .gallery-item {
  background-color: rgba(39, 39, 42, 0.5);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.dark .gallery-item h3 {
  color: rgba(255, 255, 255, 0.87);
}

.dark .gallery-item span {
  color: rgba(235, 235, 235, 0.6);
}

/* Custom styles for vue-easy-lightbox */
:deep(.vel-modal) {
  z-index: 1000;
}

:deep(.vel-img-title) {
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

:deep(.vel-btn) {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

:deep(.vel-btn:hover) {
  background-color: rgba(255, 255, 255, 0.4) !important;
}
</style>
