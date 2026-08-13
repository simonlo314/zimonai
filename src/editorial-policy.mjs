export const editorialPolicy = {
  en: {
    writingMode: 'native-English',
    displayStyle: 'editorial-serif',
    bodyMeasure: 72
  },
  'zh-tw': {
    writingMode: 'native-Traditional-Chinese',
    displayStyle: 'cjk-editorial',
    bodyMeasure: 34,
    rules: [
      '先用繁體中文重新組織意思，不以英文句型逐字翻譯。',
      '優先使用台灣讀者自然理解的用語，例如「查核」、「資料吻合」、「現場確認」。',
      '標題短而具體；段落一次只處理一個意思。'
    ]
  },
  'zh-cn': {
    writingMode: 'native-Simplified-Chinese',
    displayStyle: 'cjk-editorial',
    bodyMeasure: 34,
    rules: [
      '先按简体中文读者的阅读逻辑重写，不由繁体文本机械转字。',
      '少用抽象名词和翻译腔，优先说明买家要交什么、我们查什么、最后拿到什么。',
      '标题简短明确；段落一次只表达一个重点。'
    ]
  }
};

export function layoutMode(langKey) {
  return langKey === 'en' ? 'latin' : 'cjk';
}
