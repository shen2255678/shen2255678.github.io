import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Haowei's Tech Blog",
  description: "程式開發、AI技術與生活分享的個人博客",
  
  // Base public path for GitHub Pages
  base: '/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],

  themeConfig: {
    logo: '',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: '程式開發', link: '/coding/' },
      { text: 'AI技術', link: '/posts/ai/' },
      { text: '生活', link: '/life/' },
      { text: '旅行', link: '/travel/' },
      { text: '關於', link: '/about' },
    ],
    
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
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shen2255678' },
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Haowei Lu'
    }
  }
})