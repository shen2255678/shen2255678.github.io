<template>
  <section v-if="related.length" class="rp">
    <div class="rp__head">
      <h3 class="rp__title">相關文章</h3>
      <p class="rp__sub">同支柱優先，跨支柱共享標籤次之。</p>
    </div>
    <div class="rp__grid">
      <PostCard v-for="p in related" :key="p.url" :post="p" :maxTags="2" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { data as posts } from '../posts.data.mts'
import type { Post } from '../posts.data.mts'
import PostCard from './PostCard.vue'

const route = useRoute()

const current = computed<Post | null>(() => {
  return posts.find((p) => p.url === route.path) ?? null
})

const related = computed<Post[]>(() => {
  const me = current.value
  if (!me) return []
  const myTags = new Set(me.tags)
  const scored = posts
    .filter((p) => p.url !== me.url)
    .map((p) => {
      let score = 0
      if (p.pillar === me.pillar) score += 3
      for (const t of p.tags) if (myTags.has(t)) score += 1
      return { post: p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.post.dateTimestamp - a.post.dateTimestamp)
    .slice(0, 4)
  return scored.map((x) => x.post)
})
</script>

<style scoped>
.rp {
  margin: 3rem 0 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--o-divider, var(--vp-c-divider));
}
.rp__head {
  margin-bottom: 1.25rem;
}
.rp__title {
  margin: 0 0 0.3rem;
  font-family: var(--o-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--o-t1, var(--vp-c-text-1));
}
.rp__sub {
  margin: 0;
  font-family: var(--o-sans);
  font-weight: 300;
  font-size: 0.85rem;
  color: var(--o-t3, var(--vp-c-text-3));
}
.rp__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0 1.6rem;
}
</style>
