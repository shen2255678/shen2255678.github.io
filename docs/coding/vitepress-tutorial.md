# VitePress Tutorial
## 安裝
::: code-group

```shell[npm] 
$ npm add -D vitepress
```

```shell [pnpm]
$ pnpm add -D vitepress
```

```shell [yarn]
$ yarn add -D vitepress
```

:::

建立基本框架
::: code-group

```shell[npm] 
$ npx vitepress init
```

```shell [pnpm]
$ pnpm vitepress init
```

```shell [yarn]
$ yarn vitepress init
```

:::
會問幾個問題如下:
```
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◆  Theme:
│  ● Default Theme (Out of the box, good-looking docs)
│  ○ Default Theme + Customization
│  ○ Custom Theme
└
```
## 基礎專案架構
預設的架構如下
```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```
可根據用途新增資料夾；在根節點下新增component資料夾放置vue元件，如下
- `docs`資料夾:`VitePress`專案的根目錄
    + `.vitepress`:專案的配置文件、快取、dist跟theme等
        - `config.mts`:專案配置文件
    + `index.md`:首頁文件
    + `**.md`:其他頁面
    + `index.md`:首頁文件
    + `image`:圖片放置區
    + `.gitignore`:忽略不要上傳git的設定
    + `.node_modules`:library的放置區
- `components`資料夾:放置vue的元件
- `.github`資料夾:deploy.yml為設定github自動部屬的檔案
    + `.workflows`
        - `deploy.yml`:請參考`部屬至GitHub區塊`的yml範例

    


```
.
├─ .github
│  ├─ workflows
│     └─ deploy.yml
├─ components
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  ├─ index.md
│  └─ image
├─  package.json
└─  .gitignore
```
.gitignore設定
```.gitignore
# Node modules
node_modules/

# Build output
docs/.vitepress/dist/

# Cache
docs/.vitepress/cache/

```

## 啟動並運行
::: code-group

```shell[npm] 
$ npm run docs:dev
```

```shell [pnpm]
$ pnpm run docs:dev
```

```shell [yarn]
$ yarn docs:dev
```

:::

## 專案建立與測試

1.建立專案，執行完.vitepress下會新增dist跟cache的檔案

```shell[npm] 
$ npm run docs:build
```
2.建立專案後，預覽
```shell[npm] 
$ npm run docs:preview
```

## 部屬至GitHub

1.設定自動部屬:根目錄下建立`.github/workflows`資料夾，再創建名為`deploy.yml`的檔案，如下
```yaml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消注释
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```
2.上傳至github repo 命名方式為`[你要的名稱].github.io`

3.點擊所上傳的專案->點擊Setting按鈕->點擊Pages按鈕->確認Source為`GitHub Actions`

## 安裝Tailwind.css
1. Install Tailwind CSS
```shell[npm] 
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init
```
2. Add Tailwind to your PostCSS configuration
```js
// 建立檔案 postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}  
```
3. Configure your template paths
```js
// 建立檔案 tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.js",
    "./docs/**/*.vue",
    "./docs/**/*.ts",
    "./docs/**/*.md",
  ],
  options: {
    safelist: ["html", "body"],
  },
};
```
4. Add the Tailwind directives to your CSS
```css
//建立檔案 tailwind.css，放在docs資料夾底下建立的theme資料夾
@tailwind base;
@tailwind components;
@tailwind utilities;
```
5. export theme
```js
// 建立檔案 index.js
import DefaultTheme from 'vitepress/theme';
import "./tailwind.css";
export default {
  ...DefaultTheme,
 
  // 如果你有其他配置或增強，可以在這裡添加
}

```
## 部屬至GitHub1
VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).

<style>

</style>