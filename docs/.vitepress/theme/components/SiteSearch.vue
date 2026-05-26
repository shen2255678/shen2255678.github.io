<template>
  <button class="ss-trigger" aria-label="搜尋全站文章" @click="open">
    <span class="ss-trigger__icon" aria-hidden="true">🔍</span>
    <span class="ss-trigger__label">搜尋</span>
    <span class="ss-trigger__kbd">/</span>
  </button>

  <Teleport to="body">
    <div v-if="opened" class="ss-overlay" role="dialog" aria-modal="true" @click.self="close" @keydown.esc="close">
      <div class="ss-panel">
        <button class="ss-close" aria-label="關閉搜尋" @click="close">✕</button>
        <div v-if="errorMsg" class="ss-fallback">{{ errorMsg }}</div>
        <div ref="container" id="pagefind-search"></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'

const opened = ref(false)
const container = ref<HTMLElement | null>(null)
const errorMsg = ref<string>('')
let ui: any = null

async function open() {
  opened.value = true
  errorMsg.value = ''
  await nextTick()
  if (ui) return
  try {
    const cssHref = withBase('/pagefind/pagefind-ui.css')
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssHref
      document.head.appendChild(link)
    }
    // Pagefind is only generated at build time. In dev, this import fails — show hint.
    const mod: any = await import(/* @vite-ignore */ withBase('/pagefind/pagefind-ui.js'))
    ui = new mod.PagefindUI({
      element: '#pagefind-search',
      showSubResults: true,
      showImages: false,
      resetStyles: false,
      translations: {
        placeholder: '搜尋文章標題、摘要、內文…',
        clear_search: '清除',
        load_more: '載入更多',
        search_label: '站內搜尋',
        filters_label: '篩選',
        zero_results: '找不到「[SEARCH_TERM]」的結果',
        many_results: '找到 [COUNT] 篇符合「[SEARCH_TERM]」',
        one_result: '找到 1 篇符合「[SEARCH_TERM]」',
        alt_search: '找不到「[SEARCH_TERM]」— 你是不是要找「[DIFFERENT_TERM]」？',
        search_suggestion: '找不到「[SEARCH_TERM]」— 試試這些字：',
        searching: '搜尋「[SEARCH_TERM]」中…'
      }
    })
  } catch (e) {
    errorMsg.value = '搜尋索引尚未產生（dev 模式不會有，請執行 npm run docs:build 後 npm run docs:preview）。'
  }
}

function close() {
  opened.value = false
}

function onKey(e: KeyboardEvent) {
  if (opened.value) return
  if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
    e.preventDefault()
    open()
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.ss-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.7rem;
  margin-left: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.ss-trigger:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.ss-trigger__icon {
  font-size: 0.9rem;
}
.ss-trigger__kbd {
  padding: 0.05rem 0.4rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.72rem;
  font-family: ui-monospace, monospace;
  color: var(--vp-c-text-3);
}
@media (max-width: 640px) {
  .ss-trigger__label,
  .ss-trigger__kbd {
    display: none;
  }
}

.ss-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 8vh 1rem 1rem;
  backdrop-filter: blur(2px);
}
.ss-panel {
  position: relative;
  width: min(720px, 100%);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem 1.25rem 1.5rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.3);
  max-height: 80vh;
  overflow: auto;
}
.ss-close {
  position: absolute;
  top: 0.5rem;
  right: 0.65rem;
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
}
.ss-close:hover {
  color: var(--vp-c-brand-1);
}
.ss-fallback {
  padding: 1rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
