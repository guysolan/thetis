# @thetis/knowledge-corpus

Extracts all clinical/educational content from the monorepo, chunks it, embeds it, and syncs it to Supabase pgvector. This is the shared knowledge base behind the AI assistants (accuracy checker, social generator, future patient chat).

## Sources (canonical)

| Source | Content |
|--------|---------|
| `apps/course/src/content/course/` | 61 TSX lessons (Achilles rupture + plantar fasciitis) |
| `apps/website/src/content/guide/` | Week/stage guides |
| `apps/website/src/content/blog/` + `articles/recovery-phases/` | Published articles |
| `apps/website/src/sections/FAQs/` + `content/FAQs/` | FAQ Q&A pairs (English) |
| `apps/website/src/components/research/` | Evidence data with DOIs |
| `apps/achilles-rupture/src/content/articles/` | Educational articles |
| `.cursor/rules/*.mdc` | Clinical positions + content guidelines (stored as `rule` type, always injected into prompts — never retrieved by similarity) |

Social/marketing content (`services/notion/`, `packages/linkedin/`) is deliberately **excluded** — it is derived from these sources, not a source of truth.

## Commands

```bash
bun run stats     # extraction summary, no writes
bun run extract   # write corpus.json for inspection
bun run sync      # embed changed chunks + upsert to Supabase
```

`sync` is incremental: chunks are hashed, and only new/changed chunks are embedded (OpenAI `text-embedding-3-small`). Stale chunks are deleted. Re-run after editing content.

## Setup

`sync` auto-loads credentials in this order:

1. `packages/knowledge-corpus/.env` (optional overrides)
2. `services/thetis/.env.prod` — needs `OPENAI_API_KEY` and `SUPABASE_PROJECT_ID`
3. Supabase CLI — derives `SUPABASE_URL` from project ref and fetches `service_role` key if logged in (`supabase login`)

So with `.env.prod` already configured, you can usually just run:

```bash
pnpm knowledge:sync
```

The `knowledge_chunks` table and `match_knowledge_chunks` function are created by the migration in `services/thetis/supabase/migrations/`.
