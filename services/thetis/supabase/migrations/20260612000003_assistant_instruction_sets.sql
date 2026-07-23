-- Saved prompt instructions per platform and post type for the internal chat app.
CREATE TABLE IF NOT EXISTS public.assistant_instruction_sets(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  platform text CHECK (platform IS NULL OR platform IN ('linkedin', 'instagram', 'facebook')),
  post_type text NOT NULL,
  mode text NOT NULL DEFAULT 'generate' CHECK (mode IN ('generate', 'check', 'both')),
  instructions text NOT NULL DEFAULT '',
  is_default boolean NOT NULL DEFAULT FALSE,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (name, platform, post_type, mode)
);

CREATE INDEX IF NOT EXISTS assistant_instruction_sets_lookup_idx ON public.assistant_instruction_sets(mode, platform, post_type);

ALTER TABLE public.assistant_instruction_sets ENABLE ROW LEVEL SECURITY;

-- Internal tool: any authenticated user can manage shared instruction sets.
CREATE POLICY "assistant_instruction_sets_select" ON public.assistant_instruction_sets
  FOR SELECT TO authenticated
    USING (TRUE);

CREATE POLICY "assistant_instruction_sets_insert" ON public.assistant_instruction_sets
  FOR INSERT TO authenticated
    WITH CHECK (created_by = auth.uid());

CREATE POLICY "assistant_instruction_sets_update" ON public.assistant_instruction_sets
  FOR UPDATE TO authenticated
    USING (TRUE)
    WITH CHECK (TRUE);

CREATE POLICY "assistant_instruction_sets_delete" ON public.assistant_instruction_sets
  FOR DELETE TO authenticated
    USING (TRUE);
