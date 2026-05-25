// SeoHead — pure function that turns VitePress PageData into per-page <head> tags.
// Called from config.mts transformHead. See CONTEXT.md > SeoHead, GEO.

import type { HeadConfig, PageData } from 'vitepress'
import {
  AUTHOR_SOCIALS,
  SITE_AUTHOR,
  SITE_DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL
} from './site'
import { pillars, pillarsBySlug } from './pillars'
import type { PillarSlug } from './pillars'

const POST_PILLAR_RE = /^(self|system|practice|journal|library)\/(.+)$/

interface PostFrontmatter {
  title?: string
  description?: string
  desc?: string
  date?: string
  tags?: string[]
  cover?: string
  bgImg?: string
}

function joinUrl(path: string): string {
  const clean = path.replace(/^\/+/, '')
  return `${SITE_URL}/${clean}`
}

function pageUrl(relativePath: string): string {
  // relativePath comes in as "self/why-i-am-me.md" or "index.md"
  const stripped = relativePath.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
  return joinUrl(stripped)
}

function pageCanonical(relativePath: string): string {
  // Use .html extension since site builds with cleanUrls: false
  const stripped = relativePath.replace(/\.md$/, '')
  if (stripped === 'index') return joinUrl('')
  if (stripped.endsWith('/index')) return joinUrl(stripped.replace(/\/index$/, '/'))
  return joinUrl(`${stripped}.html`)
}

function resolveImage(fm: PostFrontmatter): string {
  const c = fm.cover ?? fm.bgImg
  if (!c) return SITE_DEFAULT_OG_IMAGE
  if (/^https?:\/\//i.test(c)) return c
  return joinUrl(c)
}

function isPost(relativePath: string): { slug: PillarSlug; rest: string } | null {
  const m = relativePath.replace(/\.md$/, '').match(POST_PILLAR_RE)
  if (!m) return null
  const slug = m[1] as PillarSlug
  if (m[2] === 'index') return null
  return { slug, rest: m[2] }
}

function isPillarLanding(relativePath: string): PillarSlug | null {
  const m = relativePath.replace(/\.md$/, '').match(/^(self|system|practice|journal|library)(\/index)?$/)
  if (!m) return null
  return m[1] as PillarSlug
}

function authorPersonNode() {
  return {
    '@type': 'Person',
    name: SITE_AUTHOR,
    url: joinUrl('about.html'),
    sameAs: AUTHOR_SOCIALS
  }
}

function organizationNode() {
  return {
    '@type': 'Person',
    name: SITE_AUTHOR,
    url: SITE_URL
  }
}

function ldScript(json: unknown): HeadConfig {
  return ['script', { type: 'application/ld+json' }, JSON.stringify(json)]
}

function articleSchema(fm: PostFrontmatter, url: string, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fm.title ?? '',
    description: fm.description ?? fm.desc ?? '',
    image,
    datePublished: fm.date,
    dateModified: fm.date,
    author: authorPersonNode(),
    publisher: organizationNode(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: Array.isArray(fm.tags) ? fm.tags.join(', ') : undefined,
    inLanguage: 'zh-TW'
  }
}

function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_AUTHOR,
    url: joinUrl('about.html'),
    sameAs: AUTHOR_SOCIALS,
    jobTitle: '軟體工程師 / 寫作者',
    description: SITE_DESCRIPTION,
    knowsAbout: ['AI', '第二大腦', 'INTJ', '自我認識', '系統思考', '印度占星']
  }
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'zh-TW',
    author: authorPersonNode(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url
    }))
  }
}

export function buildHead(pageData: PageData): HeadConfig[] {
  const relativePath = pageData.relativePath
  const fm = (pageData.frontmatter ?? {}) as PostFrontmatter
  const canonical = pageCanonical(relativePath)
  const url = pageUrl(relativePath)
  const title = fm.title ?? pageData.title ?? SITE_NAME
  const description = fm.description ?? fm.desc ?? SITE_DESCRIPTION
  const image = resolveImage(fm)

  const head: HeadConfig[] = [
    ['link', { rel: 'canonical', href: canonical }],
    ['meta', { property: 'og:url', content: canonical }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:locale', content: SITE_LOCALE }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: image }]
  ]

  const post = isPost(relativePath)
  if (post && fm.date) {
    head.push(['meta', { property: 'og:type', content: 'article' }])
    head.push(['meta', { property: 'article:published_time', content: String(fm.date) }])
    head.push(['meta', { property: 'article:author', content: SITE_AUTHOR }])
    if (Array.isArray(fm.tags)) {
      for (const tag of fm.tags) {
        head.push(['meta', { property: 'article:tag', content: String(tag) }])
      }
    }
    head.push(ldScript(articleSchema(fm, canonical, image)))
    // Breadcrumb: Home > Pillar > Post title
    const pillar = pillarsBySlug[post.slug]
    head.push(
      ldScript(
        breadcrumbSchema([
          { name: '首頁', url: SITE_URL },
          { name: pillar?.title ?? post.slug, url: joinUrl(`${post.slug}/`) },
          { name: title, url: canonical }
        ])
      )
    )
    return head
  }

  if (relativePath === 'index.md') {
    head.push(ldScript(websiteSchema()))
    return head
  }

  if (relativePath === 'about.md') {
    head.push(ldScript(personSchema()))
    return head
  }

  const pillarSlug = isPillarLanding(relativePath)
  if (pillarSlug) {
    const p = pillarsBySlug[pillarSlug]
    head.push(
      ldScript(
        breadcrumbSchema([
          { name: '首頁', url: SITE_URL },
          { name: p?.title ?? pillarSlug, url: canonical }
        ])
      )
    )
    return head
  }

  // Index pages (categories/tags/archive) get a breadcrumb too.
  const indexLabels: Record<string, string> = {
    'categories.md': '分類',
    'tags.md': '標籤',
    'archive.md': '歸檔',
    'subscribe.md': '訂閱',
    'contact.md': '聯繫'
  }
  if (relativePath in indexLabels) {
    head.push(
      ldScript(
        breadcrumbSchema([
          { name: '首頁', url: SITE_URL },
          { name: indexLabels[relativePath], url: canonical }
        ])
      )
    )
  }

  // pillars is intentionally re-exported above to keep config.mts imports tidy;
  // not all branches use it but the import surface is shared with seo-head consumers.
  void pillars
  return head
}
