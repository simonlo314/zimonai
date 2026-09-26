# ZimonAI 已批准改版：本機交付與驗收

日期：2026-09-26–27，Asia/Taipei。
狀態：本機實作完成；Production 未部署。後端 Cloudflare 同環境執行驗證尚未完成，不宣稱可直接免驗證上線。

## 本次完成

- 依已批准 Homepage Prototype 延伸首頁、Services、Methodology、About、Inquiry、Scope & limits；各頁依內容採不同版型，沒有複製整張首頁。
- 共用 Header／Footer 與 Services／Resources Mega Menu 已接入實際網址、詢價分類、語言切換。原型本身保留在 prototypes/homepage-visual。
- 英文根網址維持主要版本；繁中／簡中自然本地化，不強迫相同文字寬高。沒有 browser-language redirect 或 suggestion。
- T1 USD 149、T2 USD 349、Advanced 範圍報價保留。固定价格、數量、交期、報告頁數讀取 shared/service-facts.mjs；三語付款、公開服務、Stripe 定價與營運名稱有一致性測試。
- 內部 t1–t6、舊 #t1–#t6、Portal／Admin 原有工作區、訂單、付款及通知流程保留。沒有改 Stripe API version，沒有遷移歷史訂單。
- 詢價分類與管理端／通知連動保留，新增欄位 migration 0009 為 additive；舊詢價預設 unsure。
- 語言切換保留 equivalent page、服務錨點，以及 allowlist 內 service／interest；不複製個人資料 query。
- 既有 Analytics 依 locale 分組並記錄 inquiry_classified。瀏覽器事件數不等於去重客戶、營收或真正的轉換率。
- 圖片保留來源、合法授權及場景說明；使用本機 WebP 衍生尺寸；非首屏圖片延遲載入。

## 已驗證

| 檢查 | 結果與邊界 |
|---|---|
| Build | 163 個 HTML 頁面；最終資產版本 0ea06030f1d5 |
| 靜態檢查 | 163 頁通過；內部連結、三語、付款定價、schema、canonical、hreflang、sitemap 等既有契約 |
| 自動測試 | 208 passed / 0 failed / 0 skipped；含認證、越權、Stripe webhook、historical orders、詢價、通知、分類 migration、locale reporting、選單與新版內容契約 |
| Cloudflare 編譯 | Pages Functions 本機打包成功；這不是部署或執行成功證明 |
| Git whitespace | git diff --check 通過 |
| Browser 核心矩陣 | 六頁 × 三語 × Desktop／Mobile = 36 個版面組合；無可見水平溢位或破圖 |
| 額外 responsive | 320／768／1024／1100 px，三語 Home／Services／Inquiry；窄版聯絡連結裁切已修正後複驗 |
| Navigation | Desktop ArrowDown／Escape 與焦點返回；Mobile 開合、內部捲動及背景捲動恢復 |
| Language | Services #t2：EN → 繁中 → 簡中仍停在同服務；Advanced／t4 詢價 query 保留且初始化後正確預選 |
| Forms | 必填欄位及 consent 未完成會阻止送出並提示；切回 T1 時隱藏並停用進階 interest |
| 素材 | 本輪沒有 AI 生成照片、假案例、假文件內頁或假報告 dashboard |

瀏覽器為現有 Chrome 分頁，使用桌面／手機 viewport 模擬；沒有開新分頁。頁面同時保有可見鍵盤焦點、原生 disclosure／label／required 機制及 reduced-motion 支援；本輪不宣稱完整 WCAG 認證或實體手機／Safari 測試。

## 未完成的外部／執行環境驗證

1. **Cloudflare 本機模擬後端未成功完成執行驗證。** 已安裝的 Miniflare／workerd 在載入編譯 Pages bundle 時回傳 runtime internal error；基本無 D1 Worker 可啟動，最小 D1 probe 未完成。未確認根因，因此不把它誤報為正式站故障。限定排查後已停止測試程序；没有更改生產相容旗標或依賴版本。
2. 沒有呼叫正式 Stripe、真實扣款、Google 登入、寄送通知或驗證收件。上述流程已跑單元／SQLite 整合回歸，但正式環境連線仍待適當 staging smoke test。
3. 沒有套用正式 D1 migration，也沒有讀寫 Cloudflare／DNS／正式訂單；正式網站內容沒有更新。
4. 未批准公開的匿名化報告內頁仍是素材缺口。頁面只用現有公開封面並明確說明限制，沒有自行製造證據。

## 正式上線前的停止點

必須取得 Simon 明確的 Production 授權。之後仍需使用既有 release 安全流程：驗證目標與備份／回復方案、確認 migration 0008／0009 與當前資料庫狀態、先完成後端 runtime／staging 冒煙測試，再更新正式站並做三語與詢價／付款驗收。不得把本報告當成發布授權。

## 素材來源

- Hero：Nenad Stojković／Shixart1985，Wikimedia Commons，CC BY 2.0。[原始來源](https://commons.wikimedia.org/wiki/File:Machine_places_components_on_a_circuit_board_during_manufacturing_in_a_factory_environment.jpg)。已縮放、轉碼及裁切；不主張拍攝於中國、不宣稱為自家客戶或查核現場。
- 接待區照片與營業執照：沿用專案既有、已准公開素材；保留公共接待區及地址的原有揭露文字。
- 報告：現有英文 sample 的原始封面；不是新案件，也不把舊範例內頁當作新版交付規格。

## 查看成果

- [本機預覽](http://127.0.0.1:4173/)
- [三語 Desktop／Mobile 完整截圖索引](/Users/luoyixue/Documents/Codex/2026-08-12/zimonai/work/zimonai-stripe/output/approved-redesign/README.md)
- [版面與互動檢查資料](/Users/luoyixue/Documents/Codex/2026-08-12/zimonai/work/zimonai-stripe/output/approved-redesign/browser-qa.json)
- [Design System 與實作邊界](/Users/luoyixue/Documents/Codex/2026-08-12/zimonai/work/zimonai-stripe/REDESIGN_IMPLEMENTATION.md)

本機檔案及既有未提交內容均保留；沒有 commit、push 或 deploy。保留原型及施工前來源安全副本，以便比較與回復。截圖中的游標／焦點框來自真實操作，不是頁面設計元素。
