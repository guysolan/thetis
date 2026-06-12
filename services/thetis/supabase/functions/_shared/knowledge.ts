import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js@2";

export const EMBEDDING_MODEL = "text-embedding-3-small";
export const EMBEDDING_DIMENSIONS = 1536;

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, apikey, x-client-info",
};

export function serviceClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

export async function embedQuery(text: string): Promise<number[]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text.slice(0, 8000),
      dimensions: EMBEDDING_DIMENSIONS,
    }),
  });
  if (!res.ok) {
    throw new Error(
      `OpenAI embeddings failed: ${res.status} ${await res.text()}`,
    );
  }
  const json = await res.json();
  return json.data[0].embedding;
}

export interface MatchedChunk {
  id: string;
  content: string;
  source_path: string;
  content_type: string;
  condition: string;
  canonical: boolean;
  metadata: Record<string, unknown>;
  similarity: number;
}

export interface SearchFilters {
  condition?: string;
  content_types?: string[];
  canonical?: boolean;
}

export async function searchKnowledge(
  supabase: SupabaseClient,
  query: string,
  matchCount = 12,
  filters: SearchFilters = {},
): Promise<MatchedChunk[]> {
  const embedding = await embedQuery(query);
  const { data, error } = await supabase.rpc("match_knowledge_chunks", {
    query_embedding: embedding,
    match_count: matchCount,
    filter_condition: filters.condition ?? null,
    filter_content_types: filters.content_types ?? null,
    filter_canonical: filters.canonical ?? null,
  });
  if (error) throw new Error(`match_knowledge_chunks failed: ${error.message}`);
  return data as MatchedChunk[];
}

/** Governance rules (clinical positions, content guidelines) — always injected. */
export async function fetchRules(
  supabase: SupabaseClient,
): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from("knowledge_chunks")
    .select("content, metadata")
    .eq("content_type", "rule");
  if (error) throw new Error(`Failed to fetch rules: ${error.message}`);
  const rules: Record<string, string> = {};
  for (const row of data ?? []) {
    const title = (row.metadata as { title?: string })?.title ?? "rule";
    rules[title] = row.content;
  }
  return rules;
}

export interface ChatImage {
  mime_type: string;
  data: string;
}

export async function callOpenAI(
  system: string,
  user: string,
  maxTokens = 4096,
  images: ChatImage[] = [],
): Promise<string> {
  const userContent: Array<
    { type: "text"; text: string } | {
      type: "image_url";
      image_url: { url: string; detail: "auto" };
    }
  > = images.map((img) => ({
    type: "image_url",
    image_url: {
      url: `data:${img.mime_type};base64,${img.data}`,
      detail: "auto",
    },
  }));
  userContent.push({ type: "text", text: user });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
    },
    body: JSON.stringify({
      model: Deno.env.get("OPENAI_CHAT_MODEL") ?? "gpt-4o",
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: userContent },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`OpenAI API failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}

/** Verify the request carries a valid authenticated user (internal tool gate). */
export async function requireUser(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return errorResponse("Missing Authorization header", 401);
  }
  const anonClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );
  const { data, error } = await anonClient.auth.getUser();
  if (error || !data.user) {
    return errorResponse("Unauthorized", 401);
  }
  return null;
}

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, status);
}
