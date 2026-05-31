// useBookmarks.ts — client-side reading list (收藏), no backend.
// Stores saved articles in localStorage under one key; reactive + SSR-safe.
// Swap the load/persist bodies for API calls later without touching callers.
import { ref, computed, onMounted, getCurrentInstance } from 'vue'

const KEY = 'saved_articles'

export interface SavedArticle {
  id: string
  title: string
  url: string
  date?: string
  cover?: string
  tags?: string[]
}

const saved = ref<SavedArticle[]>([])
let hydrated = false
let listening = false

function load() {
  if (typeof localStorage === 'undefined') return
  try {
    saved.value = JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    saved.value = []
  }
}

function persist() {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(saved.value))
}

// Hydrate once on the client, AFTER mount, and keep tabs in sync. Reading
// localStorage synchronously in setup() would make the first client render
// differ from the server HTML (empty list / count 0) → hydration mismatch.
function hydrateOnce() {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  load()
  if (!listening) {
    listening = true
    window.addEventListener('storage', (e) => {
      if (e.key === KEY) load()
    })
  }
}

export function useBookmarks() {
  // Defer hydration to onMounted so the SSR output (count 0 / unsaved) matches
  // the first client render; real values populate right after mount.
  if (typeof window !== 'undefined' && getCurrentInstance()) {
    onMounted(hydrateOnce)
  }

  const count = computed(() => saved.value.length)
  const isSaved = (id: string) => saved.value.some((a) => a.id === id)

  function toggle(article: SavedArticle): boolean {
    const i = saved.value.findIndex((a) => a.id === article.id)
    if (i >= 0) {
      saved.value.splice(i, 1)
      persist()
      return false // removed
    }
    saved.value.unshift(article)
    persist()
    return true // added
  }

  function remove(id: string) {
    const i = saved.value.findIndex((a) => a.id === id)
    if (i >= 0) {
      saved.value.splice(i, 1)
      persist()
    }
  }

  return { saved, count, isSaved, toggle, remove }
}
