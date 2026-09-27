# 星之卡比：甜點王國大冒險 (Kirby: Dessert Kingdom Adventure) 🍓✨

專為小朋友與卡比愛好者打造的互動冒險網頁遊戲。融合了純網頁即時 8-bit 音效合成器、流暢動畫、多重分歧技能路線、觸控與鍵盤雙模式操作、響應式自適應解析度縮放，以及即時高分榮譽榜系統。

本專案已完全配置好 **GitHub Actions (Node.js 22)** 自動化 CI/CD 流程，支援一鍵發布至 **GitHub Pages** 靜態託管。

---

## 🌟 遊戲核心特色

1. **雙模式流暢操作**：
   - **鍵盤控制**：數字鍵 `1`、`2`、`3` 選擇行動，方向鍵 `←` `→` / `↑` `↓` 切換選項，`Enter` / `空白鍵` 確認，`S` 鍵吃星星，`M` 鍵靜音，`B` 鍵音樂，`H` 鍵排行榜，`R` 鍵重新開始。
   - **觸控控制**：超大彈性立體按鈕與直覺式觸控熱區，手機與平板輕觸即玩。
2. **純原生 8-bit Web Audio 合成音訊**：
   - 零外部音效檔案依賴，使用原生瀏覽器音訊震盪器（Oscillator）即時合成卡比吞食變身、受傷震動、通關大樂章與背景音樂。
3. **13 組標準圖檔配置**：
   - 卡比四型態：`normal-kp.jpg`、`sword-kp.jpg`、`ice-kp.jpg`、`stone-kp.jpg`
   - 敵人與魔王：`enemyknight-kp.jpg`、`enemypenguin-kp.jpg`、`bossbird-kp.jpg`
   - 背景與機關：`bgstage1-kp.jpg`、`bgstage2-kp.jpg`、`obstaclewaterfall-kp.jpg`、`bgstage3-kp.jpg`、`obstaclespikes-kp.jpg`、`bgboss-kp.jpg`
   - 所有圖片均存放於 `/public` 目錄，在 Vite 建置時會自動複製至 `/dist` 根目錄，完美確保 GitHub Pages 相對路徑讀取無虞。
4. **即時排行榜與分數結算系統**：
   - 紀錄玩家名稱、剩餘體力獎勵、甜點星星加成、通關時間加成與無傷大獎。
   - 資料自動持久化於 `localStorage`，隨時查看歷史榮譽榜。
5. **自適應解析度與視覺動畫**：
   - 具備受傷螢幕震動、角色漂浮跳躍、金色勝利光環與通關彩帶粒子特效。

---

## 🚀 開發團隊快速部署清單 (Quick Deployment Checklist)

在將專案推送到 GitHub 前後，請依循以下 4 個步驟完成發布：

- [ ] **1. 推送程式碼至 GitHub 倉庫**：
  ```bash
  git add .
  git commit -m "feat: setup kirby dessert adventure with github pages workflow"
  git branch -M main
  git remote add origin https://github.com/<你的使用者名稱>/<你的倉庫名稱>.git
  git push -u origin main
  ```
- [ ] **2. 開啟 GitHub Pages 來源設定**：
  - 進入 GitHub 專案頁面 ➔ 點選頂部 **Settings** ➔ 左側選單點選 **Pages**。
  - 在 **Build and deployment** 區塊：
    - **Source** 下拉選單請選擇 **`GitHub Actions`**（非 Deploy from a branch）。
- [ ] **3. 檢查 GitHub Actions 執行狀態**：
  - 點選倉庫頂部的 **Actions** 分頁。
  - 觀察名為 `Deploy to GitHub Pages` 的工作流程，它會自動完成：
    - 環境設定 (Node 22)
    - 依賴快取自動檢查
    - 依賴安裝 (`npm install`)
    - 程式碼品質檢查與型別驗證 (`npm run lint` & `npm run test`)
    - 靜態網站建置 (`npm run build` 產出至 `dist`)
    - 自動上傳與發布至 Pages。
- [ ] **4. 驗證上線網址**：
  - 部署完成後，工作流程輸出中會顯示發布網址（通常為 `https://<你的帳號>.github.io/<倉庫名稱>/`）。
  - 打開網址驗證圖片、音效及按鈕操作是否全部正常運作。

---

## 🛠️ 開發常用指令教學 (Command Cheat-Sheet)

