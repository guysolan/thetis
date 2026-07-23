-- Saved settings support multiple platforms per template.
ALTER TABLE public.assistant_instruction_sets
  ADD COLUMN IF NOT EXISTS platforms text[] NOT NULL DEFAULT '{}';

UPDATE public.assistant_instruction_sets
SET platforms = ARRAY[platform]
WHERE platform IS NOT NULL
  AND platforms = '{}';

ALTER TABLE public.assistant_instruction_sets
  DROP COLUMN IF EXISTS platform;

ALTER TABLE public.assistant_instruction_sets
  DROP CONSTRAINT IF EXISTS assistant_instruction_sets_name_platform_post_type_mode_key;

ALTER TABLE public.assistant_instruction_sets
  ADD CONSTRAINT assistant_instruction_sets_name_key UNIQUE (name);

ALTER TABLE public.assistant_instruction_sets
  ADD CONSTRAINT assistant_instruction_sets_platforms_check CHECK (platforms <@ ARRAY['linkedin', 'instagram', 'facebook']::text[]);

DROP INDEX IF EXISTS assistant_instruction_sets_lookup_idx;

CREATE INDEX IF NOT EXISTS assistant_instruction_sets_post_type_idx ON public.assistant_instruction_sets(post_type);
