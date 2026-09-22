# kkana 委託網站

Live2D 建模、Live2D 立繪拆圖與插畫作品集。

## 網站內容

- `index.html`：名稱、介紹、價格、服務內容、委託條款和聯絡方式。
- `style.css`：淺藍白色配色與手機版排版。
- `content.js`：作品圖片、MP4 影片與 YouTube 影片清單。
- `app.js`：分類切換、幣別顯示、影片與作品放大功能。
- `favicon.svg`：網站圖示。
- `.nojekyll`：讓 GitHub Pages 直接提供靜態網站。

## 修改作品

在 `content.js` 的 `rig`、`model` 或 `art` 清單新增或替換項目：

```js
{ type: 'image', title: '作品名稱', src: 'assets/example.jpg' }
{ type: 'video', title: '模型展示', src: 'assets/example.mp4', poster: 'assets/cover.jpg' }
{ type: 'youtube', title: '模型展示', id: 'YouTube影片ID' }
```

若使用本地檔案，把圖片或影片放進 `assets` 資料夾並一起上傳。現有圖片和 MP4 沿用作者舊 Wix 網站的公開素材連結；如果刪除舊站媒體，請同步替換這裡的來源。YouTube 作品使用原影片 ID。

## 修改價格

`index.html` 中每個 `data-prices="300,3600,114"` 的三個數字，依序為 MYR、TWD、USD。三種價格為獨立標價，不會按匯率自動換算。

## GitHub Pages

將這個資料夾內的檔案放到儲存庫根目錄。Settings → Pages → Deploy from a branch → main / (root) → Save。之後修改檔案並提交，網站會重新發布。

## 權利與聯絡

作品權利屬於原作者及相關權利人。本儲存庫公開不代表授權重用插畫或模型作品。委託聯絡：kanakiyuuran@gmail.com。
