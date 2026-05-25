<template>
  <template v-for="(rule, idx) in matched" :key="idx">
    <component :is="rule.component" v-bind="rule.props" />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { resolveDocTail } from './registry'

const route = useRoute()
const { frontmatter } = useData()

const matched = computed(() => {
  if (frontmatter.value.subscribe === false) return []
  return resolveDocTail(route.path)
})
</script>
