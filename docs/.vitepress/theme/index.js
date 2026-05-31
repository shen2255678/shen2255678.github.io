import { h } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// Extending open17 (rather than DefaultTheme) keeps their style.css side-effect
// and registers <blog />, <archive />, <tags /> via their enhanceApp.
// We override `Layout` to bypass their MyLayout — MyLayout swallows `#doc-after`
// for its own Giscus integration and doesn't forward slots, which blocks DocTail.
// See CONTEXT.md > DocTail.
import Theme from 'vitepress-theme-open17'

// 秩序 (Order) design system — tokens FIRST, then chrome/prose overrides.
import './styles/order-tokens.css'
import './styles/order-overrides.css'

import BackToTop from './components/BackToTop.vue'
import PhotoWall from './components/photoWall.vue'
import NewsletterInlineForm from './components/NewsletterInlineForm.vue'
import Comments from './components/Comments.vue'
import PillarCard from './components/PillarCard.vue'
import FeaturedPosts from './components/FeaturedPosts.vue'
import RelatedPosts from './components/RelatedPosts.vue'
import DocImageZoom from './components/DocImageZoom.vue'

// 秩序 components
import PostCard from './components/PostCard.vue'
import ProjectCard from './components/ProjectCard.vue'
import PillarIndex from './components/PillarIndex.vue'
import BeehiivSubscribeForm from './components/BeehiivSubscribeForm.vue'
import BookmarkButton from './components/BookmarkButton.vue'
import NavBookmarkLink from './components/NavBookmarkLink.vue'

import HomeLayout from './layouts/HomeLayout.vue'
import SubscribeLayout from './layouts/SubscribeLayout.vue'
import AboutLayout from './layouts/AboutLayout.vue'
import ArchiveLayout from './layouts/ArchiveLayout.vue'
import TagsLayout from './layouts/TagsLayout.vue'
import CategoriesLayout from './layouts/CategoriesLayout.vue'
import SavedLayout from './layouts/SavedLayout.vue'

import DocTail from './doctail/DocTail.vue'
import { registerDocTail } from './doctail/registry'
import { pillars } from '../data/pillars'

const customLayouts = {
  home: HomeLayout,
  subscribe: SubscribeLayout,
  about: AboutLayout,
  archive: ArchiveLayout,
  tags: TagsLayout,
  categories: CategoriesLayout,
  saved: SavedLayout
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
      'doc-after': () => h(DocTail),
      'nav-bar-content-after': () => h(NavBookmarkLink),
      'layout-bottom': () => h(DocImageZoom)
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
      registerDocTail({
        prefix: `/${pillar.slug}/`,
        component: RelatedPosts
      })
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

    // 秩序 components (also usable directly in markdown)
    app.component('PostCard', PostCard)
    app.component('ProjectCard', ProjectCard)
    app.component('PillarIndex', PillarIndex)
    app.component('BeehiivSubscribeForm', BeehiivSubscribeForm)
    app.component('BookmarkButton', BookmarkButton)
  }
}
