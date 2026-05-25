import Theme from 'vitepress-theme-open17'
import BackToTop from './components/BackToTop.vue'
import BookingForm from './components/BookingForm.vue'
import PhotoWall from './components/photoWall.vue'
import Swiper from './components/Swiper.vue'
import Swiper1 from './components/Swiper1.vue'

export default {
  extends: Theme,
  enhanceApp({ app }) {
    app.component('BackToTop', BackToTop)
    app.component('BookingForm', BookingForm)
    app.component('PhotoWall', PhotoWall)
    app.component('ImageSlider', PhotoWall)
    app.component('Swiper', Swiper)
    app.component('Swiper1', Swiper1)
  }
}
