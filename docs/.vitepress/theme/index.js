import { h } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// Extending open17 (rather than DefaultTheme) keeps their style.css side-effect
// and registers <blog />, <archive />, <tags /> via their enhanceApp.
// We override `Layout` to bypass their MyLayout — MyLayout swallows `#doc-after`
// for its own Giscus integration and doesn't forward slots, which blocks DocTail.
// See CONTEXT.md > DocTail.
import Theme from 'vitepress-theme-open17'

import BackToTop from './components/BackToTop.vue'
import PhotoWall from './components/photoWall.vue'
import NewsletterInlineForm from './components/NewsletterInlineForm.vue'
import Comments from './components/Comments.vue'
import PillarCard from './components/PillarCard.vue'
import FeaturedPosts from './components/FeaturedPosts.vue'

import HomeLayout from './layouts/HomeLayout.vue'
import SubscribeLayout from './layouts/SubscribeLayout.vue'
import ArchiveLayout from './layouts/ArchiveLayout.vue'
import TagsLayout from './layouts/TagsLayout.vue'
import CategoriesLayout from './layouts/CategoriesLayout.vue'

import DocTail from './doctail/DocTail.vue'
import { registerDocTail } from './doctail/registry'
import { pillars } from '../data/pillars'

const customLayouts = {
  home: HomeLayout,
  subscribe: SubscribeLayout,
  archive: ArchiveLayout,
  tags: TagsLayout,
  categories: CategoriesLayout
}

export default {
  extends: Theme,
  Layout: () => {
    const { frontmatter } = useData()
    const customSlot = () => {
      const Comp = customLayouts[frontmatter.value.customLayout]
      return Comp ? h(Comp) : null
    }

    return h(DefaultTheme.Layout, null, {
      'page-top': customSlot,
      'doc-after': () => h(DocTail)
    })
  },
  enhanceApp({ app }) {
    for (const pillar of pillars) {
      if (pillar.injectNewsletter) {
        registerDocTail({
          prefix: `/${pillar.slug}/`,
          component: NewsletterInlineForm,
          props: { variant: 'inline', source: `${pillar.slug}-pillar` }
        })
      }
      // Comments on every Pillar (escapable per-page via frontmatter `comments: false`).
      registerDocTail({
        prefix: `/${pillar.slug}/`,
        component: Comments
      })
    }

    app.component('BackToTop', BackToTop)
    app.component('PhotoWall', PhotoWall)
    app.component('ImageSlider', PhotoWall)
    app.component('NewsletterInlineForm', NewsletterInlineForm)
    app.component('PillarCard', PillarCard)
    app.component('FeaturedPosts', FeaturedPosts)
  }
}
