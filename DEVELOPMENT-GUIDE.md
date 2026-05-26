# VitePress 博客開發指南

## 📖 項目概述

這是一個基於 VitePress 和 Vue.js 的個人技術博客，專注於 AI 技術、程式開發和生活分享。

## 🛠 技術棧

- **框架**: VitePress (Vue.js 靜態網站生成器)
- **主題**: vitepress-theme-open17
- **樣式**: Tailwind CSS + 自定義 CSS
- **組件**: Vue.js 組件
- **部署**: GitHub Actions → GitHub Pages
- **評論系統**: Giscus
- **其他**: FontAwesome 圖標、Vue Easy Lightbox、Swiper 輪播

## 🚀 快速開始

### 環境要求

- Node.js 18+ (推薦 20 LTS)
- npm 或 yarn
- Git

### 安裝步驟

```bash
# 1. 克隆項目
git clone https://github.com/shen2255678/vitepress.git
cd vitepress

# 2. 安裝依賴
npm install

# 3. 安裝圖片處理工具
npm install sharp --save-dev

# 4. 啟動開發服務器
npm run docs:dev

# 5. 在瀏覽器中訪問 http://localhost:5173
```

### 基本命令

```bash
# 開發模式
npm run docs:dev

# 構建生產版本
npm run docs:build

# 預覽生產版本
npm run docs:preview
```

## 📁 項目結構

```
vitepress/
├── .github/workflows/     # GitHub Actions 工作流
├── components/           # 自定義 Vue 組件
│   ├── BackToTop.vue    # 回到頂部按鈕
│   ├── BookingForm.vue  # 預訂表單
│   ├── photoWall.vue    # 照片牆組件
│   ├── Swiper.vue       # 輪播組件
│   └── Swiper1.vue      # 另一個輪播組件
├── docs/                # 文檔內容目錄
│   ├── .vitepress/      # VitePress 配置
│   │   ├── config.mts   # 主要配置文件
│   │   └── theme/       # 主題配置
│   ├── about.md         # 關於頁面
│   ├── contact.md       # 聯繫頁面
│   ├── coding/          # 程式開發文章
│   ├── posts/           # 博客文章
│   │   └── ai/         # AI 技術文章
│   ├── image/          # 圖片資源
│   ├── life/           # 生活隨筆
│   ├── travel/         # 旅行見聞
│   └── index.md        # 首頁
├── package.json         # 依賴配置
├── tailwind.config.js   # Tailwind CSS 配置
└── postcss.config.cjs   # PostCSS 配置
```

## ✍️ 內容創建指南

### 創建新的博客文章

1. **選擇合適的目錄**：
   - `/docs/posts/ai/` - AI 技術文章
   - `/docs/coding/` - 程式開發教程
   - `/docs/life/` - 生活隨筆
   - `/docs/travel/` - 旅行見聞

2. **創建 Markdown 文件**：
```bash
# 在對應目錄下創建新文件
touch docs/posts/ai/new-article.md
```

3. **使用 Front Matter 格式**：
```markdown
---
title: 文章標題
date: 2024-01-15
tags:
    - AI
    - Tutorial
    - Vue.js
pin: true  # 是否置頂
desc: 文章簡介
bgImg: "圖片URL"  # 背景圖片（可選）
---

# 文章標題

文章內容...
```

### Markdown 語法擴展

VitePress 支援標準 Markdown 語法加上一些擴展：

```markdown
# 標題

## 代碼高亮
```javascript
const hello = () => {
  console.log('Hello VitePress!')
}
```

## 提示框
::: tip
這是一個提示
:::

::: warning
這是一個警告
:::

::: danger
這是一個危險提示
:::

## Vue 組件
<BackToTop />
<PhotoWall />
```

### 使用自定義 Vue 組件

1. **在 Markdown 中直接使用**：
```markdown
# 我的文章

一些內容...

<BackToTop />
<PhotoWall />

更多內容...
```

2. **在組件中使用**：
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <PhotoWall />
  </div>
</template>

<script setup>
import PhotoWall from '../components/photoWall.vue'

const title = '我的博客'
</script>
```

## 🎨 樣式自定義

### 使用 Tailwind CSS

```vue
<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
      標題
    </h2>
    <p class="text-gray-600 dark:text-gray-300">
      內容
    </p>
  </div>
</template>
```

### 自定義 CSS

```vue
<template>
  <div class="custom-component">
    <!-- 內容 -->
  </div>
</template>

