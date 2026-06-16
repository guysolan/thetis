# @thetis/chat

Internal AI assistants app — deployed to chat.thetismedical.com. Mirrors the ship-stock stack (Vite + React + TanStack Router + Supabase auth + @thetis/ui).

## Routes

- `/` — single chat interface: pick or save settings (post type, platforms, instructions), then prompt to check a draft or generate a post.

Both call the `knowledge-chat` Edge Function in `services/thetis/supabase`, which retrieves from the `knowledge_chunks` pgvector table populated by `packages/knowledge-corpus`.

## Setup

1. Copy `.env.example` to `.env` with the thetis Supabase project URL + anon key
2. `pnpm dev` (port 2123)

Requires the knowledge base migration applied and `bun run sync` executed in `packages/knowledge-corpus`. The Edge Functions need `OPENAI_API_KEY` set as a Supabase secret (used for embeddings and chat). Optional: set `TAVILY_API_KEY` on the Edge Function to enable web search alongside the knowledge base.

## Phase 4 (later)

Patient-facing mode: add a `patient` prompt config in the Edge Function (no diagnosis, canonical-only retrieval, warning-sign escalation) and a public route or embeddable widget.
