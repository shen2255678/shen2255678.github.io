<template>
  <ul class="featured">
    <li v-for="post in posts" :key="post.slug" class="featured__item">
      <a :href="link(post.slug)" class="featured__link">
        <h4 class="featured__title">{{ post.title }}</h4>
        <p v-if="post.desc" class="featured__desc">{{ post.desc }}</p>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

interface FeaturedPost {
  slug: string
  title: string
  desc?: string
}

defineProps<{ posts: FeaturedPost[] }>()

function link(slug: string): string {
  return withBase('/' + slug.replace(/^\//, ''))
}
</script>

<style scoped>
.featured {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}
.featured__item {
  padding: 0;
}
.featured__link {
  display: block;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s, background 0.15s;
}
.featured__link:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}
.featured__title {
  margin: 0 0 0.25rem;
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.featured__desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
