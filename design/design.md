# design.md — 秩序 (Order)

「用 AI 認識你自己 / Haowei」個人網站的設計系統。單一實作來源:`assets/theme.css`。
本檔說明設計決策與使用慣例,給未來的自己(與 AI)當依據。

---

## 1. 設計原則

1. **極致留白與呼吸感** — 用 margin / padding 定義層次,不靠裝飾線、卡框、陰影。分界以髮絲線(1px divider)或純空間表達。
2. **無圖標(No Icons)** — 介面不用 icon / emoji,純粹靠字重、字級對比與對齊引導視線。**唯一例外:社群品牌標**(GitHub / X / LinkedIn)用單色 SVG,跟隨文字色。
3. **繁中排版優先** — 標題、引言用明體(襯線);內文、介面用黑體(無襯線);meta(日期、編號、英文標)用等寬。
4. **內斂、都會、高級感** — 黑白灰骨架 + 低飽和中性點綴(米沙 / 灰藍)。拒絕高亮原色,拒絕漸層。

---

## 2. 字體

| 用途 | 字體 | 變數 |
|---|---|---|
| 標題 / 引言 / 品牌 | Noto Serif TC(思源宋體),fallback Songti TC | `--serif` |
| 內文 / 介面 | Noto Sans TC(思源黑體),fallback PingFang TC | `--sans` |
| Meta / 編號 / 英文標籤 | 系統等寬 `ui-monospace` | `--mono` |

字重:襯線 600(標題)/ 500(引言);黑體 300(內文,刻意輕)/ 400 / 500。
中文標題用 `letter-spacing:.01em`、`text-wrap:balance`;內文 `line-height` 1.85–1.95 求呼吸感。

---

## 3. 色彩

低飽和、暖中性。點綴色共用 chroma,只變 hue。

```
亮色                          深色 (data-theme="dark")
--bg     #fbfbfa  暖白          #161617
--bg-soft #f4f3f1              #1e1e20
--t1     #1a1a1a  主文          #ededec
--t2     #57534e  次文          #a8a29e
--t3     #8c8884  弱化          #78716c
--divider #e7e5e2 髮絲線        #2c2c2f
--sand   oklch(0.58 0.028 70)  米沙(暖)
--slate  oklch(0.56 0.032 245) 灰藍(冷)— 主要點綴 / active / 連結
```

用法:`--slate` 是主要點綴(active 連結、tag、按鈕、強調);`--sand` 保留給較感性的版位(如「靜默 / 墨」稿的呼吸色塊)。深色模式提高點綴明度(L≈0.7)維持對比。

---

## 4. 元件

對應 VitePress 覆寫:

| 本系統 class | 覆寫 / 取代 | 說明 |
|---|---|---|
| `.nav` | `.VPNav` | 襯線 wordmark、單色連結、active 用灰藍細底線(非藍字)、下拉選單、文字搜尋鈕、社群圖示、手機「選單」 |
| `.hero` | `.VPHero` | 拔掉漸層字與背景網格;eyebrow(等寬)+ 襯線大標 + 輕黑體副標 |
| `.pidx` | `.VPFeatures` | 五個 Pillar 改成「編輯式目錄」:編號 · 襯線名 · 說明 · 篇數 · →。下方一行導向標籤 |
| `.pc` | ProjectCard | 無框、編號 + 襯線標題,hover 整列左移、字轉灰藍 |
| `.ac` + `.tag` | PostCard | 圖左文右,標籤改低飽和灰藍(取代預設紅藥丸),保留 `+N` 溢位 |
| `.bh-band` | BeehiivSubscribeForm | 柔色塊內 input + 純色 submit,無任何圖示 |
| `.about` | 關於頁 | 見 §6 |
| `.prose` | `.vp-doc` 內文 | 見 §5 |
| `.btn--solid/ghost` | 按鈕 | 純色 / 線框,無漸層 |

互動回饋一律「優雅且微小」:hover 多為背景柔色變化 + 3–4px 位移 + 點綴色,transition 0.2–0.3s。

---

## 5. 文章內文與圖片插入(重點)

內文容器 `.prose`。Markdown 仍照常寫,圖片有三種版位:

### a. 標準圖片(含說明)
```html
<figure>
  <img src="/img/alhambra.jpg" alt="阿爾罕布拉宮" />
  <figcaption>格拉納達 · 阿爾罕布拉宮</figcaption>
</figure>
```
純 Markdown `![阿爾罕布拉宮](/img/alhambra.jpg)` 也會被 `.prose > img` 接住(滿寬、圓角)。
> VitePress 可用 `markdown-it-image-figures` 外掛,自動把 `![alt](src)` 轉成上面的 `<figure>`,`alt` 變 `figcaption`。

