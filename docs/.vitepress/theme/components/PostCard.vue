<template>
  <div class="ac-wrap">
    <article class="ac">
      <a class="ac__link" :href="withBase(post.url)" :aria-label="post.title"></a>

      <div class="ac__img" :class="{ 'ac__img--ph': !post.cover }">
        <img v-if="post.cover" :src="withBase(post.cover)" :alt="post.title" loading="lazy" decoding="async" />
        <span v-else class="ph">{{ pillarLabel }}</span>
      </div>

      <div class="ac__bodywrap">
        <div v-if="visibleTags.length" class="tags">
          <span v-for="t in visibleTags" :key="t" class="tag">{{ t }}</span>
          <span v-if="overflow > 0" class="tag tag--more">+{{ overflow }}</span>
        </div>

        <h3 class="ac__title">{{ post.title }}</h3>
        <p v-if="post.excerpt" class="ac__ex">{{ post.excerpt }}</p>

        <div class="ac__foot">
          <time class="ac__date" :datetime="post.date">{{ formattedDate }}</time>
          <BookmarkButton :article="article" />
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import type { Post } from '../posts.data.mts'
import { pillarsBySlug } from '../../data/pillars'
import BookmarkButton from './BookmarkButton.vue'
import type { SavedArticle } from '../composables/useBookmarks'

const props = withDefaults(
  defineProps<{ post: Post; maxTags?: number }>(),
  { maxTags: 2 }
)

const visibleTags = computed(() => props.post.tags.slice(0, props.maxTags))
const overflow = computed(() => Math.max(0, props.post.tags.length - props.maxTags))
const pillarLabel = computed(() => pillarsBySlug[props.post.pillar]?.title ?? '')

const formattedDate = computed(() => {
  // UTC getters: post.date is a date-only string (parsed as UTC midnight), so
  // UTC getters give the intended day deterministically on server + client.
  // Local getters drift by a day in negative-UTC zones → wrong date + hydration mismatch.
  const d = new Date(props.post.date)
  return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}`
})

const article = computed<SavedArticle>(() => ({
  id: props.post.url,
  title: props.post.title,
  url: props.post.url,
  date: formattedDate.value,
  cover: props.post.cover || '',
  tags: props.post.tags
}))
</script>

<style scoped>
/* Wrapper is the query container so the card adapts to ANY context:
   full-width list (home) -> row; narrow grid cell (RelatedPosts) -> stacked. */
.ac-wrap { container-type: inline-size; }
.ac {
  position: relative;
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: 1.6rem;
  padding: 1.6rem 0;
  border-top: 1px solid var(--o-divider);
  transition: padding-left 0.3s, background 0.3s;
}
.ac:hover { background: var(--o-bg-soft); padding-left: 1rem; }
.ac:focus-within { background: var(--o-bg-soft); }
.ac__link { position: absolute; inset: 0; z-index: 1; border-radius: 6px; }
.ac__link:focus-visible { outline: 2px solid var(--o-slate); outline-offset: 4px; }
.ac__img { aspect-ratio: 16 / 10; border-radius: 5px; overflow: hidden; background: var(--o-bg-soft); }
.ac__img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
.ac:hover .ac__img img { transform: scale(1.04); }
.ph {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center; text-align: center;
  background: repeating-linear-gradient(135deg, var(--o-bg-soft), var(--o-bg-soft) 9px, var(--o-bg-wash) 9px, var(--o-bg-wash) 18px);
  color: var(--o-t3); font-family: var(--o-mono); font-size: 0.72rem; letter-spacing: 0.1em;
}
.ac__bodywrap { display: flex; flex-direction: column; min-width: 0; }
.tags { display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center; }
.tag {
  font-family: var(--o-mono); font-size: 0.66rem; letter-spacing: 0.03em;
  color: var(--o-slate); background: color-mix(in srgb, var(--o-slate) 12%, var(--o-bg));
  padding: 0.22rem 0.55rem; border-radius: 3px; line-height: 1.4;
}
.tag--more { color: var(--o-t3); background: transparent; padding-left: 0; }
.ac__title {
  font-family: var(--o-serif); font-weight: 600; font-size: 1.25rem; line-height: 1.45;
  color: var(--o-t1); margin: 0.55rem 0 0.5rem; transition: color 0.25s;
}
.ac:hover .ac__title { color: var(--o-slate); }
.ac__ex {
  font-family: var(--o-sans); font-weight: 300; font-size: 0.9rem; line-height: 1.75;
  color: var(--o-t2); margin: 0 0 0.7rem; max-width: 40em;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.ac__foot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: auto; padding-top: 0.4rem; }
.ac__date { font-family: var(--o-mono); font-size: 0.7rem; color: var(--o-t3); letter-spacing: 0.04em; }

/* Container-based: stack when the card's own box gets narrow. */
@container (max-width: 460px) {
  .ac { grid-template-columns: 1fr; gap: 1rem; }
}
/* Viewport fallback for browsers without container-query support. */
@media (max-width: 600px) { .ac { grid-template-columns: 1fr; gap: 1rem; } }
@media (prefers-reduced-motion: reduce) {
  .ac, .ac__img img, .ac__title { transition: none; }
  .ac:hover .ac__img img { transform: none; }
}
</style>
