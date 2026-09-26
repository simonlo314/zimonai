import { SERVICE_FACTS, serviceName, servicePrice, serviceTiming } from '../shared/service-facts.mjs';

// Each service owns its localized wording. All display and checkout surfaces read here.
const serviceCopy = {
  "t1": {
    "en": {
      "summary": "Remote identity, business-registration and charger-specific certificate checks.",
      "mode": "Remote",
      "groups": [
        {
          "title": "Supplier identity and legal status",
          "items": [
            "Business licence authenticity and unified social credit code",
            "Registered capital, establishment date and legal representative",
            "Whether the registered business scope genuinely includes manufacturing",
            "Current status: active, abnormal, cancelled or revoked",
            "Dishonest judgment-debtor records",
            "Administrative penalty records"
          ]
        },
        {
          "title": "Charger-specific certification review",
          "items": [
            "Whether the FCC ID exists and matches the quoted model and wattage",
            "Whether the UL file is valid in UL Product iQ",
            "Whether the issuing laboratory appears on an FCC excluded or transition-period list",
            "Reasonableness review of the marked specification and quotation against a dated, like-for-like market sample; unusual prices are questions to investigate, not proof of a false quotation"
          ]
        }
      ],
      "marketReference": {
        "label": "Public supplier quote observation · checked 31 Aug 2026",
        "title": "A selected current quote sample—not audited manufacturing cost.",
        "text": "Across selected Alibaba, Made-in-China and Global Sources listings, advertised unit prices for non-identical 65W GaN wall chargers were about USD 5.20–10.70 at listed MOQs of 50–500 pieces.",
        "limits": "Freight, tax, Incoterms, custom packaging and evidence behind certification claims were not consistently included or disclosed. Compare port count, plug, protocol, components, certification evidence, packaging, warranty, customisation, volume and delivery terms before treating a quotation as high or low.",
        "sources": [
          {
            "label": "Alibaba · 100+ pieces",
            "href": "https://www.alibaba.com/product-detail/2025-GaN-Customizing-ETL-FCC-Certificated_1601213471100.html"
          },
          {
            "label": "Made-in-China · 500 pieces",
            "href": "https://langbone.en.made-in-china.com/"
          },
          {
            "label": "Global Sources · 50+ pieces",
            "href": "https://www.globalsources.com/manufacturers/330w-dc-usb-c-gan-charger.html?pageNum=282"
          }
        ]
      },
      "delivery": `A ${SERVICE_FACTS.t1.reportPages.join('–')} page report with a risk rating, issue list and questions to ask before signing.`,
      "notIncluded": "Telephone contact, site work, capacity assessment, quality inspection or additional entities and models.",
      "consent": "Not required",
      "fit": "Overseas buyers contacting a Chinese supplier for the first time; typical order value USD 5,000–30,000.",
      "fixed": {
        "index": "02",
        "label": "Fixed-scope verification",
        "unit": "per standard case",
        "summary": "A fixed starting scope for one supplier, one legal entity and one charger or power-electronics model.",
        "notIncluded": "Telephone contact, site work, capacity assessment, quality inspection or additional entities and models.",
        "button": "Purchase T1"
      }
    },
    "zh-tw": {
      "summary": "先查供應商身分、合法性，以及充電類產品最重要的認證資料。",
      "mode": "純遠端",
      "groups": [
        {
          "title": "供應商身分與合法性",
          "items": [
            "營業執照真偽與統一社會信用代碼",
            "註冊資本、成立日期與法定代表人",
            "經營範圍是否確實包含「製造」",
            "經營狀態：存續、異常、註銷或吊銷",
            "失信被執行人紀錄",
            "行政處罰紀錄"
          ]
        },
        {
          "title": "充電類專屬認證比對",
          "items": [
            "FCC ID 是否存在，是否對應報價型號與瓦數",
            "UL 檔案號是否仍有效（UL Product iQ）",
            "發證實驗室是否出現在 FCC 除名或過渡期名單",
            "以有日期、同規格的市場樣本判斷標示規格與報價是否合理；異常價格是需要追查的線索，不等於虛假報價的證明"
          ]
        }
      ],
      "marketReference": {
        "label": "公開供應商報價觀察 · 2026 年 8 月 31 日查詢",
        "title": "這是當期公開報價樣本，不是經審計的製造成本。",
        "text": "本次選取 Alibaba、Made-in-China 與 Global Sources 的非完全同規格 65W GaN 壁插式充電器；公開單價約為 USD 5.20–10.70，頁面所列 MOQ 約為 50–500 件。",
        "limits": "頁面未一致包含或揭露運費、稅費、Incoterms、客製包裝與認證主張的佐證。判斷報價高低前，仍須逐項比對埠數、插腳、協議、用料、認證證據、包裝、保固、客製、數量與交付條件。",
        "sources": [
          {
            "label": "Alibaba · 100 件起",
            "href": "https://www.alibaba.com/product-detail/2025-GaN-Customizing-ETL-FCC-Certificated_1601213471100.html"
          },
          {
            "label": "Made-in-China · 500 件",
            "href": "https://langbone.en.made-in-china.com/"
          },
          {
            "label": "Global Sources · 50 件起",
            "href": "https://www.globalsources.com/manufacturers/330w-dc-usb-c-gan-charger.html?pageNum=282"
          }
        ]
      },
      "delivery": `${SERVICE_FACTS.t1.reportPages.join('–')} 頁報告，包含風險評級、疑點清單與簽約前追問清單。`,
      "notIncluded": "電話聯絡、現場工作、產能判斷、品質檢測，以及額外公司或型號。",
      "consent": "不需要",
      "fit": "首次接觸中國供應商的海外買家；常見單筆採購金額 USD 5,000–30,000。",
      "fixed": {
        "index": "02",
        "label": "固定範圍查核",
        "unit": "每件標準案件",
        "summary": "針對一家供應商、一個主要法律主體與一個充電或電源電子產品型號進行標準查核。",
        "notIncluded": "電話聯絡、現場工作、產能判斷、品質檢測，以及額外公司或型號。",
        "button": "購買 T1"
      }
    },
    "zh-cn": {
      "summary": "先查供应商身份、合法性，以及充电类产品最重要的认证资料。",
      "mode": "纯远程",
      "groups": [
        {
          "title": "供应商身份与合法性",
          "items": [
            "营业执照真伪与统一社会信用代码",
            "注册资本、成立日期与法定代表人",
            "经营范围是否确实包含“制造”",
            "经营状态：存续、异常、注销或吊销",
            "失信被执行人记录",
            "行政处罚记录"
          ]
        },
        {
          "title": "充电类专属认证比对",
          "items": [
            "FCC ID 是否存在，是否对应报价型号与瓦数",
            "UL 档案号是否仍然有效（UL Product iQ）",
            "发证实验室是否出现在 FCC 除名或过渡期名单",
            "以有日期、同规格的市场样本判断标示规格与报价是否合理；异常价格是需要追查的线索，不等于虚假报价的证明"
          ]
        }
      ],
      "marketReference": {
        "label": "公开供应商报价观察 · 2026 年 8 月 31 日查询",
        "title": "这是当期公开报价样本，不是经审计的制造成本。",
        "text": "本次选取 Alibaba、Made-in-China 与 Global Sources 的非完全同规格 65W GaN 壁插式充电器；公开单价约为 USD 5.20–10.70，页面所列 MOQ 约为 50–500 件。",
        "limits": "页面未一致包含或披露运费、税费、Incoterms、定制包装与认证主张的佐证。判断报价高低前，仍须逐项比对端口数、插头、协议、用料、认证证据、包装、保修、定制、数量与交付条件。",
        "sources": [
          {
            "label": "Alibaba · 100 件起",
            "href": "https://www.alibaba.com/product-detail/2025-GaN-Customizing-ETL-FCC-Certificated_1601213471100.html"
          },
          {
            "label": "Made-in-China · 500 件",
            "href": "https://langbone.en.made-in-china.com/"
          },
          {
            "label": "Global Sources · 50 件起",
            "href": "https://www.globalsources.com/manufacturers/330w-dc-usb-c-gan-charger.html?pageNum=282"
          }
        ]
      },
      "delivery": `${SERVICE_FACTS.t1.reportPages.join('–')} 页报告，包括风险评级、疑点清单与签约前追问清单。`,
      "notIncluded": "电话联系、现场工作、产能判断、质量检测，以及额外公司或型号。",
      "consent": "不需要",
      "fit": "首次接触中国供应商的海外买家；常见单笔采购金额 USD 5,000–30,000。",
      "fixed": {
        "index": "02",
        "label": "固定范围核查",
        "unit": "每个标准案件",
        "summary": "针对一家供应商、一个主要法律主体和一个充电或电源电子产品型号进行标准核查。",
        "notIncluded": "电话联系、现场工作、产能判断、质量检测，以及额外公司或型号。",
        "button": "购买 T1"
      }
    }
  },
  "t2": {
    "en": {
      "summary": "T1 plus ownership, litigation, address and manufacturer-versus-trader analysis.",
      "mode": "Remote",
      "upgrade": "Everything in T1, plus deeper corporate and public-record research.",
      "groups": [
        {
          "title": "Added at T2",
          "items": [
            "Classify the registered address as industrial, commercial or residential",
            "Related entities and ownership structure",
            "Litigation records in China Judgments Online",
            "Import and export record search",
            "Assess whether the supplier is a manufacturer or a trader presenting itself as one",
            "Compare claims across 1688, Alibaba and the supplier website with registered facts"
          ]
        }
      ],
      "notIncluded": "Direct supplier communication, site work, quality inspection or unrelated groups of companies and products.",
      "consent": "Not required",
      "fit": "Buyers who have selected a supplier but still question its authenticity; typical order value USD 30,000–100,000.",
      "fixed": {
        "index": "03",
        "label": "Fixed-scope due diligence",
        "unit": "per standard case",
        "summary": "T1 plus deeper corporate, address, litigation and manufacturer-versus-trader analysis.",
        "notIncluded": "Direct supplier communication, site work, quality inspection or unrelated groups of companies and products.",
        "button": "Purchase T2"
      }
    },
    "zh-tw": {
      "summary": "在 T1 基礎上，再查地址性質、股權、訴訟與真實製造身分。",
      "mode": "純遠端",
      "upgrade": "包含 T1 全部項目，再增加企業關係與公開紀錄的深度查核。",
      "groups": [
        {
          "title": "T2 新增項目",
          "items": [
            "判斷註冊地址屬於工業區、商業區或住宅",
            "關聯企業與股權結構",
            "裁判文書網可查的法律訴訟紀錄",
            "進出口紀錄查詢",
            "判斷對方是製造商，還是把自己包裝成製造商的貿易商",
            "比對 1688、阿里巴巴與官網說法是否符合登記事實"
          ]
        }
      ],
      "notIncluded": "直接聯絡供應商、現場工作、品質檢測，以及互不相關的多組公司或產品。",
      "consent": "不需要",
      "fit": "已鎖定供應商、但仍對其真實性存疑的買家；常見單筆採購金額 USD 30,000–100,000。",
      "fixed": {
        "index": "03",
        "label": "固定範圍盡調",
        "unit": "每件標準案件",
        "summary": "包含 T1，再增加企業關係、地址、訴訟與製造商／貿易商身分判讀。",
        "notIncluded": "直接聯絡供應商、現場工作、品質檢測，以及互不相關的多組公司或產品。",
        "button": "購買 T2"
      }
    },
    "zh-cn": {
      "summary": "在 T1 基础上，再查地址性质、股权、诉讼与真实制造身份。",
      "mode": "纯远程",
      "upgrade": "包括 T1 全部项目，再增加企业关系与公开记录的深度核查。",
      "groups": [
        {
          "title": "T2 新增项目",
          "items": [
            "判断注册地址属于工业区、商业区还是住宅",
            "关联企业与股权结构",
            "裁判文书网可查的法律诉讼记录",
            "进出口记录查询",
            "判断对方是制造商，还是把自己包装成制造商的贸易商",
            "比对 1688、阿里巴巴与官网说法是否符合登记事实"
          ]
        }
      ],
      "notIncluded": "直接联系供应商、现场工作、质量检测，以及互不相关的多组公司或产品。",
      "consent": "不需要",
      "fit": "已经锁定供应商、但仍对其真实性存疑的买家；常见单笔采购金额 USD 30,000–100,000。",
      "fixed": {
        "index": "03",
        "label": "固定范围尽调",
        "unit": "每个标准案件",
        "summary": "包括 T1，再增加企业关系、地址、诉讼与制造商／贸易商身份判断。",
        "notIncluded": "直接联系供应商、现场工作、质量检测，以及互不相关的多组公司或产品。",
        "button": "购买 T2"
      }
    }
  },
  "t3": {
    "en": {
      "title": "Verified Remote Interview",
      "summary": "T2 plus a structured interview and live video walkthrough.",
      "timing": "5–7 business days",
      "mode": "Remote + live video",
      "upgrade": "Everything in T2, plus direct, consent-based contact with the supplier.",
      "groups": [
        {
          "title": "Added at T3",
          "items": [
            "Structured telephone interview with the supplier contact",
            "Request a live video walkthrough of production lines, warehouse and samples",
            "Compare spoken statements with documents and public records"
          ]
        }
      ],
      "note": "If the supplier refuses video access or avoids a specific question, that fact is itself a verification result. It is recorded in the report and flagged as a risk item.",
      "notIncluded": "Physical site attendance, mass-production supervision or quality inspection.",
      "consent": "Written consent required",
      "fit": "Buyers preparing to sign who cannot travel to China; typical order value USD 50,000–200,000."
    },
    "zh-tw": {
      "title": "電話與視訊訪查",
      "summary": "在 T2 基礎上，直接訪談供應商並進行即時視訊看廠。",
      "timing": "5–7 個工作日",
      "mode": "遠端＋視訊",
      "upgrade": "包含 T2 全部項目，再增加供應商知情同意下的直接訪查。",
      "groups": [
        {
          "title": "T3 新增項目",
          "items": [
            "與供應商業務窗口進行結構化電話訪談",
            "要求視訊看廠，直播查看產線、倉庫與樣品",
            "核對供應商口頭陳述是否符合文件與公開資訊"
          ]
        }
      ],
      "note": "如果供應商拒絕配合視訊，或刻意迴避特定問題，這個反應本身就是查核結果；報告會如實記錄，並列為風險項。",
      "notIncluded": "實地到場、量產監督、品質檢驗。",
      "consent": "需要書面同意",
      "fit": "準備簽約、但無法親自到中國的買家；常見單筆採購金額 USD 50,000–200,000。"
    },
    "zh-cn": {
      "title": "电话与视频访查",
      "summary": "在 T2 基础上，直接访谈供应商并进行实时视频看厂。",
      "timing": "5–7 个工作日",
      "mode": "远程＋视频",
      "upgrade": "包括 T2 全部项目，再增加供应商知情同意下的直接访查。",
      "groups": [
        {
          "title": "T3 新增项目",
          "items": [
            "与供应商业务联系人进行结构化电话访谈",
            "要求视频看厂，直播查看产线、仓库与样品",
            "核对供应商口头陈述是否符合文件与公开信息"
          ]
        }
      ],
      "note": "如果供应商拒绝配合视频，或刻意回避特定问题，这个反应本身就是核查结果；报告会如实记录，并列为风险项。",
      "notIncluded": "实地到场、量产监督、质量检验。",
      "consent": "需要书面同意",
      "fit": "准备签约、但无法亲自到中国的买家；常见单笔采购金额 USD 50,000–200,000。"
    }
  },
  "t4": {
    "en": {
      "title": "On-Site Verification",
      "summary": "A verified remote interview, followed by one factory visit and charger-specific output checks.",
      "timing": "7–10 business days",
      "mode": "Remote + one site visit",
      "upgrade": "Includes the Verified Remote Interview scope and one agreed factory visit.",
      "groups": [
        {
          "title": "On-site verification",
          "items": [
            "Compare the registered address with the actual operating address",
            "Observe site size and equipment",
            "Check whether production lines are operating",
            "Estimate the number of staff present",
            "Inspect samples on site",
            "Create photographic and video records throughout the agreed visit"
          ]
        },
        {
          "title": "Charger-specific specification check",
          "items": [
            "Spot-check sample output wattage, interface specification and consistency with product markings"
          ]
        }
      ],
      "notIncluded": "Mass-production supervision, full quality inspection, shipment inspection or purchasing on the client’s behalf.",
      "consent": "Written consent required",
      "fit": "Buyers who need physical confirmation before signing; typical order value above USD 100,000."
    },
    "zh-tw": {
      "title": "單次實地查核",
      "summary": "在電話與視訊訪查的基礎上，到廠查核一次，並抽測充電產品的關鍵規格。",
      "timing": "7–10 個工作日",
      "mode": "遠端＋一次實地",
      "upgrade": "包含電話與視訊訪查的全部項目，再增加一次雙方同意的到廠查核。",
      "groups": [
        {
          "title": "到廠查核",
          "items": [
            "核對註冊地址與實際經營地址是否一致",
            "查看廠房規模與設備",
            "確認產線是否正在運轉",
            "概估現場員工人數",
            "現場檢視樣品",
            "依約定範圍全程拍照與影像存證"
          ]
        },
        {
          "title": "充電類專屬規格實測",
          "items": [
            "現場抽測樣品輸出瓦數、介面規格與產品標示是否一致"
          ]
        }
      ],
      "notIncluded": "量產監督、完整品質檢驗、驗貨、代客採購。",
      "consent": "需要書面同意",
      "fit": "簽約前需要實地確認的買家；常見單筆採購金額 USD 100,000 以上。"
    },
    "zh-cn": {
      "title": "单次实地核查",
      "summary": "在电话与视频访查的基础上，到厂核查一次，并抽测充电产品的关键规格。",
      "timing": "7–10 个工作日",
      "mode": "远程＋一次实地",
      "upgrade": "包括电话与视频访查的全部项目，再增加一次双方同意的到厂核查。",
      "groups": [
        {
          "title": "到厂核查",
          "items": [
            "核对注册地址与实际经营地址是否一致",
            "查看厂房规模与设备",
            "确认产线是否正在运行",
            "估算现场员工人数",
            "现场查看样品",
            "按约定范围全程拍照与影像存证"
          ]
        },
        {
          "title": "充电类专属规格实测",
          "items": [
            "现场抽测样品输出瓦数、接口规格与产品标示是否一致"
          ]
        }
      ],
      "notIncluded": "量产监督、完整质量检验、验货、代客采购。",
      "consent": "需要书面同意",
      "fit": "签约前需要实地确认的买家；常见单笔采购金额 USD 100,000 以上。"
    }
  },
  "t5": {
    "en": {
      "title": "Verification Advisor",
      "summary": "Ongoing verification, enhanced due diligence, remote interviews and supplier-file monitoring.",
      "timing": "One-month trial; three-month terms thereafter",
      "mode": "Ongoing retainer",
      "upgrade": "An ongoing relationship rather than a single delivery.",
      "groups": [
        {
          "title": "Monthly coverage",
          "items": [
            "Submit supplier names throughout the sourcing process and receive a T1–T2 standard response within three business days",
            "One verified remote interview each month",
            "Build and maintain tracking files for the buyer’s core long-term suppliers"
          ]
        }
      ],
      "notIncluded": "On-site verification, which is quoted separately; purchasing decisions; purchasing on the client’s behalf.",
      "consent": "Depends on the monthly task; written consent is required for supplier interviews",
      "fit": "Buyers opening new suppliers every month, teams monitoring more than ten suppliers, and cross-border ecommerce sourcing teams."
    },
    "zh-tw": {
      "title": "供應商查核顧問",
      "summary": "持續提供基礎查核、深度盡調及電話與視訊訪查，並替核心供應商建立追蹤檔案。",
      "timing": "首月可單月試用；第二個月起每期三個月",
      "mode": "月費顧問",
      "upgrade": "不是單次交付，而是一段持續協作關係。",
      "groups": [
        {
          "title": "每月服務內容",
          "items": [
            "採購過程中可隨時提交供應商名稱，依 T1–T2 標準在三個工作日內回覆",
            "每月包含一次電話與視訊深度訪查",
            "為長期合作的核心供應商建立並維護追蹤檔案"
          ]
        }
      ],
      "notIncluded": "實地查核（另行報價）、採購決策、代客採購。",
      "consent": "依當月工作內容而定；進行供應商訪查時需要書面同意",
      "fit": "每月都要開發新供應商的買家、手上有十家以上供應商要持續監控的買家，以及跨境電商採購團隊。"
    },
    "zh-cn": {
      "title": "供应商核查顾问",
      "summary": "持续提供基础核查、深度尽调及电话与视频访查，并为核心供应商建立跟踪档案。",
      "timing": "首月可单月试用；第二个月起每期三个月",
      "mode": "月费顾问",
      "upgrade": "不是单次交付，而是一段持续协作关系。",
      "groups": [
        {
          "title": "每月服务内容",
          "items": [
            "采购过程中可随时提交供应商名称，按 T1–T2 标准在三个工作日内回复",
            "每月包括一次电话与视频深度访查",
            "为长期合作的核心供应商建立并维护跟踪档案"
          ]
        }
      ],
      "notIncluded": "实地核查（另行报价）、采购决策、代客采购。",
      "consent": "按当月工作内容确定；进行供应商访查时需要书面同意",
      "fit": "每月都要开发新供应商的买家、手上有十家以上供应商需要持续监控的买家，以及跨境电商采购团队。"
    }
  },
  "t6": {
    "en": {
      "title": "Fully Managed Sourcing Verification",
      "summary": "On-site verification and an ongoing advisory engagement, coordinated across the sourcing process.",
      "timing": "4–8 weeks",
      "mode": "Project",
      "upgrade": "Combines On-Site Verification and Verification Advisor support across the purchasing workflow.",
      "groups": [
        {
          "title": "Managed verification workflow",
          "items": [
            "Screen a pool of candidate suppliers",
            "Lead supplier comparison during the RFQ process",
            "Complete final due diligence before contract terms are agreed",
            "Carry out a pre-production check after the order",
            "Arrange a pre-shipment check when required"
          ]
        }
      ],
      "notIncluded": "The client retains the purchasing decision and executes payment. ZimonAI acts as the buyer’s independent sourcing gatekeeper, not as a purchasing agent.",
      "consent": "Written consent required",
      "fit": "Large buyers, brands entering China sourcing for the first time, and clients that need the verification workflow managed end to end."
    },
    "zh-tw": {
      "title": "全託管採購把關",
      "summary": "整合實地查核與持續顧問服務，把查核放進整段採購流程。",
      "timing": "4–8 週",
      "mode": "專案制",
      "upgrade": "整合實地查核與供應商查核顧問服務，延伸到採購流程各階段。",
      "groups": [
        {
          "title": "全流程把關",
          "items": [
            "從候選供應商池進行篩選",
            "主導 RFQ 過程中的供應商比對",
            "在合約條款確定前完成最終盡調",
            "下單後進行量產前查核",
            "必要時安排裝運前查核"
          ]
        }
      ],
      "notIncluded": "採購決策與付款執行仍由客戶負責。ZimonAI 是買家的獨立採購把關人，不是採購代理。",
      "consent": "需要書面同意",
      "fit": "大型買家、第一次進入中國採購市場的品牌，以及需要把整套採購把關流程交由專人管理的客戶。"
    },
    "zh-cn": {
      "title": "全托管采购把关",
      "summary": "整合现场核查与持续顾问服务，把核查放进整个采购流程。",
      "timing": "4–8 周",
      "mode": "项目制",
      "upgrade": "整合现场核查与供应商核查顾问服务，延伸到采购流程各阶段。",
      "groups": [
        {
          "title": "全流程把关",
          "items": [
            "从候选供应商池进行筛选",
            "主导 RFQ 过程中的供应商比对",
            "在合同条款确定前完成最终尽调",
            "下单后进行量产前核查",
            "必要时安排装运前核查"
          ]
        }
      ],
      "notIncluded": "采购决策与付款执行仍由客户负责。ZimonAI 是买家的独立采购把关人，不是采购代理。",
      "consent": "需要书面同意",
      "fit": "大型买家、第一次进入中国采购市场的品牌，以及需要把整套采购把关流程交由专人管理的客户。"
    }
  }
};

