import { cjkProtectedTerms } from './cjk-terms.js';
import {
  datePattern,
  demonstrativeQuantityPattern,
  folioPattern,
  ordinalPattern,
  quantityPattern,
  technicalMeasurementPattern,
  trailingPunctuationPattern
} from './cjk-patterns.js';

const hanPattern = /\p{Script=Han}/u;
const skipSelector = 'code, noscript, option, pre, script, style, svg, template, textarea, .cjk-keep';
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
    patterns.set(locale, new RegExp(`(?:${folioPattern}|${alternatives}|${technicalMeasurementPattern}|${datePattern}|${ordinalPattern}|${quantityPattern}|${demonstrativeQuantityPattern})(?:${trailingPunctuationPattern})*`, 'gu'));
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
  const hasTechnicalMeasurement = new RegExp(technicalMeasurementPattern, 'u').test(node.data);
  if (!hanPattern.test(node.data) && !terms.some((term) => node.data.includes(term)) && !hasTechnicalMeasurement) return;

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
