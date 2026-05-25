import Theme from 'vitepress-theme-open17'
import BackToTop from './components/BackToTop.vue'
import PhotoWall from './components/photoWall.vue'

export default {
  extends: Theme,
  enhanceApp({ app }) {
    app.component('BackToTop', BackToTop)
    app.component('PhotoWall', PhotoWall)
    app.component('ImageSlider', PhotoWall)
  }
}
