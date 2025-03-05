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
  /* Add background color with transparency to ensure text is visible in both light and dark modes */
  background-color: rgba(var(--vp-c-bg-rgb), 0.7);
  border-radius: 8px;
  padding-bottom: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.gallery-item img {
  width: 100%;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item h3 {
  margin: 15px 0 5px;
  font-size: 1.2em;
  color: var(--vp-c-text-1); /* Use VitePress text color variables for dark mode compatibility */
}

.gallery-item span {
  display: block;
  font-size: 0.9em;
  color: var(--vp-c-text-2); /* Use VitePress text color variables for dark mode compatibility */
  padding: 0 10px;
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
}

.dark .gallery-item h3 {
  color: rgba(255, 255, 255, 0.87);
}

.dark .gallery-item span {
  color: rgba(235, 235, 235, 0.6);
}
</style>
