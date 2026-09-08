import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { adminContent } from '../src/admin-content.mjs';

const source = readFileSync(new URL('../src/assets/admin.js', import.meta.url), 'utf8');
const start = source.indexOf('  function orderUpdate(item) {');
const end = source.indexOf('  function caseCard(', start);
assert.ok(start >= 0 && end > start);
const orderUpdateSource = source.slice(start, end);

// Execute the real submit handler with a minimal DOM adapter and a fake API.
// This tests state synchronization, not browser layout or rendering.
for (const locale of ['en', 'zh-tw', 'zh-cn']) {
  test(`admin order save uses the authoritative payment result in ${locale}`, async () => {
    const copy = adminContent[locale];
    const controls = new Map();
    const nodes = [];
    const status = { textContent: copy.paymentStatus.paid };
    const record = { querySelector: () => status };
    const element = (tag, className, textContent) => {
      const node = {
        tag, className, textContent, children: [], listeners: {},
        append(...children) { this.children.push(...children); },
        addEventListener(type, handler) { this.listeners[type] = handler; },
        closest() { return record; },
        querySelector(selector) {
          return controls.get(selector.match(/name="([^"]+)"/)?.[1]);
        }
      };
      nodes.push(node);
      return node;
    };
    const selectField = (_label, name, _choices, current) => {
      const control = { value: current, disabled: false };
      controls.set(name, control);
      return { querySelector: () => control };
    };
    const caches = { orders: ['stale cached order'] };
    const calls = [];
    const item = { id: 'ord_ui12345678', source: 'stripe', paymentStatus: 'paid', fulfillmentStatus: 'awaiting_intake' };
    const update = runInNewContext(`(${orderUpdateSource})`, {
      copy, caches, element, selectField,
      actionDetails: () => element('details'),
      textareaField: () => element('textarea'),
      feedbackNode: () => element('div', 'feedback'),
      setFeedback(node, message) { node.textContent = message; },
      FormData: class {
        get(name) { return { fulfillmentStatus: 'reviewing', paymentMethodNote: 'Operations note' }[name]; }
      },
      async api(path, options) {
        calls.push({ path, method: options.method, payload: JSON.parse(options.body) });
        return { order: { id: item.id, paymentStatus: 'refunded', fulfillmentStatus: 'reviewing', paidAt: '2026-09-08T00:00:00.000Z' } };
      }
    });
    update(item);
    assert.equal(controls.get('paymentStatus').disabled, true);
    await nodes.find((node) => node.tag === 'form').listeners.submit({ preventDefault() {} });
    assert.deepEqual(calls, [{
      path: `/api/admin/orders/${item.id}`, method: 'PATCH',
      payload: { fulfillmentStatus: 'reviewing', paymentMethodNote: 'Operations note' }
    }]);
    assert.equal(item.paymentStatus, 'refunded');
    assert.equal(item.fulfillmentStatus, 'reviewing');
    assert.equal(item.paidAt, '2026-09-08T00:00:00.000Z');
    assert.equal(status.textContent, copy.paymentStatus.refunded);
    assert.equal(controls.get('paymentStatus').value, 'refunded');
    assert.equal(controls.get('fulfillmentStatus').value, 'reviewing');
    assert.equal(caches.orders, null);
    assert.equal(nodes.find((node) => node.className === 'feedback').textContent, copy.actions.orderSaved);
    assert.equal(nodes.find((node) => node.tag === 'button').disabled, false);
  });
}
