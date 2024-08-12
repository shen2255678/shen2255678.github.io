<template>
  <swiper :pagination="true" :modules="modules"
  
   class="mySwiper">
    <swiper-slide>
        <img src="../docs//image/resort.jpg" alt="Image 1" />
      </swiper-slide>
      <swiper-slide>
        <img src="../docs/image/sky.jpg" alt="Image 2" />
      </swiper-slide>
      <swiper-slide>
        <img src="../docs/image/lion.jpg" alt="Image 3" />
      </swiper-slide>
  </swiper>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';


  // import required modules
  import { Pagination } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Pagination],
      };
    },
  };
</script>

<style scoped>





</style>