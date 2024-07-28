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

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>