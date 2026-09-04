export const ordinalPattern = '第\\s*[一二三四五六七八九十百千兩两0-9０-９]+\\s*(?:層|层|步|項|项|次|種|种|章|頁|页|類|类|階段|阶段|天|週|周|年|個|个|批|款|部分|條|条|點|点|道)';
export const quantityNumberPattern = '(?:[零〇一二三四五六七八九十百千萬万億亿兩两]+|[0-9０-９]+(?:[,.，．][0-9０-９]+)*)';
export const quantityPattern = `(?:${quantityNumberPattern}\\s*(?:–|-|—|~|～|至|到)\\s*)?${quantityNumberPattern}\\s*(?:小時|小时|分鐘|分钟|位數|位数|美元|個|个|項|项|款|件|批|家|種|种|天|日|週|周|年|月|時|时|位|頁|页|篇|次|套|組|组|份|張|张|層|层|樓|楼|號|号|步|條|条|點|点)`;
export const demonstrativeQuantityPattern = `(?:下一|這|这|該|该|每|各|本|另)(?:${quantityNumberPattern}\\s*)?(?:個|个|款|篇|項|项|張|张|家|筆|笔|件|批|份|種|种|層|层|步|條|条|頁|页|次|套|組|组|位|台|道|年|月|日|週|周)`;
export const technicalMeasurementPattern = '[0-9０-９]+(?:[,.，．][0-9０-９]+)*\\s*(?:%\\s*w\\/w|mAh|Ah|kWh|Wh|mW|kW|W|mV|V|A|Hz|MHz|GHz|Gbps|Mbps|°C|%)';
export const datePattern = '[0-9０-９]{1,2}\\s*月\\s*[0-9０-９]{1,2}\\s*日';
export const trailingPunctuationPattern = '[，。；：！？、）」』】》〉,.!?;:]';
export const folioPattern = '\\p{Script=Han}{1,10}\\s*[·•]\\s*[0-9０-９]+';
