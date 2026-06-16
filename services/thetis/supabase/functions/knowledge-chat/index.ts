import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  callOpenAI,
  type ChatImage,
  type ChatTurn,
  corsHeaders,
  errorResponse,
  fetchRules,
  jsonResponse,
  type MatchedChunk,
  ndjsonStream,
  type ProgressSender,
  requireUser,
  searchKnowledge,
  serviceClient,
} from "../_shared/knowledge.ts";
import {
  formatWebSources,
  searchWeb,
  type WebResult,
  webSearchEnabled,
  webSourceList,
} from "../_shared/web-search.ts";
import { coercePostText, normalizeAssistResult } from "../_shared/post-text.ts";
import {
  assistSystemPrompt,
  assistUserPrompt,
  checkSystemPrompt,
  checkUserPrompt,
  formatSources,
  generateSystemPrompt,
  generateUserPrompt,
  reviseSystemPrompt,
  reviseUserPrompt,
} from "./prompts.ts";

type Mode = "assist" | "check" | "generate";

interface ChatRequest {
  mode?: Mode;
  input: string;
  stream?: boolean;
  history?: ChatTurn[];
  platform?: "linkedin" | "instagram" | "facebook" | "website";
  platforms?: ("linkedin" | "instagram" | "facebook" | "website")[];
  post_type?: string;
  condition?: string;
  instruction_set_id?: string;
  custom_instructions?: string;
  images?: ChatImage[];
}

const MAX_IMAGES = 6;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MATCH_COUNT = 15;

function progress(
  send: ProgressSender | undefined,
  step: string,
  message: string,
  status: "active" | "done" | "skipped" = "active",
) {
  send?.({ type: "progress", step, message, status });
}

async function resolveCustomInstructions(
  supabase: ReturnType<typeof serviceClient>,
  body: ChatRequest,
): Promise<string | undefined> {
  if (body.custom_instructions?.trim()) {
    return body.custom_instructions.trim();
  }
  if (!body.instruction_set_id) return undefined;
  const { data, error } = await supabase
    .from("assistant_instruction_sets")
    .select("instructions")
    .eq("id", body.instruction_set_id)
    .maybeSingle();
  if (error) throw new Error(`Failed to load instructions: ${error.message}`);
  return data?.instructions?.trim() || undefined;
}

function validateImages(images?: ChatImage[]): ChatImage[] {
  if (!images?.length) return [];
  if (images.length > MAX_IMAGES) {
    throw new Error(`At most ${MAX_IMAGES} images allowed`);
  }
  for (const img of images) {
    if (!img.mime_type?.startsWith("image/") || !img.data) {
      throw new Error("Each image must have mime_type and base64 data");
    }
    const bytes = Math.ceil((img.data.length * 3) / 4);
    if (bytes > MAX_IMAGE_BYTES) {
      throw new Error("Each image must be under 4MB");
    }
  }
  return images;
}

function parseModelJson(raw: string): Record<string, unknown> {
  const cleaned = raw.replace(/^```(?:json)?\n?/m, "").replace(
    /\n?```\s*$/m,
    "",
  );
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Model did not return JSON");
  return JSON.parse(cleaned.slice(start, end + 1));
}

function sourceList(chunks: MatchedChunk[]) {
  return chunks.map((c) => ({
    source_path: c.source_path,
    content_type: c.content_type,
    similarity: Number(c.similarity.toFixed(3)),
    title: (c.metadata as { title?: string })?.title ?? "",
  }));
}

async function autoFactCheck(
  supabase: ReturnType<typeof serviceClient>,
  post: string,
  rules: Record<string, string>,
  customInstructions: string | undefined,
  images: ChatImage[],
  webResults: WebResult[],
  send?: ProgressSender,
) {
  progress(send, "check", "Checking accuracy…");
  const reviewChunks = await searchKnowledge(supabase, post, MATCH_COUNT, {
    canonical: true,
  });
  const webBlock = formatWebSources(webResults);
  const reviewRaw = await callOpenAI(
    checkSystemPrompt(rules, customInstructions),
    checkUserPrompt(
      post,
      formatSources(reviewChunks),
      images.length,
      webBlock || undefined,
    ),
    4096,
    images,
  );
  progress(send, "check", "Accuracy check complete", "done");
  return parseModelJson(reviewRaw);
}