### b. 並排兩圖
```html
<div class="img-row">
  <figure><img src="a.jpg" /><figcaption>…</figcaption></figure>
  <figure><img src="b.jpg" /><figcaption>…</figcaption></figure>
</div>
```
窄螢幕自動疊成單欄。

### c. 全幅(full-bleed)
```html
<figure class="full">
  <img src="aqueduct.jpg" />
  <figcaption>塞哥維亞水道橋</figcaption>
</figure>
```
圖延展到視窗左右邊緣,說明文字仍對齊內文欄寬。

圖片規格建議:橫幅 banner 21:9(約 1600×686);內文圖 16:9 或 4:5;全幅圖長邊 ≥ 1600px。說明文字用等寬、置中、`--t3`。

範例頁:`文章範例 · Article.html`。

---

## 6. 關於頁(參考 typeless.com/about)

結構:小導覽 → 一句**粗體大標 hook** → **整幅 banner 圖** → 幾段精煉敘事(含明體 pull-quote)→ 分隔線 → 結構化「資料」區塊(人像 1:1 + 名字 + 角色 + meta + 社群 + CTA)。

- `.about__hook` — 全頁最大的襯線句,定調人格。
- `.about__banner` — 21:9 圖片插槽。
- `.about__pull` — 明體引言,夾在敘事中製造節奏。
- `.profile` — 左人像、右資料;meta 用「等寬 key + 黑體 value」兩欄。
- 社群在此用線框方框圖示(`.profile__social`),與導覽列裸圖示區分。

實作頁:`關於 · About.html`。

---

## 9. 文章收藏 / 讀取清單(純前端)

沒有後端,用 `localStorage` 做「收藏 / read-later」。概念接近購物車的「訂選」:讀者把想看的文章收進來,之後到「收藏」頁一次看。

- **儲存**:key `saved_articles`,值為文章物件陣列 `{id,title,url,date,cover,tags[]}`。
- **觸發**:任何 `<button class="bk" data-bookmark data-id ...>` 都會被 `site.js` 綁定,點擊即 toggle。卡片用 **stretched-link**(`.ac__link::after{inset:0}`)讓整張卡可點,收藏鈕 `z-index` 疊在上層、且為連結的「兄弟」而非子層,避免 `<button>` 巢狀於 `<a>` 的無效標記。
- **狀態**:`.bk.is-saved` 顯示實心灰藍小圓點 + 「已收藏」;無圖標。
- **入口**:導覽列右側 `收藏 N`,計數即時更新(`[data-saved-count]`,0 時 badge 轉灰)。
- **收藏頁**:`收藏 · Saved.html`,`#savedList` 由 JS 渲染成 `.ac` 卡片,`#savedEmpty` 為空狀態。在此移除會即時消失。

落地 VitePress:把 `getSaved/toggleSave/...` 包成一個 composable(如 `useBookmarks.ts`),`BookmarkButton.vue` 與 `SavedLayout.vue` 共用;PostCard 加一顆 `<BookmarkButton :post="post" />`。之後若接後端,只要把讀寫換成 API、介面不動。

實作頁:`收藏 · Saved.html`、`assets/site.js`。

---

## 7. 檔案結構

```
assets/theme.css   設計系統(唯一 CSS 來源)
assets/site.js     主題切換 / 手機選單 / 搜尋 stub / 訂閱表單
首頁 · 秩序.html     首頁(VPHero + Project + Post + Beehiiv + Pillar 目錄)
關於 · About.html    關於頁
文章範例 · Article.html  內文 + 圖片慣例示範
```

落地到 VitePress 時:`theme.css` 進 `docs/.vitepress/theme/`,各 class 對應到 §4 的元件 / layout 覆寫;`site.js` 的邏輯改寫進對應 Vue 元件(主題切換用 VitePress `useData().isDark`)。

---

## 8. 待辦 / 之後

- [ ] 把 mock 換成正式 Vue SFC:`SiteNav.vue`、`ProjectCard.vue`、`PostCard.vue`、`BeehiivSubscribeForm.vue`、`PillarIndex.vue`、`AboutLayout.vue`。
- [ ] BeehiivSubscribeForm 接現有 `NewsletterAdapter`(`adapters/newsletter`)。
- [ ] Pillar 篇數改讀 `posts.data` 實際 count(目前為示意)。
- [ ] 搜尋接 VitePress local search。
- [ ] 圖片改用實際檔案,移除條紋佔位。
