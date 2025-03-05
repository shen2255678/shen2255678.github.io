// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './tailwind.css'

// 引入自定義組件
import NotFound from './NotFound.vue'

// 引入 vue-easy-lightbox
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  ...DefaultTheme,
  // 覆蓋 NotFound 組件
  NotFound,
  enhanceApp({ app }) {
    // 註冊 vue-easy-lightbox
    app.use(VueEasyLightbox)
    
    // 註冊其他組件（如果需要）
  }
}
