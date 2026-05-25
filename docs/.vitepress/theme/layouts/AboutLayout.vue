<template>
  <article class="ab-wrap">
    <!-- Top section: profile card + intro -->
    <section class="ab-top">
      <aside class="ab-profile">
        <div class="ab-profile__inner">
          <div class="ab-avatar">
            <img v-if="profile.avatar" :src="withBase(profile.avatar)" :alt="profile.name" />
            <span v-else class="ab-avatar__initials">{{ initials }}</span>
          </div>
          <h2 class="ab-name">{{ profile.name }}</h2>
          <p v-if="profile.tagline" class="ab-tagline">{{ profile.tagline }}</p>

          <ul v-if="contactRows.length" class="ab-contact">
            <li v-for="r in contactRows" :key="r.label">
              <span class="ab-contact__label">{{ r.label }}</span>
              <span class="ab-contact__value">{{ r.value }}</span>
            </li>
          </ul>

          <div v-if="socials.length" class="ab-socials">
            <a
              v-for="s in socials"
              :key="s.url"
              :href="s.url"
              target="_blank"
              rel="noopener"
              class="ab-social"
            >{{ s.label }}</a>
          </div>
        </div>
      </aside>

      <div class="ab-main">
        <nav class="ab-crumb">
          <a :href="withBase('/')">首頁</a>
          <span aria-hidden="true">›</span>
          <span>關於</span>
        </nav>
        <h1 class="ab-title">{{ heroTitle }}</h1>
        <div class="ab-intro">
          <p v-for="(p, i) in intro" :key="i" v-html="p" />
        </div>
      </div>
    </section>

    <!-- Roles chips -->
    <section v-if="roles.length" class="ab-section">
      <h3 class="ab-section__title">在做的事</h3>
      <div class="ab-chips">
        <span v-for="r in roles" :key="r" class="ab-chip">{{ r }}</span>
      </div>
    </section>

    <!-- Experience + Publications -->
    <section
      v-if="experience.length || publications.length"
      class="ab-bottom"
    >
      <div v-if="experience.length" class="ab-col">
        <h3 class="ab-section__title">經歷</h3>
        <ul class="ab-list ab-list--exp">
          <li v-for="(e, i) in experience" :key="i" class="ab-exp">
            <div class="ab-exp__head">
              <a v-if="e.url" :href="e.url" target="_blank" rel="noopener" class="ab-exp__org">{{ e.org }}</a>
              <span v-else class="ab-exp__org">{{ e.org }}</span>
              <span v-if="e.period" class="ab-exp__period">{{ e.period }}</span>
            </div>
            <p v-if="e.role" class="ab-exp__role">{{ e.role }}</p>
          </li>
        </ul>
      </div>
      <div v-if="publications.length" class="ab-col">
        <h3 class="ab-section__title">出版 / 寫過的東西</h3>
        <ul class="ab-list ab-list--pub">
          <li v-for="(p, i) in publications" :key="i">
            <a v-if="p.url" :href="p.url" target="_blank" rel="noopener">{{ p.title }}</a>
            <span v-else>{{ p.title }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Footer card -->
    <section class="ab-footer">
      <div>
        <p class="ab-footer__copy">{{ footerLine }}</p>
        <p v-if="footerNote" class="ab-footer__note">{{ footerNote }}</p>
      </div>
      <div class="ab-socials ab-socials--sm">
        <a
          v-for="s in socials"
          :key="s.url"
          :href="s.url"
          target="_blank"
          rel="noopener"
          class="ab-social"
        >{{ s.label }}</a>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

interface ContactRow { label: string; value: string }
interface SocialLink { label: string; url: string }
interface Experience { org: string; role?: string; period?: string; url?: string }
interface Publication { title: string; url?: string }
interface AboutProfile {
  name?: string
  avatar?: string
  tagline?: string
  location?: string
  email?: string
  company?: string
}
interface AboutFrontmatter {
  heroTitle?: string
  profile?: AboutProfile
  intro?: string[]
  roles?: string[]
  experience?: Experience[]
  publications?: Publication[]
  socials?: SocialLink[]
  footerLine?: string
  footerNote?: string
}

const { frontmatter } = useData()
const fm = computed<AboutFrontmatter>(() => frontmatter.value as AboutFrontmatter)

const profile = computed<AboutProfile>(() => fm.value.profile ?? {})
const heroTitle = computed(() => fm.value.heroTitle || '哈囉，世界！')
const intro = computed<string[]>(() => fm.value.intro ?? [])
const roles = computed<string[]>(() => fm.value.roles ?? [])
const experience = computed<Experience[]>(() => fm.value.experience ?? [])
const publications = computed<Publication[]>(() => fm.value.publications ?? [])
const socials = computed<SocialLink[]>(() => fm.value.socials ?? [])
const footerLine = computed(
  () => fm.value.footerLine || `© ${new Date().getFullYear()} ${profile.value.name ?? ''}`.trim()
)
const footerNote = computed(() => fm.value.footerNote || '')

const contactRows = computed<ContactRow[]>(() => {
  const rows: ContactRow[] = []
  if (profile.value.location) rows.push({ label: '在', value: profile.value.location })
  if (profile.value.company) rows.push({ label: '做', value: profile.value.company })
  if (profile.value.email) rows.push({ label: '信', value: profile.value.email })
  return rows
})

const initials = computed(() => {
  const name = profile.value.name ?? ''
  if (!name) return '?'
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
})
</script>

<style scoped>
.ab-wrap {
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Top */
.ab-top {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
  align-items: start;
}
.ab-profile {
  position: sticky;
  top: calc(var(--vp-nav-height, 64px) + 1rem);
}
.ab-profile__inner {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.ab-avatar {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}
.ab-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ab-avatar__initials {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  letter-spacing: 0.08em;
}
.ab-name {
  margin: 0.25rem 0 0;
  font-size: 1.4rem;
  font-weight: 700;
}
.ab-tagline {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.5;
}
.ab-contact {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.85rem;
}
.ab-contact li {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 0.6rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
  word-break: break-all;
}
.ab-contact__label {
  color: var(--vp-c-text-3);
}
.ab-socials {
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.ab-social {
  font-size: 0.78rem;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: border-color 0.15s, color 0.15s;
}
.ab-social:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

/* Main right column */
.ab-main {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.75rem 2rem;
}
.ab-crumb {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
  display: flex;
  gap: 0.4rem;
}
.ab-crumb a {
  color: var(--vp-c-text-3);
  text-decoration: none;
}
.ab-crumb a:hover { color: var(--vp-c-brand-1); }
.ab-title {
  margin: 0.25rem 0 1.25rem;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 0.03em;
}
.ab-intro p {
  margin: 0 0 1rem;
  color: var(--vp-c-text-1);
  font-size: 1rem;
  line-height: 1.85;
}
.ab-intro p:last-child { margin-bottom: 0; }
.ab-intro :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
.ab-intro :deep(strong) { color: var(--vp-c-text-1); }

/* Sections */
.ab-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem 1.75rem;
}
.ab-section__title {
  margin: 0 0 0.85rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  letter-spacing: 0.05em;
  font-weight: 500;
}
.ab-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.ab-chip {
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  background: var(--vp-c-bg-soft);
}

/* Bottom (experience + publications) */
.ab-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.ab-col {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem 1.75rem;
}
.ab-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.ab-exp {
  position: relative;
  padding-left: 1rem;
}
.ab-exp::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
}
.ab-exp__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.ab-exp__org {
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}
a.ab-exp__org:hover { color: var(--vp-c-brand-1); }
.ab-exp__period {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
.ab-exp__role {
  margin: 0.2rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
}
.ab-list--pub li a,
.ab-list--pub li span {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.ab-list--pub li a:hover { color: var(--vp-c-brand-1); }

/* Footer */
.ab-footer {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.ab-footer__copy {
  margin: 0;
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
}
.ab-footer__note {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
.ab-socials--sm { margin: 0; padding: 0; border: none; }

/* Responsive */
@media (max-width: 860px) {
  .ab-top { grid-template-columns: 1fr; }
  .ab-profile { position: static; }
  .ab-bottom { grid-template-columns: 1fr; }
  .ab-main { padding: 1.5rem 1.25rem; }
}
</style>
