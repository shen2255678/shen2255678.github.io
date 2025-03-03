import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Haowei's Tech Blog",
  description: "程式開發、AI技術與生活分享的個人博客",
  lastUpdated: true,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'vitepress, blog, tech, AI, programming, 程式開發, 人工智能, MCP, 架構' }],
    ['meta', { name: 'author', content: 'Haowei Lu' }],
    ['meta', { property: 'og:title', content: "Haowei's Tech Blog" }],
    ['meta', { property: 'og:description', content: '程式開發、AI技術與生活分享的個人博客' }],
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
      { text: '程式開發', link: '/coding/' },
      { text: 'AI技術', link: '/posts/ai/' },
      { text: '生活', link: '/life/' },
      { text: '旅行', link: '/travel/' },
      { 
        text: '關於', 
        items: [
          { text: '個人介紹', link: '/about' },
          { text: '技術棧', link: '/tech-stack' },
          { text: '聯繫我', link: '/contact' }
        ]
      },
    ],
    
    logo: {
      light: 'https://i.pinimg.com/736x/5b/f6/a9/5bf6a9efe2bac9f12b42fa41fa78a979.jpg',
      dark: 'https://i.pinimg.com/736x/5b/f6/a9/5bf6a9efe2bac9f12b42fa41fa78a979.jpg',
      alt: "Haowei's Blog"
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shen2255678' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/haowei-lu/' },
      { icon: 'twitter', link: 'https://twitter.com/haoweitech' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Haowei Lu',
      links: [
        { text: '隱私政策', link: '/privacy-policy' },
        { text: '使用條款', link: '/terms-of-service' },
        { text: 'RSS', link: '/feed.xml' }
      ]
    },
    
    editLink: {
      pattern: 'https://github.com/shen2255678/shen2255678.github.io/edit/main/docs/:path',
      text: '在GitHub上編輯此頁面'
    },
    
    // 添加分析工具
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'YOUR_INDEX_NAME'
    },
    
    // 深色模式切換
    appearance: true,
    
    // 最後更新時間
    lastUpdated: {
      text: '上次更新'
    },
    
    // 外部鏈接設置
    externalLinkIcon: true,
    
    // 側邊欄設置
    sidebar: {
      '/posts/ai/': [
        {
          text: 'AI技術文章',
          items: [
            { text: 'MCP架構：現代AI開發的新範式', link: '/posts/ai/mcp-introduction' },
            { text: '企業級AI應用：從理論到實踐', link: '/posts/ai/enterprise-ai' }
          ]
        }
      ],
      '/coding/': [
        {
          text: '程式開發',
          items: [
            { text: 'VitePress教程', link: '/coding/first-coding-post' },
            { text: '進階教程', link: '/coding/vitepress-tutorial' }
          ]
        }
      ]
    }
  }
})