| 指令 | 說明 |
| :--- | :--- |
| `npm install` | 安裝專案所需之相依套件 |
| `npm run dev` | 啟動本機開發伺服器（預設於 `http://localhost:3000`） |
| `npm run build` | 執行靜態建置，編譯至 `/dist` 目錄（自動包含靜態資源與圖片） |
| `npm run preview` | 預覽本機建置完成後的靜態生產版本 |
| `npm run lint` | 執行 TypeScript 嚴格型別檢查 |
| `npm run test` | 執行自動化測試與規範驗證 |
| `npm run generate:assets` | 重新生成或更新 `/public` 內的 13 組標準 JPEG 遊戲圖檔 |

---

## 🔧 部署與 CI/CD 工作流程配置說明

本專案的 GitHub Actions 工作流程定義於 `.github/workflows/deploy.yml`，針對現代前端靜態託管進行了以下關鍵最佳化：

1. **鎖定 Node.js 22 執行環境**：
   ```yaml
   - name: Setup Node.js 22
     uses: actions/setup-node@v4
     with:
       node-version: 22
   ```
2. **標準 `npm install` 指令**：
   - 移除強制依賴 `package-lock.json` 的 `npm ci` 限制，即使團隊成員剛複製專案或環境不同步，也能順利安裝套件並進行 Vite 編譯。
3. **智慧 npm 快取機制**：
   - 使用 `actions/cache@v4` 快取 `~/.npm` 目錄，並在步驟中打印快取命中狀態，平均縮短 40% 的 CI 建置時間。
4. **Vite 相對路徑最佳化 (`vite.config.ts`)**：
   - 設定 `base: './'`，確保網站在 GitHub Pages 的子路徑（如 `https://user.github.io/repo/`）或獨立自訂網域下均能正確讀取 JavaScript、CSS 與圖片。
5. **完整 Pages 部署權限設定**：
   ```yaml
   permissions:
     contents: read
     pages: write
     id-token: write
   ```

---

## ❓ 故障排除常見問題解答 (FAQ)

### Q1: 部署到 GitHub Pages 後頁面顯示空白或 404 資源錯誤？
- **原因**：通常是靜態資源路徑寫死成絕對路徑 `/`。
- **解決方法**：本專案已在 `vite.config.ts` 中將 `base` 配置為 `'./'`。所有圖片直接引用檔名（如 `normal-kp.jpg`），在 GitHub 子目錄下也能自動解析正確位置。

### Q2: GitHub Actions 流程在部署步驟報錯：`Permission denied` (HTTP 403)？
- **原因**：GitHub 倉庫未開放 Actions 寫入 Pages 的權限。
- **解決方法**：
  1. 進入倉庫 **Settings** ➔ **Actions** ➔ **General**。
  2. 向下滾動到 **Workflow permissions**。
  3. 勾選 **Read and write permissions** 並點擊 **Save**。
  4. 確認 **Settings** ➔ **Pages** 的 Source 已切換為 **GitHub Actions**。

### Q3: 為什麼在 GitHub Pages 上圖片無法顯示？
- **原因**：圖檔未包含在 Git 追蹤範圍內，或建置時未複製到 `dist/`。
- **解決方法**：
  - 本專案的所有 13 張圖片均放置在 `/public` 目錄。
  - Vite 在執行 `npm run build` 時會自動將 `/public/*` 完整拷貝至 `dist/` 根目錄。
  - 確保提交時將 `public/*.jpg` 包含在 git commit 中即可。

### Q4: 在 iOS Safari 或部分行動瀏覽器上沒有聲音？
- **原因**：現代行動瀏覽器對自動播放音訊有限制（Autoplay Policy），必須在使用者第一次觸控或點擊網頁後才允許啟動 `AudioContext`。
- **解決方法**：本遊戲的 `soundEngine` 在玩家點擊任何按鈕或觸控螢幕時會自動呼叫 `ctx.resume()`，即開即響。

---

## ⚙️ 開發環境設定檔範本 (.env.example)

本專案為純前端靜態應用，在 GitHub Pages 部署時無需任何外部伺服器或秘密金鑰。若在本機或擴充環境開發，可參考以下範本：

```env
# 應用程式基底路徑（GitHub Pages 預設為 ./）
VITE_APP_TITLE="星之卡比：甜點王國大冒險"

# 開發伺服器端口（預設 3000）
PORT=3000
```
