# Haowei's Tech Blog

這是一個基於VitePress構建的技術部落格，使用vitepress-theme-open17主題，專注於程式開發、AI技術與生活分享。

## 特點

- 基於 [VitePress](https://vitepress.dev/) 構建
- 使用 [vitepress-theme-open17](https://github.com/Velonor/vitepress-theme-open17) 主題
- 支持暗色/亮色模式切換
- 優化的SEO設置
- 集成評論系統
- 響應式設計
- 圖片輪播展示
- 全文搜索功能

## 內容類別

- **AI技術**：介紹最新AI技術和應用，如MCP架構、企業AI落地等
- **程式開發**：分享前後端開發技巧、工具和最佳實踐
- **生活隨筆**：記錄生活感悟和思考
- **旅行見聞**：分享旅行經歷和攝影作品

## 本地開發

```bash
# 安裝依賴
npm install
npm install sharp --save-dev

# 啟動本地開發服務器
npm run docs:dev

# 構建生產版本
npm run docs:build

# 預覽生產版本
npm run docs:preview
```

## 部署

本項目使用GitHub Actions自動部署到GitHub Pages。每當推送到main分支時，網站將自動構建和部署。

## 技術棧

- VitePress
- Vue.js
- Tailwind CSS
- GitHub Actions
- Giscus評論系統

## 授權

本項目內容採用 [MIT License](LICENSE) 授權。

## 聯繫

如有問題或建議，請通過以下方式聯繫：

- GitHub: [shen2255678](https://github.com/shen2255678)
- 電子郵件: haowei@example.com
