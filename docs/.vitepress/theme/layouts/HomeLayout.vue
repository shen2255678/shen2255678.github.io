<template>
  <div class="home">
    <header class="hero">
      <p class="hero__eyebrow">{{ eyebrow }}</p>
      <h1 class="hero__title">{{ heroTitle }}</h1>
      <p class="hero__sub" v-html="heroSub"></p>
    </header>

    <section v-if="projects.length" class="sec">
      <div class="sec__head">
        <span class="sec__no">{{ nums.projects }}</span>
        <h2 class="sec__label">正在打造</h2>
        <span class="sec__hint">Building in public</span>
      </div>
      <ProjectCard
        v-for="(p, i) in projects"
        :key="p.link"
        :index="String(i + 1).padStart(2, '0')"
        :title="p.title"
        :description="p.description"
        :link="p.link"
        :stack="p.stack || []"
        :status="p.status || ''"
      />
    </section>

    <section v-if="featured.length" class="sec">
      <div class="sec__head">
        <span class="sec__no">{{ nums.featured }}</span>
        <h2 class="sec__label">從這裡開始</h2>
        <span class="sec__hint">第一次來，先讀這幾篇</span>
      </div>
      <div class="posts">
        <PostCard v-for="p in featured" :key="p.url" :post="p" />
      </div>
    </section>

    <section class="sec">
      <div class="sec__head">
        <span class="sec__no">{{ nums.latest }}</span>
        <h2 class="sec__label">最新文章</h2>
        <a class="sec__hint sec__hint--link" :href="withBase('/archive')">查看全部 →</a>
      </div>
      <div v-if="latest.length" class="posts">
        <PostCard v-for="p in latest" :key="p.url" :post="p" />
      </div>
      <p v-else class="home-empty">還沒有 Post — 寫作中。</p>
    </section>

    <section class="sec">
      <BeehiivSubscribeForm variant="band" source="home" />
    </section>

    <PillarIndex :section-no="nums.pillars" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import ProjectCard from '../components/ProjectCard.vue'
import PostCard from '../components/PostCard.vue'
import BeehiivSubscribeForm from '../components/BeehiivSubscribeForm.vue'
import PillarIndex from '../components/PillarIndex.vue'
import { data as posts } from '../posts.data.mts'

interface Project { title: string; description: string; link: string; stack?: string[]; status?: string }
interface HomeFrontmatter {
  eyebrow?: string
  heroTitle?: string
  heroSub?: string
  projects?: Project[]
}

const { frontmatter } = useData()
const fm = computed<HomeFrontmatter>(() => frontmatter.value as HomeFrontmatter)

const eyebrow = computed(() => fm.value.eyebrow || 'SYSTEM / SELF / JOURNEY')
const heroTitle = computed(() => fm.value.heroTitle || '把人生當成一套可以重構的系統')
const heroSub = computed(
  () => fm.value.heroSub || '全端開發、<strong>系統化思維</strong>與深度旅行交織的筆記。'
)
const projects = computed<Project[]>(() => fm.value.projects ?? [])

const featured = computed(() => posts.filter((p) => p.pin).slice(0, 3))
const latest = computed(() => posts.filter((p) => !p.pin).slice(0, 6))

// Section numbers stay sequential no matter which sections are present.
const nums = computed(() => {
  let n = 0
  const pad = () => String(++n).padStart(2, '0')
  const out: Record<string, string> = {}
  if (projects.value.length) out.projects = pad()
  if (featured.value.length) out.featured = pad()
  out.latest = pad()
  out.pillars = pad()
  return out
})
</script>

<style scoped>
.home { max-width: 1000px; margin: 0 auto; padding: clamp(2.5rem, 7vw, 5rem) clamp(1.15rem, 5vw, 2rem) 6rem; }
.hero { display: grid; gap: 1.8rem; padding-bottom: clamp(2.5rem, 6vw, 4rem); border-bottom: 1px solid var(--o-divider); }
.hero__eyebrow { font-family: var(--o-mono); font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--o-slate); margin: 0; }
.hero__title { font-family: var(--o-serif); font-weight: 600; color: var(--o-t1); font-size: clamp(2rem, 5.5vw, 3.1rem); line-height: 1.28; margin: 0; max-width: 13em; letter-spacing: 0.01em; text-wrap: balance; }
.hero__sub { font-family: var(--o-sans); font-weight: 300; color: var(--o-t2); font-size: 1.05rem; line-height: 1.85; max-width: 34em; margin: 0; }
.hero__sub :deep(strong) { font-weight: 500; color: var(--o-t1); }
.sec { padding-top: clamp(2.8rem, 6vw, 4.2rem); }
.sec__head { display: flex; align-items: baseline; gap: 0.9rem; margin-bottom: 2rem; }
.sec__no { font-family: var(--o-mono); font-size: 0.78rem; color: var(--o-slate); letter-spacing: 0.05em; }
.sec__label { font-family: var(--o-serif); font-weight: 600; font-size: 1.25rem; color: var(--o-t1); margin: 0; }
.sec__hint { margin-left: auto; font-family: var(--o-sans); font-weight: 300; font-size: 0.84rem; color: var(--o-t3); text-decoration: none; }
.sec__hint--link { color: var(--o-slate); transition: color 0.2s; }
.sec__hint--link:hover { color: var(--o-t1); }
.posts { display: flex; flex-direction: column; }
.home-empty { color: var(--o-t3); font-weight: 300; padding: 1rem 0; font-family: var(--o-sans); }
</style>
