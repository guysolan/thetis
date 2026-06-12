-- Knowledge base for AI assistants: pgvector storage for content chunks
-- extracted from apps/course, apps/website, apps/achilles-rupture by
-- packages/knowledge-corpus.
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS public.knowledge_chunks(
  id text PRIMARY KEY,
  content text NOT NULL,
  content_hash text NOT NULL,
  embedding extensions.vector(1536),
  source_path text NOT NULL,
  content_type text NOT NULL,
  condition text NOT NULL,
  canonical boolean NOT NULL DEFAULT TRUE,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Service-role only: synced from the repo, queried via Edge Functions.
ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;

-- Authenticated users may read (the internal chat app retrieves sources).
CREATE POLICY "knowledge_chunks_read_authenticated" ON public.knowledge_chunks
  FOR SELECT TO authenticated
    USING (TRUE);

CREATE INDEX IF NOT EXISTS knowledge_chunks_embedding_idx ON public.knowledge_chunks USING hnsw(embedding extensions.vector_cosine_ops);

CREATE INDEX IF NOT EXISTS knowledge_chunks_content_type_idx ON public.knowledge_chunks(content_type);

CREATE INDEX IF NOT EXISTS knowledge_chunks_condition_idx ON public.knowledge_chunks(condition);

-- Similarity search with optional metadata filters.
CREATE OR REPLACE FUNCTION public.match_knowledge_chunks(query_embedding extensions.vector(1536), match_count int DEFAULT 12, filter_condition text DEFAULT NULL, filter_content_types text[] DEFAULT NULL, filter_canonical boolean DEFAULT NULL)
  RETURNS TABLE(
    id text,
    content text,
    source_path text,
    content_type text,
    condition text,
    canonical boolean,
    metadata jsonb,
    similarity float)
  LANGUAGE sql
  STABLE
  AS $$
  SELECT
    kc.id,
    kc.content,
    kc.source_path,
    kc.content_type,
    kc.condition,
    kc.canonical,
    kc.metadata,
    1 -(kc.embedding <=> query_embedding) AS similarity
  FROM
    public.knowledge_chunks kc
  WHERE
    kc.embedding IS NOT NULL
    AND kc.content_type != 'rule'
    AND(filter_condition IS NULL
      OR kc.condition = filter_condition)
    AND(filter_content_types IS NULL
      OR kc.content_type = ANY(filter_content_types))
    AND(filter_canonical IS NULL
      OR kc.canonical = filter_canonical)
  ORDER BY
    kc.embedding <=> query_embedding
  LIMIT match_count;
$$;

