# 子選單、品牌細節與圖片改善 — 本機驗收

日期：2026-09-27（Asia/Taipei）

本輪已實作使用者確認的改善計劃。**未部署 Production、未推送、未提交。**
沿用既有 `http://127.0.0.1:4173/` 預覽與原瀏覽器分頁，沒有另開分頁。

## 已完成

- Services 選單：T1 / T2 橫向服務列、價格對齊、Advanced 獨立區、底部輔助連結。
- Resources 選單：所有文章總入口、雙欄分類、底部相關資源；窄視窗改單欄。
- 修正 `.mega-panel a span` 誤傷 `.cjk-keep` 的問題，以明確文字角色控制樣式。
  保留中文斷詞保護；沒有刪除全站多語功能。
- 選單有最大寬度及依視窗高度決定的可捲動範圍。跨 1050px 斷點不遺留捲動鎖定。
- 手機選單開啟時暫時隱藏聯絡浮鈕，避免遮住連結；關閉後恢復。
- Header 增加三語業務副標；窄視窗收起，保留導覽空間。
- Client Portal 僅移除盾牌外框／底色、調整圖形大小與間距；沒有重設 Logo 或變更驗證。
- Methodology 改為照片與精簡標題的首屏、寬版查核清單，不保留空蕩的左側長欄。
- 首頁服務介紹、Services T1 增加充電器實拍；Advanced 加入既有製造情境照片。
- 新的產品照片有三語圖說、替代文字、來源連結與情境限制，提供 640 / 1200px WebP。
  四個衍生檔分別約 14.6、48.4、15.9、35.3 KB；原圖保留。

## 實際驗證

| 項目 | 結果 |
| --- | --- |
| Build | 成功，163 HTML 頁，assets `643d75a022d5` |
| 專案檢查 | 通過：三語內容、價格、SEO、付款及內部連結合約 |
| 完整自動測試 | 211 項通過，0 失敗 |
| 最後圖片位置調整後的相關測試 | 22 項通過，0 失敗；再次 build / check 通過 |
| 選單尺寸矩陣 | 3 語 × 2 選單 × 12 種尺寸 = 72 組，未發現橫向溢位或被設為 block 的中文斷詞 |
| 不重載來回改寬度 | 120 組，包括 1049 / 1050 / 1051 / 1052px；未發現溢位或桌面殘留捲動鎖定 |
| Chrome 原生縮放 | 125%、150%、200% × 3 語 × 2 選單 = 18 組通過；已恢復 100% |
| 短視窗與鍵盤 | 1532×320 與 390×600，三語兩選單共 12 組；最後連結可捲到、Esc 關閉後焦點回觸發按鈕 |
| 頁面尺寸檢查 | Home / Services / Methodology / About / Inquiry / Portal，三語桌機與手機共 36 組 |

選單尺寸：320×700、390×844、760×550、900×650、1050×540、1051×540、
1100×600、1200×700、1440×900、1532×450、1920×540、2560×1080。

頁面溢位檢查排除表單既有的反垃圾 honeypot（`.form-trap`，`aria-hidden`、`inert`，刻意
放在螢幕外），未改動其安全行為。不能將這個隱藏欄位當成可見版面錯誤。
照片的延遲載入透過實際捲至首頁服務區、T1 與 Advanced 區補驗。

## 截圖與資料

以下為實際瀏覽器畫面，不是設計示意圖。截圖中的游標或鍵盤焦點框是驗收操作狀態。

- [繁中 Services 桌機](output/playwright/visual-polish-20260927/final-zh-tw-services.png)
- [繁中 Resources 桌機](output/playwright/visual-polish-20260927/final-zh-tw-resources.png)
- [繁中 Services 手機](output/playwright/visual-polish-20260927/final-zh-tw-services-mobile.png)
- [英文 Methodology 桌機](output/playwright/visual-polish-20260927/final-en-methodology-desktop.png)
- [英文 Methodology 手機](output/playwright/visual-polish-20260927/final-en-methodology-mobile.png)
- [首頁服務圖片](output/playwright/visual-polish-20260927/final-home-services.png)
- [T1 服務圖片](output/playwright/visual-polish-20260927/final-services-t1.png)
- [Advanced 製造情境](output/playwright/visual-polish-20260927/final-services-advanced.png)
- [登入區 Logo 細節](output/playwright/visual-polish-20260927/final-portal-logo.png)
- [選單尺寸數據](output/playwright/visual-polish-20260927/menu-matrix.json)
- [跨斷點數據](output/playwright/visual-polish-20260927/resize-sweep.json)
- [原生縮放數據](output/playwright/visual-polish-20260927/native-zoom-matrix.json)
- [鍵盤／捲動數據](output/playwright/visual-polish-20260927/keyboard-scroll.json)
- [頁面尺寸數據](output/playwright/visual-polish-20260927/page-matrix.json)

## 範圍與限制

- 本次是本機視覺及互動驗收，不是 Production 安全、付款或登入驗收。
- 本機純靜態預覽沒有 Pages Functions；Portal 顯示未能確認工作階段／登入暫不可用。
  這不是此次移除 Logo 外框造成，也不能因此宣稱正式網站登入已失效。
- 沒有提交詢價、發信、付款、執行遠端 migration、變更 DNS / Cloudflare / Stripe。
- T1 USD 149、T2 USD 349、Advanced 依範圍報價、T3–T6 深連結與歷史邏輯仍受測試保護。
- 已有未提交工作保留。局部施工前備份：`/tmp/zimonai-visual-polish.45gvRW/before.tgz`。
- 公開報告內頁仍未取得公開／隱私審核，本次不展示、不模擬案件證據。
- 第三方照片來源與使用界線見 [THIRD_PARTY_ASSETS.md](THIRD_PARTY_ASSETS.md)。

前端設計技能用於保持既有深藍／品牌藍、字體與資訊架構，將圖片配置及版面密度重新整理，
沒有把首頁版型複製到全站，也沒有引入新的視覺風格。正式部署仍須取得使用者明確批准。

## 2026-09-27 補充：T3–T6 選單入口

- 依使用者最新指示，在 T2 下方新增「T3–T6｜進階與客製化服務」，附供應商訪談、
  實地查核與持續性協助摘要，價格為「客製化定價」。英文與簡中同步本地化。
- 此列連到既有 `services/#advanced`；右側四項細節入口保留。不新增固定價格、
  付款產品、服務分類或資料庫變更。
- 窄手機將價格移至摘要下方，保留閱讀寬度；三列編號及標題對齊。
- 相關測試 23 項全部通過；Build / check 通過，163 HTML 頁，assets `2d28d7102e05`。
  本次未重跑先前 211 項完整測試，以上完整測試數據屬上一輪。
- 三語 × 7 種尺寸（320×700、390×844、480×600、481×600、900×540、1051×450、
  1532×669）共 21 組，沒有橫向溢位或中文斷詞變為 block 的情形。
- 已實際點擊繁中手機版入口，正確前往 `/zh-tw/services/#advanced`，選單關閉。
- 僅本機修改，未部署 Production。

實際畫面與數據：

- [繁中桌面新增列](output/playwright/visual-polish-20260927/t3-t6-zh-tw-desktop.png)
- [繁中手機新增列](output/playwright/visual-polish-20260927/t3-t6-zh-tw-mobile.png)
- [英文桌面新增列](output/playwright/visual-polish-20260927/t3-t6-en-desktop.png)
- [英文 320px 手機](output/playwright/visual-polish-20260927/t3-t6-en-small-mobile.png)
- [本輪 21 組尺寸檢查](output/playwright/visual-polish-20260927/t3-t6-menu-matrix.json)
