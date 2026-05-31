<template>
  <div class="saved">
    <header class="hero">
      <p class="hero__eyebrow">收藏 · READING LIST</p>
      <h1 class="hero__title">想看的，先收進來。</h1>
      <p class="hero__sub">
        收藏只存在你自己的瀏覽器，不需要登入。換裝置或清除瀏覽資料會消失。
        <template v-if="saved.length">目前共 <strong>{{ saved.length }}</strong> 篇。</template>
      </p>
    </header>

    <section class="sec">
      <div v-if="saved.length" class="posts">
        <article v-for="a in saved" :key="a.id" class="ac">
          <a class="ac__link" :href="withBase(a.url)" :aria-label="a.title"></a>
          <div class="ac__img" :class="{ 'ac__img--ph': !a.cover }">
            <img v-if="a.cover" :src="withBase(a.cover)" :alt="a.title" loading="lazy" decoding="async" />
            <span v-else class="ph">{{ (a.tags && a.tags[0]) || 'POST' }}</span>
          </div>
          <div class="ac__bodywrap">
            <div v-if="a.tags && a.tags.length" class="tags">
              <span v-for="t in a.tags.slice(0, 3)" :key="t" class="tag">{{ t }}</span>
            </div>
            <h3 class="ac__title">{{ a.title }}</h3>
            <div class="ac__foot">
              <time class="ac__date">{{ a.date }}</time>
              <BookmarkButton :article="a" />
            </div>
          </div>
        </article>
      </div>

      <div v-else class="saved-empty">
        還沒有收藏的文章。<br />在任何文章或卡片按「收藏」，就會出現在這裡。<br /><br />
        <a :href="withBase('/')">回首頁逛逛 →</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import BookmarkButton from '../components/BookmarkButton.vue'
import { useBookmarks } from '../composables/useBookmarks'

const { saved } = useBookmarks()
</script>

<style scoped>
.saved { max-width: 1000px; margin: 0 auto; padding: clamp(2.5rem, 7vw, 5rem) clamp(1.15rem, 5vw, 2rem) 6rem; }
.hero { display: grid; gap: 1.2rem; }
.hero__eyebrow { font-family: var(--o-mono); font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--o-slate); margin: 0; }
.hero__title { font-family: var(--o-serif); font-weight: 600; color: var(--o-t1); font-size: clamp(2rem, 5.5vw, 3.1rem); line-height: 1.28; margin: 0; max-width: 13em; }
.hero__sub { font-family: var(--o-sans); font-weight: 300; color: var(--o-t2); font-size: 1.05rem; line-height: 1.85; max-width: 34em; margin: 0; }
.hero__sub :deep(strong), .hero__sub strong { font-weight: 500; color: var(--o-t1); }
.sec { padding-top: 2.5rem; }
.posts { display: flex; flex-direction: column; }

.ac { position: relative; display: grid; grid-template-columns: 210px 1fr; gap: 1.6rem; padding: 1.6rem 0; border-top: 1px solid var(--o-divider); transition: padding-left 0.3s, background 0.3s; }
.ac:hover { background: var(--o-bg-soft); padding-left: 1rem; }
.ac:focus-within { background: var(--o-bg-soft); }
.ac__link { position: absolute; inset: 0; z-index: 1; border-radius: 6px; }
.ac__link:focus-visible { outline: 2px solid var(--o-slate); outline-offset: 4px; }
.ac__img { aspect-ratio: 16 / 10; border-radius: 5px; overflow: hidden; background: var(--o-bg-soft); }
.ac__img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; text-align: center; background: repeating-linear-gradient(135deg, var(--o-bg-soft), var(--o-bg-soft) 9px, var(--o-bg-wash) 9px, var(--o-bg-wash) 18px); color: var(--o-t3); font-family: var(--o-mono); font-size: 0.72rem; letter-spacing: 0.1em; }
.ac__bodywrap { display: flex; flex-direction: column; min-width: 0; }
.tags { display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center; }
.tag { font-family: var(--o-mono); font-size: 0.66rem; letter-spacing: 0.03em; color: var(--o-slate); background: color-mix(in srgb, var(--o-slate) 12%, var(--o-bg)); padding: 0.22rem 0.55rem; border-radius: 3px; }
.ac__title { font-family: var(--o-serif); font-weight: 600; font-size: 1.25rem; line-height: 1.45; color: var(--o-t1); margin: 0.55rem 0 0.5rem; transition: color 0.25s; }
.ac:hover .ac__title { color: var(--o-slate); }
.ac__foot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: auto; padding-top: 0.4rem; }
.ac__date { font-family: var(--o-mono); font-size: 0.7rem; color: var(--o-t3); letter-spacing: 0.04em; }

.saved-empty { font-family: var(--o-sans); font-weight: 300; color: var(--o-t3); font-size: 1rem; line-height: 1.8; text-align: center; padding: 4rem 1rem; border-top: 1px solid var(--o-divider); }
.saved-empty a { color: var(--o-slate); text-decoration: none; }
.saved-empty a:hover { text-decoration: underline; }
@media (max-width: 600px) { .ac { grid-template-columns: 1fr; gap: 1rem; } }
@media (prefers-reduced-motion: reduce) {
  .ac { transition: none; }
}
</style>
