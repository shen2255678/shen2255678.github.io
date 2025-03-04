// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './tailwind.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 註冊組件（如果需要）
  }
}
