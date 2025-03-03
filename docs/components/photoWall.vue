<template>
  <div class="photo-wall">
    <div class="photo-container">
      <img 
        v-for="(image, index) in images" 
        :key="index" 
        :src="image.src" 
        :alt="image.alt || 'Photo ' + (index + 1)" 
        @click="() => showLightbox(index)"
        class="photo"
      />
    </div>
    
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="images"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';

// Sample images - replace with your own
const images = [
  { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', alt: 'Mountain landscape' },
  { src: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5', alt: 'Beach sunset' },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', alt: 'Forest path' },
  { src: 'https://images.unsplash.com/photo-1504567961542-e24d9439a724', alt: 'Lake view' },
  { src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e', alt: 'Mountain lake' },
];

const visibleRef = ref(false);
const indexRef = ref(0);

const showLightbox = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = () => {
  visibleRef.value = false;
};
</script>

<style scoped>
.photo-wall {
  width: 100%;
  margin: 2rem 0;
}

.photo-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
  margin-bottom: 2rem;
}

.photo {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.photo:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .photo-container {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>