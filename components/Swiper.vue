<template>
    <div>
      <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
      
      >
        <swiper-slide>
          <img src="../docs/image/river.jpg" alt="Image 1" @click="showImage(0)" />
        </swiper-slide>
        <swiper-slide>
          <img src="../docs/image/swiss_train1.jpg" alt="Image 2" @click="showImage(1)" />
        </swiper-slide>
        <swiper-slide>
          <img src="../docs/image/swiss_train2.jpg" alt="Image 3" @click="showImage(2)" />
        </swiper-slide>
      </swiper>
  
      <vue-easy-lightbox
        :visible="visibleRef"
        :imgs="imgsRef"
        :index="indexRef"
        @hide="onHide"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import VueEasyLightbox from 'vue-easy-lightbox';
  import river from '../docs/image/river.jpg'
import train1 from '../docs/image/swiss_train1.jpg'
import train2 from '../docs/image/swiss_train2.jpg'
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  
  const modules = [Navigation, Pagination, Scrollbar, A11y];
  
  const visibleRef = ref(false);
  const indexRef = ref(0);
  const imgsRef = ref([river, train1, train2])

  
//   const showImage = (index) => {
//     indexRef.value = index;
//     visibleRef.value = true;
//   };
  
//   const onHide = () => {
//     visibleRef.value = false;
//   };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  