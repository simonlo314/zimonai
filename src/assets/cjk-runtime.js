import { cjkProtectedTerms } from './cjk-terms.js';

const hanPattern = /\p{Script=Han}/u;
const skipSelector = 'code, noscript, option, pre, script, style, svg, template, textarea, .cjk-keep';
const ordinalPattern = '第[一二三四五六七八九十百千兩两0-9０-９]+(?:層|层|步|項|项|次|種|种|章|頁|页|類|类|階段|阶段|天|週|周|年|個|个|批|款|部分|條|条|點|点)';
const quantityNumberPattern = '(?:[零〇一二三四五六七八九十百千萬万億亿兩两]+|[0-9０-９]+(?:[,.，．][0-9０-９]+)*)';
const quantityPattern = `(?:${quantityNumberPattern}\\s*(?:–|-|—|~|～|至|到)\\s*)?${quantityNumberPattern}\\s*(?:小時|小时|分鐘|分钟|位數|位数|美元|個|个|項|项|款|件|批|家|種|种|天|日|週|周|年|月|時|时|位|頁|页|篇|次|套|組|组|份|張|张|層|层|樓|楼|號|号|步|條|条|點|点)`;
const demonstrativeQuantityPattern = `(?:這|这|該|该|每|各|本)(?:${quantityNumberPattern}\\s*)?(?:個|个|款|篇|項|项|張|张|家|筆|笔|件|批|份|種|种|層|层|步|條|条|頁|页|次|套|組|组|位|年|月|日|週|周)`;
const trailingPunctuationPattern = '[，。；：！？、）」』】》〉,.!?;:]';
const folioPattern = '\\p{Script=Han}{1,10}\\s*[·•]\\s*[0-9０-９]+';
const patterns = new Map();
const segmenters = new Map();
const singleHanPattern = /^\p{Script=Han}$/u;
const singleWordBoundaries = new Set([...'與与和及或並并且是在由的了把被將将會会可要就才已未不也都更仍又後后前中為为向跟則则而但每各這这該该其若如因讓让能需應应']);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function localeFor(node) {
  const lang = node.parentElement?.closest('[lang]')?.getAttribute('lang')?.toLowerCase()
    || document.documentElement.lang.toLowerCase();
  return lang === 'zh-hans' || lang === 'zh-cn' ? 'zh-cn' : 'zh-tw';
}

function patternFor(locale) {
  if (!patterns.has(locale)) {
    const alternatives = cjkProtectedTerms[locale].map(escapeRegExp).join('|');
    patterns.set(locale, new RegExp(`(?:${folioPattern}|${alternatives}|${ordinalPattern}|${quantityPattern}|${demonstrativeQuantityPattern})(?:${trailingPunctuationPattern})*`, 'gu'));
  }
  return patterns.get(locale);
}

function segmenterFor(locale) {
  if (!segmenters.has(locale)) {
    segmenters.set(locale, new Intl.Segmenter(locale === 'zh-tw' ? 'zh-Hant' : 'zh-Hans', { granularity: 'word' }));
  }
  return segmenters.get(locale);
}

function segmentedParts(value, locale) {
  const segments = [...segmenterFor(locale).segment(value)];
  const parts = [];
  let singleHanRun = '';
  const flushSingleHanRun = () => {
    if (!singleHanRun) return;
    parts.push({ text: singleHanRun, kind: [...singleHanRun].length > 1 ? 'word' : '' });
    singleHanRun = '';
  };
  for (let index = 0; index < segments.length; index += 1) {
    const part = segments[index];
    if (part.isWordLike && singleHanPattern.test(part.segment) && !singleWordBoundaries.has(part.segment)) {
      singleHanRun += part.segment;
      continue;
    }
    flushSingleHanRun();
    const isWord = part.isWordLike && [...part.segment].length > 1 && hanPattern.test(part.segment);
    let protectedValue = part.segment;
    if (isWord) {
      while (new RegExp(`^${trailingPunctuationPattern}$`, 'u').test(segments[index + 1]?.segment || '')) {
        protectedValue += segments[index + 1].segment;
        index += 1;
      }
    }
    parts.push({ text: protectedValue, kind: isWord ? 'word' : '' });
  }
  flushSingleHanRun();
  return parts;
}

function protectedParts(value, locale) {
  const pattern = patternFor(locale);
  const parts = [];
  let cursor = 0;
  for (const match of value.matchAll(pattern)) {
    parts.push(...segmentedParts(value.slice(cursor, match.index), locale));
    parts.push({ text: match[0], kind: 'phrase' });
    cursor = match.index + match[0].length;
  }
  parts.push(...segmentedParts(value.slice(cursor), locale));
  return parts;
}

function protectTextNode(node) {
  const parent = node.parentElement;
  if (!parent || parent.closest(skipSelector) || !node.data.trim()) return;
  const locale = localeFor(node);
  const terms = cjkProtectedTerms[locale] || [];
  if (!hanPattern.test(node.data) && !terms.some((term) => node.data.includes(term))) return;

  const trimmed = node.data.trim();
  const wholeControl = (parent.localName === 'button' || parent.localName === 'a') && hanPattern.test(trimmed) && [...trimmed].length <= 12;
  const parts = wholeControl ? [{ text: node.data, kind: 'control' }] : protectedParts(node.data, locale);
  if (!parts.some((part) => part.kind)) return;

  const fragment = document.createDocumentFragment();
  for (const part of parts) {
    if (!part.text) continue;
    if (!part.kind) {
      fragment.append(document.createTextNode(part.text));
      continue;
    }
    const span = document.createElement('span');
    span.className = `cjk-keep cjk-keep--${part.kind}`;
    span.textContent = part.text;
    fragment.append(span);
  }
  node.replaceWith(fragment);
}

function protectRoot(root) {
  const nodes = [];
  if (root.nodeType === Node.TEXT_NODE) nodes.push(root);
  if (root.nodeType === Node.ELEMENT_NODE && !root.matches(skipSelector)) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) nodes.push(walker.currentNode);
  }
  for (const node of nodes) protectTextNode(node);
}

export function observeDynamicCjkText() {
  if (document.documentElement.dataset.layout !== 'cjk' || !document.body) return null;
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'characterData') protectTextNode(record.target);
      for (const node of record.addedNodes || []) protectRoot(node);
    }
  });
  observer.observe(document.body, { childList: true, characterData: true, subtree: true });
  return observer;
}
