-- Additive only: old inquiries remain explicitly unclassified.
-- Case tiers, orders and historical descriptions are not rewritten.
ALTER TABLE public_inquiries ADD COLUMN service_group TEXT NOT NULL DEFAULT 'unsure'
  CHECK (service_group IN ('unsure', 't1', 't2', 'advanced'));
ALTER TABLE public_inquiries ADD COLUMN service_interest TEXT NOT NULL DEFAULT 'unsure'
  CHECK (service_interest IN ('unsure', 't3', 't4', 't5', 't6')
    AND (service_interest = 'unsure' OR service_group = 'advanced'));
