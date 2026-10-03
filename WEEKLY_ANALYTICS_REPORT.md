# ZimonAI 網站週報編輯規範

## 寄送設定

- 主旨：`ZimonAI 網站週報｜YYYY.MM.DD–MM.DD`
- 時區：Asia/Taipei
- 統計區間：上週一 00:00 至上週日 23:59
- 收件人：`simonlo@zimonai.com`、`simon124376158@gmail.com`
- 內文格式：適合 Gmail 與手機閱讀的 HTML Email；版面簡潔、精緻，不使用外部圖片或需要登入才能載入的素材。

## 寫作原則

- 使用自然、專業的繁體中文，不逐字翻譯英文介面名稱。
- 先說結論，再呈現數字。數字必須附帶語境與可行動的解讀。
- 不推測訪客身分、公司或購買意圖；資料只能支持到哪裡，就寫到哪裡。
- 不虛構數據。缺資料、統計啟用未滿整週或查詢失敗時，必須明確標示。
- 瀏覽工作階段不等於不重複訪客；互動次數不等於詢價或成交。
- 當整週瀏覽量低於 20 次時，趨勢只作觀察，不使用「證明」「確定」「顯著」等字眼。
- 建議最多三項，必須具體、可執行，並依影響力排序。
- `technicalReliability.clientErrors.signalCount` 是瀏覽器送出的錯誤訊號次數，不是受影響的使用者數、工作階段數或事故數；同一個問題可能重複送出多次。
- `technicalReliability.navigationPerformance` 只提供固定區間與各自的 `sampleCount`。報告可描述樣本落在哪些區間，但不得用區間中點推算平均值，也不得把抽樣結果寫成全站所有瀏覽的精確速度。

## 固定結構

1. **本週一句話**：用一至兩句話概括本週最值得注意的現象。
2. **本週概覽**：瀏覽量、瀏覽工作階段、關鍵互動、聯絡點擊；可比較上週，但基期為零時不用百分比。
3. **訪客在看什麼**：熱門頁面、語言與裝置分布，說明可合理看出的內容偏好。
4. **服務關注度**：T1–T6 選擇與主要行動按鈕；沒有互動也要如實寫明。
5. **聯絡與轉換訊號**：Email、兩地電話、已保存的需求表單，以及舊版需求 Email 草稿的點擊或建立次數；「需求表單送出」只代表網站已保存需求，不得寫成有效詢盤或成交。
6. **趨勢判讀**：最多三點，清楚區分資料事實與編輯判讀。
7. **下週建議**：最多三項，說明建議依據。
8. **技術可靠性（選用）**：只有在出現錯誤訊號、載入樣本足以形成可解讀的分布，或有需要追蹤的技術現象時加入；保持簡短，不取代主要營運內容。
9. **資料說明**：統計區間、資料啟用日、隱私方式與指標限制。

## 技術可靠性判讀規則

- 錯誤訊號依種類、頁面群組與瀏覽器家族整理。`signalCount = 0` 只能寫成「本週沒有收到錯誤訊號」，不能寫成「網站沒有錯誤」。若 `available = false`，應說明該期間尚無這項資料，不要用零取代缺失。
- 導覽速度分為 TTFB 與完整頁面載入時間兩組固定區間；兩者必須各自標示樣本數。樣本數不同時分開敘述，不得合併成同一個母體。
- 導覽速度約抽樣 15% 的瀏覽工作階段，且每個被抽中的工作階段至多回報一次。少於 20 筆時必須標示「樣本偏少，只供觀察」，不可下穩定性或趨勢結論。
- 若比較前一週，必須同時列出兩週樣本數。前一週沒有樣本時不計算改善或惡化百分比。
- 隱私說明須交代：錯誤監控只保留彙總後的頁面群組、錯誤類型與瀏覽器家族，不收錯誤訊息、程式堆疊、網址查詢參數或原始 User-Agent；啟用 DNT 或 GPC 的瀏覽不回報。

## 視覺語氣

- ZimonAI 深藍 `#10263f` 作為標題色，紙白 `#f9fbfc` 與霧灰藍 `#edf2f6` 作為背景，品牌藍 `#2d64ae` 作為少量重點色；警示色只用於真正需要注意的訊號。
- 數據卡片只呈現四個核心指標；其餘資訊以短段落、小表格或水平長條呈現。
- 避免整封信像儀表板截圖。週報首先是一份經過判讀的營運信件，其次才是數據表。

## QA 排除與資料來源（2026-10 更新）

- 每次正式站 QA，先用 `https://zimonai.com/?zimonai_qa=1` 進入。匿名 session cookie 與 tab sessionStorage 維持排除；使用 `?zimonai_qa=0` 明確離開。`www` 與裸網域須各自啟用。停用兩種儲存時，不能假定跨頁保持排除，改用隔離環境或網路攔截。
- QA 模式不送 `/api/analytics` 與 `/api/client-errors`；後端也會辨識 `zimonai_qa=1` cookie／query 或 `X-Zimonai-QA: 1`，回覆 204 與 `X-Zimonai-Telemetry: excluded-qa`，不寫資料。CLI QA 必須帶該 header。DNT/GPC 仍受尊重。
- QA 標記的 `/api/inquiries` 會回覆 409 `qa_submission_disabled`，不保存、不通知；正式站 QA 不得送假詢問。前端成功狀態與後端保存驗證使用本機 mock 或隔離 Pages/D1。其他正式業務操作不會因 QA 模式變成 sandbox。
- 此規則只排除明確標記的後續 QA。舊流量不刪除、不猜測重分類；QA 比例未知。部署當週也不能寫成全週已排除 QA。
- 執行最新 main 的 `npm run analytics:weekly`。JSON 同時查詢 `zimonai-analytics` 與 `zimonai-portal`，報告必須分列：
  1. `current.browserEvents.requestSuccessSignals`：瀏覽器成功回應訊號；`discussRequirementClicks` 是前往表單連結的點擊，不等於表單載入或填寫。
  2. `current.businessRecords.savedInquiries.count`：期間建立且仍留存的後端詢問，包含所有狀態；不是有效詢盤或成交。
  3. `current.businessRecords.inquiryNotifications.byStatus`：期間建立的詢問通知，在查詢當下的 queued／sending／sent／failed 狀態。一筆詢問可能有多位管理員通知；sent 僅代表寄送服務接受，不代表收件匣送達。
- `available: false`、`count: null` 必須寫「本次無法取得」，不得寫零。舊 `requestSubmissions` 只保留相容性，仍是瀏覽器事件，禁止將它標為已保存需求。
- 必列 `timezone`、兩週 start/end、`businessRecords.startInclusive/endExclusive` 的 UTC 邊界與 `dataAsOf.queryStartedAt/queryCompletedAt`。查詢不是跨表原子快照，通知狀態可能較統計區間晚更新；與前週比較時沿用同一口徑。
- 本 repo 產生統計 JSON 與本規範；寄送自動化應使用最新 checkout 及這份規範，不能從舊 JSON 或記憶補出後端保存／通知數。
