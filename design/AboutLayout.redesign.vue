<template>
  <article class="about">
    <nav class="crumb">
      <a :href="withBase('/')">首頁</a><i aria-hidden="true">›</i><span>關於</span>
    </nav>

    <p class="about__eyebrow">關於 · ABOUT</p>
    <h1 class="about__hook">{{ hook }}</h1>

    <figure v-if="banner" class="about__banner">
      <img :src="withBase(banner)" :alt="profile.name || '橫幅'" />
    </figure>

    <div class="about__lead">
      <template v-for="(p, i) in intro" :key="i">
        <p v-if="pullAt === i" class="about__pull">{{ pull }}</p>
        <p v-html="p"></p>
      </template>
      <p v-if="pull && pullAt < 0" class="about__pull">{{ pull }}</p>
    </div>

    <hr class="about__rule" />

    <section class="profile">
      <figure class="profile__photo">
        <img v-if="profile.avatar" :src="withBase(profile.avatar)" :alt="profile.name" />
        <span v-else class="ph">{{ initials }}</span>
      </figure>
      <div>
        <h2 class="profile__name">{{ profile.name }}</h2>
        <p v-if="profile.tagline" class="profile__role">{{ profile.tagline }}</p>

        <div class="meta">
          <template v-for="r in contactRows" :key="r.label">
            <span class="meta__k">{{ r.label }}</span>
            <span class="meta__v"><a v-if="r.href" :href="r.href">{{ r.value }}</a><template v-else>{{ r.value }}</template></span>
          </template>
        </div>

        <div v-if="socials.length" class="profile__social">
          <a v-for="s in socials" :key="s.url" :href="s.url" target="_blank" rel="noopener" :aria-label="s.label" :title="s.label" v-html="iconFor(s)"></a>
        </div>

        <div v-if="ctas.length" class="about__cta">
          <a v-for="(c, i) in ctas" :key="c.link" :href="c.link" :class="['btn', i === 0 ? 'btn--solid' : 'btn--ghost']">{{ c.label }}</a>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

interface SocialLink { label: string; url: string }
interface Cta { label: string; link: string }
interface Profile { name?: string; avatar?: string; tagline?: string; location?: string; email?: string }
interface AboutFm {
  hook?: string
  banner?: string
  pull?: string
  pullAfter?: number
  profile?: Profile
  intro?: string[]
  socials?: SocialLink[]
  ctas?: Cta[]
}

const { frontmatter } = useData()
const fm = computed<AboutFm>(() => frontmatter.value as AboutFm)

const hook = computed(() => fm.value.hook || '把工程腦,拿來拆自己。')
const banner = computed(() => fm.value.banner || '')
const pull = computed(() => fm.value.pull || '')
const pullAt = computed(() => (fm.value.pullAfter ?? -1))
const profile = computed<Profile>(() => fm.value.profile ?? {})
const intro = computed<string[]>(() => fm.value.intro ?? [])
const socials = computed<SocialLink[]>(() => fm.value.socials ?? [])
const ctas = computed<Cta[]>(() => fm.value.ctas ?? [])

const contactRows = computed(() => {
  const rows: { label: string; value: string; href?: string }[] = []
  if (profile.value.location) rows.push({ label: '在', value: profile.value.location })
  if (profile.value.email) rows.push({ label: '信', value: profile.value.email, href: `mailto:${profile.value.email}` })
  return rows
})

const initials = computed(() => {
  const n = profile.value.name ?? ''
  return n ? n.slice(0, 2).toUpperCase() : '?'
})

const ICONS: Record<string, string> = {
  github: '<svg viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.96 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>'
}
function iconFor(s: SocialLink): string {
  const key = (s.label || '').toLowerCase()
  return ICONS[key] || `<span class="profile__social-text">${s.label}</span>`
}
</script>

