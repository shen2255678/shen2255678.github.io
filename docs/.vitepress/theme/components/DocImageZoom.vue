<template>
  <ClientOnly>
    <vue-easy-lightbox
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="visible = false"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
// Global click-to-zoom for article images. Mounted once (layouts -> layout-bottom).
// Uses event delegation on .vp-doc images, so every current/future image —
// markdown ![](...) or <figure><img> — gets zoom with no per-image markup.
// Opt out on a single image with <img ... data-no-zoom>. Linked images
// (inside <a>) keep navigating instead of zooming.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const visible = ref(false)
const imgs = ref<string[]>([])
const index = ref(0)

function isZoomable(img: Element): boolean {
  return !img.closest('a') && !img.closest('[data-no-zoom]')
}

function onClick(e: MouseEvent) {
  const el = e.target as HTMLElement | null
  if (!el || el.tagName !== 'IMG') return
  const img = el as HTMLImageElement
  const doc = img.closest('.vp-doc')
  if (!doc || !isZoomable(img)) return

  const list = (Array.from(doc.querySelectorAll('img')) as HTMLImageElement[]).filter(isZoomable)
  const i = list.indexOf(img)
  if (i < 0) return

  imgs.value = list.map((n) => n.currentSrc || n.src)
  index.value = i
  visible.value = true
}

onMounted(() => document.addEventListener('click', onClick))
onBeforeUnmount(() => document.removeEventListener('click', onClick))
</script>