function needsRevision(review: Record<string, unknown>): boolean {
  const verdict = review.verdict;
  return verdict === "REVISE" || verdict === "BLOCK";
}

function shouldAutoRevise(input: string, post: string): boolean {
  if (post.length > 4500) return false;
  const numberedItems = input.match(/^\s*\d+[.)]\s+/gm)?.length ?? 0;
  const lower = input.toLowerCase();
  if (
    numberedItems >= 2 && (lower.includes("hook") || lower.includes("carousel"))
  ) {
    return false;
  }
  return true;
}

async function reviseOnce(
  supabase: ReturnType<typeof serviceClient>,
  original: string,
  review: Record<string, unknown>,
  rules: Record<string, string>,
  customInstructions: string | undefined,
  images: ChatImage[],
  platform?: string,
  send?: ProgressSender,
) {
  progress(send, "revise", "Applying fixes…");
  const query = `${original}\n${review.summary ?? ""}`;
  const chunks = await searchKnowledge(supabase, query, MATCH_COUNT, {
    canonical: true,
  });
  const raw = await callOpenAI(
    reviseSystemPrompt(rules, customInstructions),
    reviseUserPrompt(original, review, formatSources(chunks), platform),
    4096,
    images,
  );
  const parsed = parseModelJson(raw);
  progress(send, "revise", "Revision complete", "done");
  return {
    post: coercePostText(parsed.post) ?? original,
    caveat: typeof parsed.caveat === "string"
      ? parsed.caveat.trim()
      : undefined,
  };
}

function stripReviewFields(result: Record<string, unknown>) {
  delete result.verdict;
  delete result.summary;
  delete result.issues;
  delete result.missing_safety_info;
  delete result.supporting_sources;
  delete result.review;
}

function draftMaxTokens(input: string, customInstructions?: string): number {
  const text = `${input}\n${customInstructions ?? ""}`.toLowerCase();
  const numberedItems = input.match(/^\s*\d+[.)]\s+/gm)?.length ?? 0;
  if (
    text.includes("carousel") ||
    text.includes("for each") ||
    text.includes("hook") && text.includes("retain") ||
    text.includes("three blocks") ||
    numberedItems >= 2
  ) {
    return 8192;
  }
  return 4096;
}

function sanitizeHistory(history?: ChatTurn[]): ChatTurn[] {
  if (!history?.length) return [];
  return history
    .filter((t) =>
      (t.role === "user" || t.role === "assistant") && t.content?.trim()
    )
    .slice(-24);
}

