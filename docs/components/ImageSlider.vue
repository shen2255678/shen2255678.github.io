<script setup>
import { ref, computed, onMounted } from 'vue';

// 定義 props
const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  height: {
    type: String,
    default: '500px'
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 5000
  }
});

// 當前顯示的圖片索引
const currentIndex = ref(0);
// 自動播放的計時器
let timer = null;

// 前一張圖片
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

// 跳轉到指定圖片
const goToImage = (index) => {
  currentIndex.value = index;
};

// 自動播放功能
const startAutoPlay = () => {
  if (props.autoPlay && props.images.length > 1) {
    timer = setInterval(() => {
      nextImage();
    }, props.interval);
  }
};

// 停止自動播放
const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer);
  }
};

// 當組件掛載時啟動自動播放
onMounted(() => {
  startAutoPlay();
});

// 組件卸載時清除計時器
const beforeUnmount = () => {
  stopAutoPlay();
};

// 計算當前顯示的圖片
const currentImage = computed(() => props.images[currentIndex.value]);
</script>

<template>
  <div class="image-slider">
    <div 
      class="slider-container" 
      :style="{ height }"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
    >
      <div class="slides">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="slide"
          :class="{ active: index === currentIndex }"
        >
          <img :src="image.src" :alt="image.alt || `圖片 ${index + 1}`">
          <div class="caption" v-if="image.caption">{{ image.caption }}</div>
        </div>
      </div>
      
      <button class="prev" @click="prevImage" aria-label="前一張">&lt;</button>
      <button class="next" @click="nextImage" aria-label="下一張">&gt;</button>
    </div>
    
    <div class="indicators" v-if="images.length > 1">
      <button 
        v-for="(_, index) in images" 
        :key="index" 
        :class="{ active: index === currentIndex }"
        @click="goToImage(index)"
        :aria-label="`前往圖片 ${index + 1}`"
      ></button>
    </div>
    
    <div class="thumbnails" v-if="images.length > 1">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        class="thumbnail"
        :class="{ active: index === currentIndex }"
        @click="goToImage(index)"
      >
        <img :src="image.src" :alt="`縮略圖 ${index + 1}`">
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-slider {
  margin: 20px 0;
}

.slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 10px;
}

.slides {
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.slide.active {
  opacity: 1;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.prev:hover, .next:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;
}

.indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  border: none;
  padding: 0;
  cursor: pointer;
}

.indicators button.active {
  background-color: #333;
}

.thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnail {
  width: 80px;
  height: 60px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.thumbnail.active {
  border-color: #333;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
