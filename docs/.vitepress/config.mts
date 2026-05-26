import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-open17/config'
import { SITE_URL } from './data/site'
import { buildHead } from './data/seo-head'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: baseConfig,
  lang: 'zh-TW',
  title: "用 AI 認識你自己 | Haowei",
  description: "教你用 AI 打造一個比你更懂你的第二大腦／個人作業系統，然後讓這個系統指引你過上真正屬於你的生活。",
  lastUpdated: true,

  // 排除非公開內容（agent 配置、ADR 等）
  srcExclude: ['agents/**', 'adr/**'],

  // 自動生成 sitemap.xml 到 dist 根目錄
  sitemap: { hostname: SITE_URL },

  // Per-page <head> 注入：canonical、Open Graph、JSON-LD structured data。
  // 見 docs/.vitepress/data/seo-head.ts 跟 CONTEXT.md > SeoHead。
  transformHead: ({ pageData }) => buildHead(pageData),

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'AI, 第二大腦, second brain, 自我認識, 個人作業系統, 系統思考, Notion, Claude, INTJ, 印度占星' }],
    ['meta', { name: 'author', content: 'Haowei Lu' }],
    ['meta', { property: 'og:title', content: "用 AI 認識你自己" }],
    ['meta', { property: 'og:description', content: '一個工程師如何用 AI + 第二大腦 + 深度自我認識，重新設計自己的生活作業系統。' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://shen2255678.github.io' }],
    ['meta', { property: 'og:image', content: 'https://i.pinimg.com/736x/5b/f6/a9/5bf6a9efe2bac9f12b42fa41fa78a979.jpg' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@haoweitech' }],
    ['meta', { name: 'twitter:creator', content: '@haoweitech' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首頁', link: '/' },
      { text: '自我', link: '/self/' },
      { text: '系統', link: '/system/' },
      { text: '實踐', link: '/practice/' },
      { text: '資源', link: '/library/' },
      { text: '隨筆', link: '/journal/' },
      {
        text: '索引',
        items: [
          { text: '分類', link: '/categories' },
          { text: '標籤', link: '/tags' },
          { text: '歸檔', link: '/archive' }
        ]
      },
      {
        text: '關於',
        items: [
          { text: '我是誰', link: '/about' },
          { text: '訂閱電子報', link: '/subscribe' },
          { text: '聯繫我', link: '/contact' }
        ]
      },
    ],

    blog: {
      ornateStyle: true,
      title: "Haowei",
      desc: "用 AI 打造一個比你更懂你的系統",
      avatar: "https://i.pinimg.com/736x/5b/f6/a9/5bf6a9efe2bac9f12b42fa41fa78a979.jpg",
      search: true,
      pageSize: 10,
      features: [
        {
          title: "自我認識",
          details: "表層普世語言、深層揭露框架——一個工程師如何用系統思維認識自己。",
          icon: "🪞",
          link: "/self/"
        },
        {
          title: "系統建構",
          details: "AI × 第二大腦 × 個人作業系統的具體做法。Notion、Claude、Prompt 工程。",
          icon: "🧠",
          link: "/system/"
        },
        {
          title: "真實實踐",
          details: "系統指引我做出的真實決定。旅行、選擇、生活方式背後的揭露。",
          icon: "🧭",
          link: "/practice/"
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shen2255678' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/haowei-lu/' },
      { icon: 'twitter', link: 'https://twitter.com/haoweitech' }
    ],

    // Giscus — 啟用：https://giscus.app/zh-TW 設定後填入 repoId / categoryId。
    comments: {
      provider: 'giscus',
      repo: 'shen2255678/shen2255678.github.io',
      repoId: 'R_kgDOMcHZjA',
      category: 'Announcements',
      categoryId: 'DIC_kwDOMcHZjM4Chvjy'
    },

    footer: {
      message: '本站文字採用 CC BY-NC-SA 4.0 授權。',
      copyright: 'Copyright © 2024-present Haowei Lu',
      links: [
        { text: '隱私政策', link: '/privacy-policy' },
        { text: '使用條款', link: '/terms-of-service' },
        { text: '訂閱電子報', link: '/subscribe' },
        { text: 'RSS', link: '/feed.xml' }
      ]
    },

    editLink: {
      pattern: 'https://github.com/shen2255678/shen2255678.github.io/edit/main/docs/:path',
      text: '在 GitHub 上編輯此頁'
    },

    // 深色模式切換
    appearance: true,

    // 最後更新時間
    lastUpdated: {
      text: '上次更新'
    },

    // 外部鏈接設置
    externalLinkIcon: true,

    // 返回頂部按鈕
    returnToTopButton: true,

    // 側邊欄設置 — 對應新 IA 五大內容支柱
    sidebar: {
      '/self/': [
        {
          text: '自我認識',
          items: [
            { text: '為什麼我是我', link: '/self/why-i-am-me' },
            { text: '高敏感系統的底層解碼', link: '/self/highly-sensitive-system' }
          ]
        }
      ],
      '/system/': [
        {
          text: '系統建構',
          items: [
            { text: 'MCP 架構：現代 AI 開發的新範式', link: '/system/mcp-introduction' },
            { text: '企業級 AI 應用：從理論到實踐', link: '/system/enterprise-ai' }
          ]
        }
      ],
      '/practice/': [
        {
          text: '真實實踐',
          items: [
            { text: '實踐總覽', link: '/practice/' },
            { text: '睽違八年，重訪京阪神', link: '/practice/japan-revisit' },
            { text: '香港不值得去，但…', link: '/practice/hongkong' },
            { text: '格拉納達的遺憾', link: '/practice/spain-granada' },
            { text: '安達魯西亞深度與生存指南', link: '/practice/spain-andalusia' },
            { text: '西班牙 10 日深度之旅', link: '/practice/spain-10days' }
          ]
        }
      ],
      '/library/': [
        {
          text: '資源庫',
          items: [
            { text: '我的工具棧', link: '/library/tech-stack' },
            { text: '《之前的我們》觀後', link: '/library/past-lives' },
            { text: '《徬徨少年時》讀後', link: '/library/demian' }
          ]
        }
      ],
      '/journal/': [
        {
          text: '隨筆雜記',
          items: []
        }
      ]
    }
  }
})
