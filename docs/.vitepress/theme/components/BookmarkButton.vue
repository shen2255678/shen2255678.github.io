<template>
  <button
    type="button"
    :class="['bk', { 'is-saved': saved, 'bk--lg': large }]"
    :aria-pressed="saved"
    :aria-label="saved ? `取消收藏：${article.title}` : `收藏：${article.title}`"
    :title="saved ? '取消收藏' : '收藏，稍後讀'"
    @click.prevent.stop="onClick"
  >
    <span class="bk__dot" aria-hidden="true"></span>
    <span class="bk__label">{{ saved ? '已收藏' : '收藏' }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBookmarks, type SavedArticle } from '../composables/useBookmarks'

const props = withDefaults(
  defineProps<{ article: SavedArticle; large?: boolean }>(),
  { large: false }
)

const { isSaved, toggle } = useBookmarks()
const saved = computed(() => isSaved(props.article.id))

function onClick() {
  toggle(props.article)
}
</script>

<style scoped>
.bk {
  position: relative;
  z-index: 2;
  font-family: var(--o-sans);
  font-size: 0.8rem;
  color: var(--o-t2);
  background: none;
  border: 1px solid var(--o-line);
  border-radius: 6px;
  padding: 0.35rem 0.8rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  white-space: nowrap;
}
.bk:hover { border-color: var(--o-t3); color: var(--o-t1); }
.bk:focus-visible {
  outline: 2px solid var(--o-slate);
  outline-offset: 2px;
}
.bk__dot {
  width: 7px; height: 7px; border-radius: 50%;
  border: 1.5px solid var(--o-t3);
  transition: background 0.2s, border-color 0.2s, transform 0.2s; flex: none;
}
.bk:active .bk__dot { transform: scale(0.85); }
.bk.is-saved { color: var(--o-slate); border-color: color-mix(in srgb, var(--o-slate) 45%, var(--o-line)); }
.bk.is-saved .bk__dot { background: var(--o-slate); border-color: var(--o-slate); }
.bk--lg { font-size: 0.92rem; padding: 0.6rem 1.2rem; border-radius: 7px; }

@media (prefers-reduced-motion: reduce) {
  .bk, .bk__dot { transition: none; }
  .bk:active .bk__dot { transform: none; }
}
</style>
