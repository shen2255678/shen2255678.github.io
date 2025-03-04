<template>
  <div class="vp-custom-layout">
    <!-- 使用默認布局 -->
    <DefaultLayout>
      <!-- 您可以在這裡添加自定義內容 -->
      <template #layout-top>
        <!-- 頂部額外內容 -->
      </template>
      
      <template #layout-bottom>
        <!-- 底部額外內容 -->
      </template>
    </DefaultLayout>
  </div>
</template>

<script setup>
import DefaultLayout from 'vitepress/theme/Layout.vue'
</script>

<style>
/* 自定義樣式 */
</style>
