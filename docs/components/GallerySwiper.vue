<template>
  <div class="gallery-container">
    <div class="gallery-grid">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        class="gallery-item"
        @click="showImage(index)"
      >
        <img :src="image.src" :alt="image.alt || `圖片 ${index + 1}`" />
        <div v-if="image.caption" class="caption">{{ image.caption }}</div>
      </div>
    </div>
    
    <div v-if="lightboxVisible" class="lightbox">
      <div class="lightbox-content">
        <img :src="images[currentIndex].src" :alt="images[currentIndex].alt" />
        <div v-if="images[currentIndex].caption" class="lightbox-caption">
          {{ images[currentIndex].caption }}
        </div>
        <button class="close-btn" @click="hideLightbox">&times;</button>
        <button v-if="images.length > 1" class="prev-btn" @click="prevImage">&lt;</button>
        <button v-if="images.length > 1" class="next-btn" @click="nextImage">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定義 props
const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  columns: {
    type: Number,
    default: 3
  }
});

// 燈箱狀態
const lightboxVisible = ref(false);
const currentIndex = ref(0);

// 顯示燈箱
const showImage = (index) => {
  currentIndex.value = index;
  lightboxVisible.value = true;
  // 禁止背景滾動
  document.body.style.overflow = 'hidden';
};

// 隱藏燈箱
const hideLightbox = () => {
  lightboxVisible.value = false;
  // 恢復背景滾動
  document.body.style.overflow = '';
};

// 上一張圖片
const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = props.images.length - 1;
  }
};

// 下一張圖片
const nextImage = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

// 監聽鍵盤事件
const handleKeydown = (e) => {
  if (!lightboxVisible.value) return;
  
  if (e.key === 'Escape') {
    hideLightbox();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  }
};

// 掛載/卸載鍵盤事件監聽器
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.gallery-container {
  position: relative;
  margin: 20px 0;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.gallery-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.02);
}

.gallery-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px;
  font-size: 0.9rem;
  text-align: center;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.lightbox-caption {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 1rem;
}

.close-btn, .prev-btn, .next-btn {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-btn:hover, .prev-btn:hover, .next-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.close-btn {
  top: -20px;
  right: -20px;
}

.prev-btn {
  left: -50px;
  top: 50%;
  transform: translateY(-50%);
}

.next-btn {
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
