import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { adminContent } from '../src/admin-content.mjs';
import { paymentContent } from '../src/payment-content.mjs';
import { portalContent } from '../src/portal-content.mjs';

function contentKeys(value, prefix = '') {
  return Object.entries(value || {}).flatMap(([key, nested]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(nested) || !nested || typeof nested !== 'object') return [path];
    return contentKeys(nested, path);
  }).sort();
}

test('checkout asks anonymous visitors to sign in before validating final consent', () => {
  const source = readFileSync(new URL('../src/assets/site.js', import.meta.url), 'utf8');
  const handlerStart = source.indexOf('checkoutForms.forEach');
  const handlerEnd = source.indexOf('const paymentResult', handlerStart);
  const handler = source.slice(handlerStart, handlerEnd);
  const sessionCheck = handler.indexOf("fetch('/api/portal/me'");
  const finalValidation = handler.indexOf('form.checkValidity()');
  assert.ok(sessionCheck >= 0, 'checkout must check the signed-in session');
  assert.ok(finalValidation > sessionCheck, 'final form consent must be checked only after sign-in is confirmed');

  const intentStart = source.indexOf('function safeCheckoutIntent');
  const intentEnd = source.indexOf('function readCheckoutIntent', intentStart);
  const intentContract = source.slice(intentStart, intentEnd);
  assert.doesNotMatch(intentContract, /terms|consent/i, 'purchase intent must never save terms consent');

  const resumeStart = source.indexOf('if (resumedPaymentItem)');
  const resumeEnd = source.indexOf('checkoutForms.forEach', resumeStart);
  assert.doesNotMatch(source.slice(resumeStart, resumeEnd), /create-checkout-session/, 'returning from sign-in must not start checkout automatically');
});

test('portal order and linked-email guidance matches the account workflow in all three languages', () => {
  assert.equal(portalContent.en.workspace.ordersEmptyTitle, 'Orders linked to this account will appear here when they are recorded, with their current payment status.');
  assert.equal(portalContent['zh-tw'].workspace.ordersEmptyTitle, '與這個帳戶相連的訂單建立後，就會顯示在這裡，並標示目前的付款狀態。');
  assert.equal(portalContent['zh-cn'].workspace.ordersEmptyTitle, '与该账户关联的订单创建后会显示在这里，并标明当前付款状态。');
  assert.equal(portalContent.en.auth.errorEmailLinkRequired, 'This email address is already linked to an existing account. Sign in with an email verification code instead.');
  assert.equal(portalContent['zh-tw'].auth.errorEmailLinkRequired, '這個 Email 已連結至既有帳戶，請改用 Email 驗證碼登入。');
  assert.equal(portalContent['zh-cn'].auth.errorEmailLinkRequired, '这个邮箱已关联现有账户，请改用邮箱验证码登录。');
});

test('admin notifications describe provider acceptance rather than inbox delivery', () => {
  assert.match(adminContent.en.views.notifications.lead, /does not prove inbox delivery/);
  assert.equal(adminContent.en.notificationStatus.sent, 'Accepted by mail provider');
  assert.equal(adminContent['zh-tw'].notificationStatus.sent, '已交寄件服務');
  assert.equal(adminContent['zh-cn'].notificationStatus.sent, '已提交邮件服务');
  assert.equal(adminContent['zh-tw'].fields.sentAt, '交寄時間');
  assert.equal(adminContent['zh-cn'].fields.sentAt, '提交时间');
  assert.match(adminContent.en.form.lead, /records and attempts the invitation/);
  assert.match(adminContent['zh-tw'].form.lead, /建立通知並嘗試寄送/);
  assert.match(adminContent['zh-cn'].form.lead, /创建通知并尝试发送/);
  assert.doesNotMatch(adminContent.en.views.notifications.lead, /actual delivery status/i);
  assert.doesNotMatch(adminContent['zh-tw'].views.notifications.lead, /實際寄送狀態/);
  assert.doesNotMatch(adminContent['zh-cn'].views.notifications.lead, /实际发送状态/);
});

test('payment guidance uses natural Chinese intake and balance wording', () => {
  const traditional = paymentContent['zh-tw'].payments;
  const simplified = paymentContent['zh-cn'].payments;
  assert.match(traditional.lead, /需視供應商配合、差旅與現場執行條件另行報價/);
  assert.match(traditional.catalog.lead, /^展開服務項目/);
  assert.equal(traditional.process.steps[1][0], '提交資料');
  assert.equal(traditional.products.find((item) => item.key === 'balance').timing, '依案件或付款用途核對入帳');
  assert.match(simplified.lead, /需根据供应商配合、差旅与现场执行条件另行报价/);
  assert.match(simplified.catalog.lead, /^展开服务详情/);
  assert.equal(simplified.process.steps[1][0], '提交资料');
  assert.equal(simplified.products.find((item) => item.key === 'balance').timing, '按项目或付款用途核对入账');
  assert.doesNotMatch(JSON.stringify(traditional), /接觸深度|服務檔案|付款會開啟資料收件|完成收件|計入所填寫的案件/);
  assert.doesNotMatch(JSON.stringify(simplified), /接触深度|服务档案|付款会开启资料收件|完成收件|计入所填写的案件/);
});

test('portal, admin and payment copy keep the same key topology across languages', () => {
  for (const content of [portalContent, adminContent, paymentContent]) {
    const english = contentKeys(content.en);
    assert.deepEqual(contentKeys(content['zh-tw']), english);
    assert.deepEqual(contentKeys(content['zh-cn']), english);
  }
});

test('client and operations workspaces expose safe progress and reversible order controls', () => {
  const portalSource = readFileSync(new URL('../src/assets/portal.js', import.meta.url), 'utf8');
  const adminSource = readFileSync(new URL('../src/assets/admin.js', import.meta.url), 'utf8');
  const caseApiSource = readFileSync(new URL('../functions/api/portal/cases.js', import.meta.url), 'utf8');
  const templateSource = readFileSync(new URL('../src/template.mjs', import.meta.url), 'utf8');

  assert.match(caseApiSource, /client_status_note/);
  assert.match(caseApiSource, /report_published_at/);
  assert.match(portalSource, /item\.clientStatusNote/);
  assert.match(portalSource, /item\.expectedDeliveryAt/);
  assert.match(portalSource, /item\.reportUrl/);
  assert.doesNotMatch(portalSource, /internalNote/, 'client JavaScript must never render the internal note');

  assert.match(portalSource, /\?includeHidden=1/);
  assert.match(portalSource, /JSON\.stringify\(\{ action \}\)/);
  assert.match(adminSource, /\?includeArchived=1/);
  assert.match(adminSource, /data-admin-toggle-archived-cases/);
  assert.match(adminSource, /copy\.actions\.archiveCase/);
  assert.match(adminSource, /copy\.actions\.unarchiveCase/);
  assert.match(adminSource, /copy\.actions\.productOptions/);
  assert.match(adminSource, /tierLabels\[item\.tier \|\| 'unsure'\]/);
  assert.match(templateSource, /zimonai-shield-icon-mono-white-transparent\.svg/);
  assert.match(templateSource, /a\.siteAction/);
  assert.match(templateSource, /data-admin-toggle-archived/);
  assert.match(templateSource, /data-admin-toggle-archived-cases/);
});
