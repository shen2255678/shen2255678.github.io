<template>
  <div class="gallery">
    <div class="thumbnails">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        class="thumbnail" 
        @click="showImage(index)"
      >
        <img :src="image" :alt="`圖片 ${index + 1}`" />
      </div>
    </div>
    
    <div v-if="visibleRef" class="lightbox" @click="onHide">
      <div class="lightbox-content" @click.stop>
        <img :src="images[indexRef]" :alt="`圖片 ${indexRef + 1}`" />
        <div class="controls">
          <button v-if="images.length > 1" class="prev-btn" @click="showPrev">&lt;</button>
          <button v-if="images.length > 1" class="next-btn" @click="showNext">&gt;</button>
        </div>
        <button class="close-btn" @click="onHide">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定義 props，接收從父組件傳入的圖片數組
const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});

// 燈箱狀態
const visibleRef = ref(false);
const indexRef = ref(0);

// 顯示圖片
const showImage = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
  // 禁止背景滾動
  document.body.style.overflow = 'hidden';
};

// 隱藏燈箱
const onHide = () => {
  visibleRef.value = false;
  // 恢復背景滾動
  document.body.style.overflow = '';
};

// 顯示上一張圖片
const showPrev = () => {
  indexRef.value = (indexRef.value - 1 + props.images.length) % props.images.length;
};

// 顯示下一張圖片
const showNext = () => {
  indexRef.value = (indexRef.value + 1) % props.images.length;
};

// 監聽鍵盤事件
const handleKeydown = (e) => {
  if (!visibleRef.value) return;
  
  if (e.key === 'Escape') {
    onHide();
  } else if (e.key === 'ArrowLeft') {
    showPrev();
  } else if (e.key === 'ArrowRight') {
    showNext();
  }
};

// 掛載和卸載鍵盤事件監聽器
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.gallery {
  margin: 20px 0;
}

.thumbnails {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.thumbnail {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.thumbnail:hover {
  transform: scale(1.05);
}

.thumbnail img {
  width: 100%;
  height: 150px;
  object-fit: cover;
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
  max-height: 90vh;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.controls {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.prev-btn,
.next-btn,
.close-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.prev-btn:hover,
.next-btn:hover,
.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.close-btn {
  position: absolute;
  top: -20px;
  right: -20px;
}
</style>
