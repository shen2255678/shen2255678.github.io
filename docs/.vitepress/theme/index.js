// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './tailwind.css'

export default {
  // extend the default theme
  extends: DefaultTheme,
  
  // override components
  enhanceApp({ app }) {
    // register global components if needed
  }
}
