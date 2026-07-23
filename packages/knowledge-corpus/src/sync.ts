import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import type { Chunk } from "./types.ts";
import { extractAll } from "./extract/index.ts";

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSIONS = 1536;
const EMBED_BATCH_SIZE = 100;
const UPSERT_BATCH_SIZE = 200;

function contentHash(chunk: Chunk): string {
  return createHash("sha256")
    .update(chunk.text)
    .update(JSON.stringify(chunk.metadata))
    .digest("hex");
}

function getClients() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required. " +
        "Set them in packages/knowledge-corpus/.env, or in services/thetis/.env.prod " +
        "(SUPABASE_PROJECT_ID + OPENAI_API_KEY) with Supabase CLI logged in.",
    );
  }
  if (!openaiKey) {
    throw new Error("OPENAI_API_KEY is required");
  }
  return {
    supabase: createClient(supabaseUrl, supabaseKey),
    openai: new OpenAI({ apiKey: openaiKey }),
  };
}

export async function sync(): Promise<void> {
  const { supabase, openai } = getClients();

  console.log("Extracting chunks from monorepo...");
  const chunks = extractAll();
  console.log(`  ${chunks.length} chunks extracted`);

  const hashes = new Map(chunks.map((c) => [c.id, contentHash(c)]));

  console.log("Fetching existing chunk hashes...");
  const existing = new Map<string, string>();
  const PAGE = 1000;
  for (let from = 0;; from += PAGE) {
    const { data, error } = await supabase
      .from("knowledge_chunks")
      .select("id, content_hash")
      .range(from, from + PAGE - 1);
    if (error) {
      throw new Error(`Failed to fetch existing chunks: ${error.message}`);
    }
    for (const row of data ?? []) existing.set(row.id, row.content_hash);
    if (!data || data.length < PAGE) break;
  }
  console.log(`  ${existing.size} chunks currently in database`);

  const toUpsert = chunks.filter((c) =>
    existing.get(c.id) !== hashes.get(c.id)
  );
  const currentIds = new Set(chunks.map((c) => c.id));
  const toDelete = [...existing.keys()].filter((id) => !currentIds.has(id));

  console.log(`  ${toUpsert.length} new/changed, ${toDelete.length} stale`);

  if (toDelete.length > 0) {
    for (let i = 0; i < toDelete.length; i += UPSERT_BATCH_SIZE) {
      const batch = toDelete.slice(i, i + UPSERT_BATCH_SIZE);
      const { error } = await supabase.from("knowledge_chunks").delete().in(
        "id",
        batch,
      );
      if (error) {
        throw new Error(`Failed to delete stale chunks: ${error.message}`);
      }
    }
    console.log(`Deleted ${toDelete.length} stale chunks`);
  }

  if (toUpsert.length === 0) {
    console.log("Nothing to embed — corpus is up to date.");
    return;
  }

  console.log(`Embedding ${toUpsert.length} chunks (${EMBEDDING_MODEL})...`);
  for (let i = 0; i < toUpsert.length; i += EMBED_BATCH_SIZE) {
    const batch = toUpsert.slice(i, i + EMBED_BATCH_SIZE);
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: batch.map((c) => c.text.slice(0, 8000)),
      dimensions: EMBEDDING_DIMENSIONS,
    });

    const rows = batch.map((chunk, j) => ({
      id: chunk.id,
      content: chunk.text,
      content_hash: hashes.get(chunk.id)!,
      embedding: response.data[j].embedding,
      source_path: chunk.metadata.source_path,
      content_type: chunk.metadata.content_type,
      condition: chunk.metadata.condition,
      canonical: chunk.metadata.canonical,
      metadata: chunk.metadata,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("knowledge_chunks").upsert(rows);
    if (error) throw new Error(`Failed to upsert chunks: ${error.message}`);
    console.log(
      `  ${Math.min(i + EMBED_BATCH_SIZE, toUpsert.length)}/${toUpsert.length}`,
    );
  }

  console.log("Sync complete.");
}
