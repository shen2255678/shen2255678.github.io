// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './tailwind.css'

// Try to import the custom theme components if available
let CustomTheme = {}
try {
  CustomTheme = require('vitepress-theme-open17/theme')
} catch (e) {
  console.warn('Could not load vitepress-theme-open17/theme - using default theme')
  CustomTheme = DefaultTheme
}

// Import custom components
import NotFound from './NotFound.vue'

export default {
  ...CustomTheme,
  NotFound, // Override the NotFound component
  enhanceApp({ app }) {
    // Register additional components if needed
    if (CustomTheme.enhanceApp) {
      CustomTheme.enhanceApp({ app })
    }
  }
}
