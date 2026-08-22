# ZimonAI Stripe launch checklist

The website never stores a Stripe password or secret key in public source code. Configure these values only in Cloudflare's encrypted secret settings:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Before the first test payment

1. Keep Stripe in test mode.
2. Add the test-mode secret key to the Cloudflare Pages project as `STRIPE_SECRET_KEY`.
3. Apply `migrations/0002_payments.sql`, then `migrations/0003_payment_customer_details.sql`, to the existing `ANALYTICS_DB` database.
4. Create a Stripe webhook endpoint for `https://zimonai.com/api/stripe-webhook`.
5. Subscribe it to Checkout completion, delayed-payment success or failure, Checkout expiration, and `charge.refunded` events.
6. Store the webhook signing secret as `STRIPE_WEBHOOK_SECRET`.
7. Deploy a preview and complete one test payment for each public product type before enabling live mode.

## Launch gate

Do not enable live payments until all of the following are true:

- The displayed price and Stripe Checkout total match.
- Successful payments return to the correct language version of the confirmation page.
- A paid order appears once in `payment_orders`, even if Stripe retries the webhook.
- A fully refunded portal-owned Charge updates the same `portal_orders` and `payment_orders` rows to `refunded`; partial, mismatched, ambiguous or unlinked refunds never guess an owner or overwrite a full-order state.
- Partial refunds are a hard NO-GO for this release: do not issue one in Stripe. If a partial refund is required, stop and approve a manual reconciliation plan first; the webhook records the event as rejected and deliberately leaves both order states unchanged.
- T1, T2 and consultation collect a required individual name and phone number, an optional business name and optional tax ID. Balance and consultation-extension payments only add the required individual name to the receipt email already collected by Checkout.
- T1 and T2 show the correct intake fields.
- Consultation shows scheduling fields.
- Service balance payments require a case, quote or reason reference.
- Cancellation returns to the payment page without creating a paid order.
- Payment, rescheduling, refund, privacy and delivery wording has been approved by ZimonAI.
