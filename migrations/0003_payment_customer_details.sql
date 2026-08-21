ALTER TABLE payment_orders
  ADD COLUMN customer_business_name TEXT NOT NULL DEFAULT '';

ALTER TABLE payment_orders
  ADD COLUMN customer_phone TEXT NOT NULL DEFAULT '';

ALTER TABLE payment_orders
  ADD COLUMN customer_tax_ids TEXT NOT NULL DEFAULT '';