<style scoped>
.custom-component {
  /* 自定義樣式 */
}
</style>
```

## 🖼️ 圖片管理

### 唯一存放位置：`docs/public/images/`

所有圖片**只走** `docs/public/images/{主題}/{子分類}/...`。沒有第二個目錄。Vite import 跟 public/ 不能混用，所以連元件用的圖也都從這裡走絕對 URL。

目前的主題分類：
- `images/trips/{country}/` — 旅行照片（已有 spain / japan / switzerland）
- 未來新增類別時依「能讓人一眼看懂在哪」原則命名（例如 `images/talks/`、`images/avatar/`、`images/portraits/`）。

### 引用語法（都是絕對路徑）

- Markdown 文章內：
  ```markdown
  ![描述](/images/trips/spain/granada-alhambra-1.jpg)
  ```
- Frontmatter `cover`（會出現在卡片與 OG 圖）：
  ```yaml
  cover: /images/trips/japan/college.jpg
  ```
- Vue 元件內：直接用字串路徑，不要 `import`（避免 public 與 import 分裂）。

### 命名規範

- 只允許 lowercase、數字、連字號（hyphen）。**禁底線、空白、中文、大寫**。
- 格式：`{地點|主題}-{描述}-{序號}.jpg`
  - ✅ `granada-alhambra-1.jpg`、`sevilla-cathedral-1.jpg`
  - ❌ `swiss_train1.jpg`（底線）、`cableCar.jpg`（駝峰）、`river.jpg`（無前綴會撞名）
- 既有違反規範的舊圖暫時保留，下次寫到該文章時順手改名 + 改引用。

### 圖片優化

- 上 git 的版本目標 ≤ 500KB。原圖另存本機 source 資料夾，不進 repo。
- 用 [squoosh.app](https://squoosh.app/) 手動壓，或等 Cloudflare Pages 上線後開 Polish 自動轉 WebP。
- 加 alt 文字（`![alt](url)` 的 alt 部分）。
- VitePress 已自動為 `<img>` 加 `loading="lazy"`，不用手動寫。

## 🔧 自定義組件開發

### 創建新組件

1. **在 `/components/` 目錄下創建 Vue 文件**：

```vue
<!-- components/MyComponent.vue -->
<template>
  <div class="my-component">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
interface Props {
  title: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '默認描述'
})
</script>

<style scoped>
.my-component {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}
</style>
```

2. **在 Markdown 中使用**：
```markdown
<script setup>
import MyComponent from '../components/MyComponent.vue'
</script>

# 我的文章

<MyComponent title="測試標題" description="測試描述" />
```

## 📱 響應式設計

使用 Tailwind CSS 響應式類：

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="bg-white p-4 rounded-lg shadow">
      <!-- 內容 -->
    </div>
  </div>
</template>
```

## 🚀 部署指南

### 自動部署 (推薦)

項目已配置 GitHub Actions 自動部署：

1. 推送代碼到 `main` 分支
2. GitHub Actions 自動構建
3. 部署到 GitHub Pages

### 手動部署

```bash
# 構建項目
npm run docs:build

# 上傳 docs/.vitepress/dist 目錄到服務器
```

## 🔧 配置說明

### 主要配置文件

**`docs/.vitepress/config.mts`** - VitePress 主配置：
- 網站基本信息
- 導航菜單
- 側邊欄
- SEO 設置
- 第三方服務整合

### 需要配置的服務

1. **Giscus 評論系統**：
   - 獲取 `repoId` 和 `categoryId`
   - 在配置文件中替換佔位符

2. **Google Analytics**：
   - 獲取 GA 追蹤 ID
   - 更新配置文件

3. **搜索功能** (可選)：
   - 配置 Algolia 搜索
   - 或使用 VitePress 內建搜索

## 🛠️ 開發最佳實踐

### 代碼規範

1. **Vue 組件**：
   - 使用 `<script setup>` 語法
   - 添加 TypeScript 類型定義
   - 使用 `scoped` 樣式

2. **Markdown 文件**：
   - 使用有意義的文件名
   - 添加完整的 Front Matter
   - 保持一致的目錄結構

### 性能優化

1. **圖片優化**：
   - 壓縮圖片大小
   - 使用適當的格式
   - 添加 `loading="lazy"`

2. **組件優化**：
   - 避免不必要的重新渲染
   - 使用 `v-show` vs `v-if` 適當選擇
   - 懒加載重型組件

## 🐛 常見問題

### 開發問題

1. **組件不顯示**：
   - 檢查文件路徑是否正確
   - 確認組件是否正確導入

2. **樣式不生效**：
   - 檢查 CSS 類名是否正確
   - 確認 Tailwind CSS 配置

3. **圖片無法顯示**：
   - 檢查圖片路徑
   - 確認圖片文件存在

### 部署問題

1. **GitHub Pages 404**：
   - 檢查 `base` 配置
   - 確認分支設置正確

2. **構建失敗**：
   - 檢查依賴是否完整安裝
   - 查看錯誤日誌

## 📚 學習資源

- [VitePress 官方文檔](https://vitepress.dev/)
- [Vue.js 文檔](https://vuejs.org/)
- [Tailwind CSS 文檔](https://tailwindcss.com/)
- [Markdown 語法指南](https://markdown.org/)

## 🤝 貢獻指南

1. Fork 項目
2. 創建功能分支
3. 提交更改
4. 創建 Pull Request

---

**最後更新**: 2024-01-15
**維護者**: Haowei Lu
**許可證**: MIT