---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Haowei Project"
  text: "A VitePress Site"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples
features:
  - icon: 🛠️
    title: Travel
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Coding
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Life
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

 ## 探索的足跡

 ​



<!-- ![巴黎的春天](/image/river.jpg){.full-width-image} -->

<ImageSlider />
<ImageSlider1 />
<BackToTop />
<script setup>
import { ref } from 'vue'
import ImageSlider  from '../components/photoWall.vue'
import ImageSlider1  from '../components/Swiper1.vue'
import BackToTop from '../components/BackToTop.vue'

</script>
<style>
:root {
--vp-home-hero-name-color: transparent;
--vp-home-hero-name-background: -webkit-linear-gradient(128deg, #bd34fe, #41d1ff);
  }

.full-width-image {
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>