async function handleChat(body: ChatRequest, send?: ProgressSender) {
  const mode = body.mode ?? "assist";
  if (mode !== "assist" && mode !== "check" && mode !== "generate") {
    throw new Error('mode must be "assist", "check", or "generate"');
  }
  if (mode === "generate" && !body.platform) {
    throw new Error("platform is required for generate mode");
  }

  const supabase = serviceClient();

  progress(send, "loading", "Loading guidelines…");
  const [rules, customInstructions, images] = await Promise.all([
    fetchRules(supabase),
    resolveCustomInstructions(supabase, body),
    Promise.resolve(validateImages(body.images)),
  ]);
  progress(send, "loading", "Guidelines loaded", "done");

  progress(send, "knowledge", "Searching knowledge base…");
  if (webSearchEnabled()) {
    progress(send, "web", "Searching the web…");
  } else {
    progress(send, "web", "Web search not configured", "skipped");
  }

  const [chunks, webResults] = await Promise.all([
    searchKnowledge(supabase, body.input, MATCH_COUNT, {
      condition: body.condition,
      canonical: true,
    }),
    webSearchEnabled() ? searchWeb(body.input) : Promise.resolve([]),
  ]);

  progress(
    send,
    "knowledge",
    `Found ${chunks.length} knowledge sources`,
    "done",
  );
  if (webSearchEnabled()) {
    progress(
      send,
      "web",
      webResults.length
        ? `Found ${webResults.length} web results`
        : "No web results",
      "done",
    );
  }

  const sources = formatSources(chunks);
  const webBlock = formatWebSources(webResults);

  let system: string;
  let user: string;
  if (mode === "check") {
    system = checkSystemPrompt(rules, customInstructions);
    user = checkUserPrompt(
      body.input,
      sources,
      images.length,
      webBlock || undefined,
    );
  } else if (mode === "generate") {
    system = generateSystemPrompt(rules, customInstructions);
    user = generateUserPrompt(
      body.input,
      body.platform!,
      sources,
      body.post_type,
      images.length,
      webBlock || undefined,
    );
  } else {
    system = assistSystemPrompt(rules, customInstructions);
    user = assistUserPrompt(
      body.input,
      sources,
      body.platforms?.length
        ? body.platforms
        : body.platform
        ? [body.platform]
        : undefined,
      body.post_type,
      images.length,
      webBlock || undefined,
    );
  }

  progress(send, "draft", "Drafting response…");
  const history = sanitizeHistory(body.history);
  const raw = await callOpenAI(
    system,
    user,
    draftMaxTokens(body.input, customInstructions),
    images,
    history,
  );
  const result = parseModelJson(raw);
  progress(send, "draft", "Draft complete", "done");

  const isGenerate = mode === "generate" ||
    (mode === "assist" && result.task === "generate");
  const isCheck = mode === "check" ||
    (mode === "assist" && result.task === "check");
  const postText = coercePostText(result.post) ??
    coercePostText(result.slides) ?? null;
  const draftText = isCheck ? body.input.trim() : postText;

  if (isGenerate && postText) {
    const review = await autoFactCheck(
      supabase,
      postText,
      rules,
      customInstructions,
      images,
      webResults,
      send,
    );
    if (needsRevision(review) && shouldAutoRevise(body.input, postText)) {
      const revised = await reviseOnce(
        supabase,
        postText,
        review,
        rules,
        customInstructions,
        images,
        typeof result.platform === "string" ? result.platform : undefined,
        send,
      );
      result.post = revised.post;
      result.caveat = revised.caveat;
      result.revised = true;
    } else {
      progress(send, "revise", "No changes needed", "skipped");
    }
    stripReviewFields(result);
  } else if (isCheck && draftText) {
    const review = result.verdict ? result : await autoFactCheck(
      supabase,
      draftText,
      rules,
      customInstructions,
      images,
      webResults,
      send,
    );
    if (needsRevision(review)) {
      const revised = await reviseOnce(
        supabase,
        draftText,
        review,
        rules,
        customInstructions,
        images,
        body.platform,
        send,
      );
      result.post = revised.post;
      result.caveat = revised.caveat;
      result.revised = true;
    } else {
      result.post = draftText;
      progress(send, "revise", "No changes needed", "skipped");
    }
    result.task = "check";
    stripReviewFields(result);
  } else {
    progress(send, "check", "Skipped", "skipped");
    progress(send, "revise", "Skipped", "skipped");
  }

  normalizeAssistResult(result);

  return {
    result,
    retrieved_sources: sourceList(chunks),
    web_sources: webSourceList(webResults),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return errorResponse("Method not allowed", 405);
  }

  const unauthorized = await requireUser(req);
  if (unauthorized) return unauthorized;

  try {
    const body = (await req.json()) as ChatRequest;
    if (!body.input?.trim()) return errorResponse("input is required");

    const stream = body.stream !== false;

    if (stream) {
      return ndjsonStream(async (send) => {
        const payload = await handleChat(body, send);
        send({ type: "result", ...payload });
      });
    }

    const payload = await handleChat(body);
    return jsonResponse(payload);
  } catch (err) {
    console.error("knowledge-chat error:", err);
    return errorResponse(
      err instanceof Error ? err.message : "Internal error",
      500,
    );
  }
});
