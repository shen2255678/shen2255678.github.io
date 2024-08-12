---
title: Docs with VitePress
editLink: true
layout: doc

---

# {{ $frontmatter.title }}

### Title  <Badge type="tip" text="^1.9.0" />
Guide content

<script setup>
import { ref } from 'vue'
import CustomComponent from '../../components/BookingForm.vue'
const count = ref(0)
</script>

## Markdown Content

The count is: {{ count }}

<CustomComponent />
<button :class="$style.button" @click="count++">Increment</button>

# Configuring TailwindCSS to work with Vitepress

<div class="flex flex-col items-center mt-8 sm:flex-row">
  <img src="../image/cableCar.jpg" alt="Vite package logo" width="200" height="200" style="float: left; margin-right: 12px;" />
  <p class="italic text-gray-500">
    I've found myself feeling limited by the styles provided by the framework so I looked into what it takes to use a stylesheet.
  </p>
</div>

A bit of searching around ended up pointing me towards [this Github issue](https://github.com/vuejs/vitepress/issues/62) which helps a user integrate [Tailwindcss](https://tailwindcss.com/), a framework I've been using professionally and in personal projects for awhile now.

According to the responses within the issue, there are two ways of bringing in TailwindCSS:

**1. Import TailwindCSS through their CDN:**
<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>