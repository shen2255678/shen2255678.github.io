<template>
  <div v-if="enabled" class="comments-wrap">
    <h3 class="comments-title">留言</h3>
    <ClientOnly>
      <Giscus
        :repo="cfg.repo"
        :repo-id="cfg.repoId"
        :category="cfg.category"
        :category-id="cfg.categoryId"
        mapping="pathname"
        strict="0"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="bottom"
        :theme="giscusTheme"
        lang="zh-TW"
        loading="lazy"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import Giscus from '@giscus/vue'

interface GiscusConfig {
  provider?: string
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
}

const { isDark, theme, frontmatter } = useData()

const cfg = computed<GiscusConfig>(() => {
  const c = (theme.value as { comments?: GiscusConfig }).comments ?? {}
  return c
})

const enabled = computed(() => {
  if (frontmatter.value.comments === false) return false
  const c = cfg.value
  if (c.provider !== 'giscus') return false
  if (!c.repoId || c.repoId.startsWith('your-') || !c.categoryId || c.categoryId.startsWith('your-')) {
    if (typeof console !== 'undefined') {
      console.warn('[Comments] Giscus repoId/categoryId not configured; comments hidden.')
    }
    return false
  }
  return true
})

const giscusTheme = computed(() => (isDark.value ? 'dark' : 'light'))
</script>

<style scoped>
.comments-wrap {
  margin: 3rem 0 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}
.comments-title {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
</style>