function standardScope(id, locale) {
  const f = SERVICE_FACTS[id];
  const pages = SERVICE_FACTS.t1.reportPages.join('–');
  const wording = {
    en: {
      t1: [`${f.primaryEntities} supplier and ${f.primaryEntities} primary legal entity`, `${f.models} product model`, `Up to ${f.certificateClaims} certificate or authorisation claims`, 'Company-record and certificate cross-check', `A ${pages} page report with sources and limitations`],
      t2: ['Everything in the standard T1 scope', `${f.primaryEntities} primary supplier and up to ${f.relatedEntities} directly related entities`, 'Address, ownership and litigation review', 'Public import/export indicators where accessible', 'Manufacturer-versus-trader and public-claim comparison']
    },
    'zh-tw': {
      t1: [`${f.primaryEntities} 家供應商與 ${f.primaryEntities} 個主要法律主體`, `${f.models} 個產品完整型號`, `最多 ${f.certificateClaims} 項證書或認證主張`, '企業登記與證書交叉比對', `${pages} 頁報告，列出來源與限制`],
      t2: ['標準 T1 的全部內容', `${f.primaryEntities} 家主要供應商與最多 ${f.relatedEntities} 家直接關聯企業`, '地址、股權與訴訟紀錄查核', '公開可查的進出口線索', '製造商／貿易商身分與公開說法比對']
    },
    'zh-cn': {
      t1: [`${f.primaryEntities} 家供应商与 ${f.primaryEntities} 个主要法律主体`, `${f.models} 个产品完整型号`, `最多 ${f.certificateClaims} 项证书或认证主张`, '企业登记与证书交叉比对', `${pages} 页报告，列出来源与限制`],
      t2: ['标准 T1 的全部内容', `${f.primaryEntities} 家主要供应商与最多 ${f.relatedEntities} 家直接关联企业`, '地址、股权与诉讼记录核查', '公开可查的进出口线索', '制造商／贸易商身份与公开说法比对']
    }
  };
  return wording[locale][id];
}

export function localizedServices(locale) {
  return Object.entries(serviceCopy).map(([id, translations]) => {
    const copy = translations[locale];
    const fixed = copy.fixed ? { ...copy.fixed, includes: standardScope(id, locale) } : undefined;
    return { ...copy, ...(fixed ? { fixed } : {}), id, label: id.toUpperCase(), title: id === 't1' || id === 't2' ? serviceName(id, locale) : copy.title, englishTitle: id === 't1' || id === 't2' ? serviceName(id) : translations.en.title, price: servicePrice(id, locale), timing: serviceTiming(id, locale) || copy.timing, purchasable: id === 't1' || id === 't2' };
  });
}

export function fixedServiceProduct(id, locale) {
  const service = localizedServices(locale).find(item => item.id === id);
  return { ...service.fixed, key: id, title: `${service.label} · ${service.title}`, price: service.price, timing: service.timing };
}
