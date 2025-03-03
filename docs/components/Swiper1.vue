<template>
  <div class="swiper-container">
    <swiper
      :slides-per-view="slidesPerView"
      :space-between="20"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="modules"
      class="my-swiper"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index" class="swiper-slide">
        <div class="slide-content">
          <img :src="slide.image" :alt="slide.title" class="slide-image" />
          <div class="slide-text">
            <h3>{{ slide.title }}</h3>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Example slides data
const slides = [
  {
    title: 'Vue.js Development',
    description: 'Building modern web applications with Vue.js',
    image: 'https://images.unsplash.com/photo-1493119508027-2b584f234d6c?w=800&auto=format&fit=crop'
  },
  {
    title: 'AI Integration',
    description: 'Implementing AI solutions in enterprise applications',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop'
  },
  {
    title: 'Cloud Architecture',
    description: 'Designing scalable cloud infrastructure',
    image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&auto=format&fit=crop'
  },
  {
    title: 'Mobile Development',
    description: 'Creating responsive cross-platform applications',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop'
  }
];

const modules = [Pagination, Navigation, Autoplay];

// Responsive slides per view
const width = ref(0);

onMounted(() => {
  width.value = window.innerWidth;
  window.addEventListener('resize', () => {
    width.value = window.innerWidth;
  });
});

const slidesPerView = computed(() => {
  if (width.value < 640) return 1;
  if (width.value < 1024) return 2;
  return 3;
});
</script>

<style scoped>
.swiper-container {
  width: 100%;
  margin: 3rem 0;
}

.my-swiper {
  padding-bottom: 50px;
}

.swiper-slide {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.swiper-slide:hover {
  transform: translateY(-5px);
}

.slide-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.slide-image {
  width: 100%;
  height: 60%;
  object-fit: cover;
}

.slide-text {
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.slide-text h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.slide-text p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .swiper-slide {
    height: 250px;
  }
}
</style>