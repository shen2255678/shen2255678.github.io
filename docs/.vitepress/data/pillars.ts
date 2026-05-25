// Single source of truth for the five content Pillars. See CONTEXT.md > Pillar.
// Consumed by config.mts (nav/sidebar), DocTail registry, and HomeLayout.

export type PillarSlug = 'self' | 'system' | 'practice' | 'library' | 'journal'

export interface Pillar {
  slug: PillarSlug
  navLabel: string
  title: string
  description: string
  icon: string
  /** Inject NewsletterInlineForm at the end of every article under this Pillar. */
  injectNewsletter: boolean
}

export const pillars: Pillar[] = [
  {
    slug: 'self',
    navLabel: '自我',
    title: '自我認識',
    description: '表層普世語言、深層揭露框架——一個工程師如何用系統思維認識自己。',
    icon: '🪞',
    injectNewsletter: true
  },
  {
    slug: 'system',
    navLabel: '系統',
    title: '系統建構',
    description: 'AI × 第二大腦 × 個人作業系統的具體做法。Notion、Claude、Prompt 工程。',
    icon: '🧠',
    injectNewsletter: true
  },
  {
    slug: 'practice',
    navLabel: '實踐',
    title: '真實實踐',
    description: '系統指引我做出的真實決定。旅行、選擇、生活方式背後的揭露。',
    icon: '🧭',
    injectNewsletter: true
  },
  {
    slug: 'library',
    navLabel: '資源',
    title: '資源庫',
    description: '模板、Prompt、工具棧——把方法論轉成可立即使用的資產。',
    icon: '📚',
    injectNewsletter: false
  },
  {
    slug: 'journal',
    navLabel: '隨筆',
    title: '隨筆雜記',
    description: '日常觀察、靈感片段、不夠成熟但想記下來的想法。',
    icon: '📓',
    injectNewsletter: false
  }
]

export const pillarsBySlug = Object.fromEntries(
  pillars.map((p) => [p.slug, p])
) as Record<PillarSlug, Pillar>
