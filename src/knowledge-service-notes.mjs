// Opt in per article and locale: news stories and other translations stay editorial-only in the body.
export const serviceNotes = {
  indiaBisCrsAdapterRegistration: {
    en: {
      title: 'Does the supplier’s BIS number cover your adapter?',
      body: 'We check whether the full model on your quotation appears in the BIS record for the R-number you provide. If the factory address differs from the one your supplier gave you, we flag it. We review the documents; we do not register products.',
      action: 'Ask about my BIS record'
    },
    'zh-tw': {
      title: '用這個 R 號，查得到報價單上的型號嗎？',
      body: '我們會用你提供的 R 號查 BIS 登錄資料，核對報價單上的完整型號。若登錄的工廠地址和供應商給你的地址不同，也會列出差異。這項服務不包含代辦註冊。',
      action: '詢問這筆 BIS 登錄'
    }
  },
  euCommonChargerRules: {
    en: {
      title: 'Which product does your supplier’s declaration cover?',
      body: 'We compare the model on the EU Declaration of Conformity with the device or charger on your quotation. If the paperwork covers the device but says nothing about the bundled charger, we flag that gap. We do not test USB Power Delivery or grant market approval.',
      action: 'Discuss my USB-C documents'
    },
    'zh-tw': {
      title: '符合性聲明寫的是裝置，還是隨附的充電器？',
      body: '我們會把歐盟符合性聲明上的型號，和報價單裡的裝置或充電器逐項比對。若聲明只列裝置，沒有列出充電器，我們會指出還缺哪份佐證。這不是 USB PD 實測，也不是上市核准。',
      action: '詢問這份 USB-C 產品文件'
    }
  },
  ieceeCbCertificate: {
    en: {
      title: 'Is the charger on your quote the one on the CB certificate?',
      body: 'We compare the certificate number, model suffix and electrical ratings with the quotation and nameplate. You get a record of what matches and what still needs evidence. This does not certify the shipment or establish approval in the destination country.',
      action: 'Ask about my CB certificate'
    },
    'zh-tw': {
      title: 'CB 證書上列的，是你要買的那款充電器嗎？',
      body: '我們會核對證書編號，再比對報價單、銘牌和證書上的型號尾碼與額定電壓、電流。你會知道哪些資料一致、哪些仍需補證。這不等於驗過整批貨，也不代表產品已獲當地核准。',
      action: '詢問這張 CB 證書'
    }
  }
};

export const serviceNoteLabels = {
  en: { scope: 'See what a T1 review covers', jump: 'What we can check for you' },
  'zh-tw': { scope: '查看 T1 查核範圍', jump: '我們能幫你核對什麼？' }
};
