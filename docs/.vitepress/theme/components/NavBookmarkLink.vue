<template>
  <a class="nav-bk" :href="withBase('/saved')" :aria-label="`收藏清單，${count} 篇`">
    收藏
    <span class="nav-bk__count" :data-empty="count === 0">{{ count }}</span>
  </a>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { useBookmarks } from '../composables/useBookmarks'

const { count } = useBookmarks()
</script>

<style scoped>
.nav-bk {
  font-family: var(--o-sans);
  font-size: 0.85rem;
  color: var(--o-t2);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.65rem;
  border-radius: 7px;
  transition: color 0.2s, background 0.2s;
}
.nav-bk:hover { color: var(--o-t1); background: var(--o-bg-soft); }
.nav-bk:focus-visible { outline: 2px solid var(--o-slate); outline-offset: 2px; }
.nav-bk__count {
  font-family: var(--o-mono);
  font-size: 0.64rem;
  min-width: 1.15rem;
  height: 1.15rem;
  padding: 0 0.32rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--o-slate);
  color: #fff;
  border-radius: 999px;
}
.nav-bk__count[data-empty="true"] { background: var(--o-bg-soft); color: var(--o-t3); }

/* On narrow screens the nav collapses; keep the saved entry compact. */
@media (max-width: 768px) {
  .nav-bk { padding: 0.4rem 0.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  .nav-bk { transition: none; }
}
</style>
