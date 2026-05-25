// Single posts data loader for our content (NOT open17's posts/**/*.md path).
// Scans all five Pillars, filters to entries with a `date` (so pillar index
// pages and other static markdown are excluded), normalizes shape.
//
// Consumed by ArchiveLayout, TagsLayout, CategoriesLayout, HomeLayout, PostCard.
// See CONTEXT.md > Post.

import { createContentLoader } from 'vitepress'
import type { PillarSlug } from '../data/pillars'

export interface Post {
  url: string
  title: string
  date: string
  dateTimestamp: number
  tags: string[]
  pillar: PillarSlug
  excerpt: string
  cover: string | null
  pin: boolean
}

declare const data: Post[]
export { data }

function extractPillar(url: string): PillarSlug | null {
  const m = url.match(/^\/(self|system|practice|journal|library)\//)
  return m ? (m[1] as PillarSlug) : null
}

export default createContentLoader(
  ['self/**/*.md', 'system/**/*.md', 'practice/**/*.md', 'journal/**/*.md', 'library/**/*.md'],
  {
    excerpt: false,
    transform(raw): Post[] {
      const posts: Post[] = []
      for (const page of raw) {
        const pillar = extractPillar(page.url)
        if (!pillar) continue
        if (page.url.endsWith('/')) continue // skip pillar index pages
        const fm = page.frontmatter ?? {}
        if (!fm.date) continue // skip non-post pages (resources without dates)
        const tags = Array.isArray(fm.tags) ? fm.tags.map((t: unknown) => String(t)) : []
        const excerpt = String(fm.description ?? fm.desc ?? '')
        const cover = fm.cover ? String(fm.cover) : fm.bgImg ? String(fm.bgImg) : null
        posts.push({
          url: page.url,
          title: String(fm.title ?? page.url),
          date: String(fm.date),
          dateTimestamp: +new Date(String(fm.date)),
          tags,
          pillar,
          excerpt,
          cover,
          pin: Boolean(fm.pin)
        })
      }
      return posts.sort((a, b) => {
        if (a.pin && !b.pin) return -1
        if (!a.pin && b.pin) return 1
        return b.dateTimestamp - a.dateTimestamp
      })
    }
  }
)