<style scoped>
.about { max-width: 760px; margin: 0 auto; padding: clamp(2.2rem, 6vw, 4rem) clamp(1.15rem, 5vw, 2rem) 6rem; }
.crumb { font-family: var(--o-mono); font-size: 0.72rem; letter-spacing: 0.06em; color: var(--o-t3); margin: 0 0 1.8rem; display: flex; gap: 0.55rem; align-items: center; }
.crumb a { color: var(--o-t3); text-decoration: none; }
.crumb a:hover { color: var(--o-t1); }
.crumb i { color: var(--o-line); font-style: normal; }
.about__eyebrow { font-family: var(--o-mono); font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--o-slate); margin: 0; }
.about__hook { font-family: var(--o-serif); font-weight: 600; font-size: clamp(2.1rem, 6.5vw, 3.4rem); line-height: 1.25; letter-spacing: 0.01em; color: var(--o-t1); margin: 1.3rem 0 2.4rem; max-width: 13em; text-wrap: balance; }
.about__banner { aspect-ratio: 21 / 9; border-radius: 8px; overflow: hidden; margin: 0 0 2.8rem; }
.about__banner img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about__lead p { font-family: var(--o-sans); font-weight: 300; font-size: 1.1rem; line-height: 1.95; color: var(--o-t1); margin: 0 0 1.4rem; max-width: 34em; }
.about__lead :deep(strong) { font-weight: 500; color: var(--o-t1); }
.about__lead :deep(a) { color: var(--o-slate); text-decoration: none; border-bottom: 1px solid color-mix(in srgb, var(--o-slate) 35%, transparent); }
.about__lead :deep(a:hover) { border-bottom-color: var(--o-slate); }
.about__pull { font-family: var(--o-serif) !important; font-weight: 500; font-size: clamp(1.3rem, 3vw, 1.55rem) !important; line-height: 1.7 !important; color: var(--o-t2) !important; margin: 2.6rem 0 !important; max-width: 22em; }
.about__rule { height: 1px; background: var(--o-divider); border: 0; margin: clamp(2.6rem, 6vw, 3.6rem) 0; }

.profile { display: grid; grid-template-columns: 190px 1fr; gap: 2.6rem; align-items: start; }
.profile__photo { aspect-ratio: 1 / 1; border-radius: 8px; overflow: hidden; margin: 0; background: var(--o-bg-soft); }
.profile__photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.profile__photo .ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--o-serif); font-size: 2rem; color: var(--o-t3); background: repeating-linear-gradient(135deg, var(--o-bg-soft), var(--o-bg-soft) 9px, var(--o-bg-wash) 9px, var(--o-bg-wash) 18px); }
.profile__name { font-family: var(--o-serif); font-weight: 600; font-size: 1.45rem; color: var(--o-t1); margin: 0 0 0.35rem; }
.profile__role { font-family: var(--o-sans); font-weight: 300; font-size: 0.92rem; color: var(--o-t2); margin: 0 0 1.7rem; line-height: 1.6; }
.meta { display: grid; grid-template-columns: auto 1fr; gap: 0.75rem 1.3rem; margin: 0 0 1.7rem; }
.meta__k { font-family: var(--o-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--o-t3); padding-top: 0.15rem; }
.meta__v { font-family: var(--o-sans); font-size: 0.95rem; color: var(--o-t1); line-height: 1.55; }
.meta__v a { color: var(--o-slate); text-decoration: none; }
.meta__v a:hover { text-decoration: underline; }
.profile__social { display: flex; gap: 0.4rem; }
.profile__social a { display: inline-flex; align-items: center; justify-content: center; color: var(--o-t3); width: 34px; height: 34px; border: 1px solid var(--o-line); border-radius: 7px; transition: 0.2s; }
.profile__social a :deep(svg) { width: 16px; height: 16px; fill: currentColor; }
.profile__social a:hover { color: var(--o-t1); border-color: var(--o-t3); }
.about__cta { margin-top: 2.8rem; display: flex; gap: 0.9rem; flex-wrap: wrap; align-items: center; }
.btn { font-family: var(--o-sans); font-weight: 500; font-size: 0.92rem; text-decoration: none; border-radius: 5px; padding: 0.72rem 1.5rem; transition: 0.2s; display: inline-block; border: 1px solid transparent; }
.btn--solid { background: var(--o-slate); color: #fff; }
.btn--solid:hover { opacity: 0.88; }
.btn--ghost { color: var(--o-t1); border-color: var(--o-line); }
.btn--ghost:hover { border-color: var(--o-t3); }
@media (max-width: 600px) { .profile { grid-template-columns: 1fr; gap: 1.6rem; } .profile__photo { max-width: 160px; } }
</style>
