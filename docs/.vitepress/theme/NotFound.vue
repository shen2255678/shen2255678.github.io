<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="not-found-icon">404</div>
      <h1>頁面未找到</h1>
      <p>很抱歉，您訪問的頁面不存在或已被移動。</p>
      
      <div class="suggestions">
        <h2>您可以嘗試：</h2>
        <ul>
          <li><a href="/">返回首頁</a></li>
          <li><a href="/posts/ai/">查看AI文章</a></li>
          <li><a href="/coding/">瀏覽程式開發教程</a></li>
          <li><a href="/about">了解關於我</a></li>
        </ul>
      </div>
      
      <div class="search-suggestion">
        <p>或者使用站內搜索查找您需要的內容：</p>
        <div class="search-box">
          <input type="text" placeholder="搜索..." v-model="searchQuery" @keyup.enter="performSearch" />
          <button @click="performSearch">搜索</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
const searchQuery = ref('')

const performSearch = () => {
  if (searchQuery.value.trim()) {
    // For a real search implementation, link this to your site's search functionality
    // For now, redirect to home page
    router.go('/')
  }
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 20px;
}

.not-found-content {
  max-width: 600px;
  text-align: center;
}

.not-found-icon {
  font-size: 10rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  opacity: 0.5;
  margin-bottom: 20px;
  line-height: 1;
}

.not-found-content h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.not-found-content p {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin-bottom: 40px;
}

.suggestions {
  margin: 40px 0;
  background-color: var(--vp-c-bg-soft);
  padding: 20px;
  border-radius: 8px;
  text-align: left;
}

.suggestions h2 {
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.suggestions ul {
  padding-left: 20px;
}

.suggestions li {
  margin-bottom: 10px;
}

.suggestions a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.suggestions a:hover {
  text-decoration: underline;
}

.search-suggestion {
  margin-top: 40px;
}

.search-box {
  display: flex;
  max-width: 400px;
  margin: 20px auto;
}

.search-box input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.search-box button {
  padding: 10px 20px;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 1rem;
}
</style>
