-- LinkedIn review posts use post_type "review".
UPDATE public.assistant_instruction_sets
SET
  post_type = 'review',
  updated_at = now()
WHERE
  name = 'LinkedIn Review Posts — Clinicians';
