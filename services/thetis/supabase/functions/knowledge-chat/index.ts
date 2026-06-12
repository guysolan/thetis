import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  callOpenAI,
  type ChatImage,
  corsHeaders,
  errorResponse,
  fetchRules,
  jsonResponse,
  type MatchedChunk,
  requireUser,
  searchKnowledge,
  serviceClient,
} from "../_shared/knowledge.ts";
import {
  assistSystemPrompt,
  assistUserPrompt,
  checkSystemPrompt,
  checkUserPrompt,
  formatSources,
  generateSystemPrompt,
  generateUserPrompt,
} from "./prompts.ts";

type Mode = "assist" | "check" | "generate";

interface ChatRequest {
  mode?: Mode;
  input: string;
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

const MATCH_COUNT = 15;

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
) {
  const reviewChunks = await searchKnowledge(supabase, post, MATCH_COUNT, {
    canonical: true,
  });
  const reviewRaw = await callOpenAI(
    checkSystemPrompt(rules, customInstructions),
    checkUserPrompt(post, formatSources(reviewChunks), images.length),
    4096,
    images,
  );
  return parseModelJson(reviewRaw);
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

    const mode = body.mode ?? "assist";
    if (mode !== "assist" && mode !== "check" && mode !== "generate") {
      return errorResponse('mode must be "assist", "check", or "generate"');
    }
    if (mode === "generate" && !body.platform) {
      return errorResponse("platform is required for generate mode");
    }

    const supabase = serviceClient();
    const rules = await fetchRules(supabase);
    const customInstructions = await resolveCustomInstructions(supabase, body);
    const images = validateImages(body.images);

    const chunks = await searchKnowledge(supabase, body.input, MATCH_COUNT, {
      condition: body.condition,
      canonical: true,
    });
    const sources = formatSources(chunks);

    let system: string;
    let user: string;
    if (mode === "check") {
      system = checkSystemPrompt(rules, customInstructions);
      user = checkUserPrompt(body.input, sources, images.length);
    } else if (mode === "generate") {
      system = generateSystemPrompt(rules, customInstructions);
      user = generateUserPrompt(
        body.input,
        body.platform!,
        sources,
        body.post_type,
        images.length,
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
      );
    }

    const raw = await callOpenAI(system, user, 4096, images);
    const result = parseModelJson(raw);

    const isGenerate = mode === "generate" ||
      (mode === "assist" && result.task === "generate");
    const postText = typeof result.post === "string" ? result.post : null;

    if (isGenerate && postText) {
      result.review = await autoFactCheck(
        supabase,
        postText,
        rules,
        customInstructions,
        images,
      );
    }

    return jsonResponse({ result, retrieved_sources: sourceList(chunks) });
  } catch (err) {
    console.error("knowledge-chat error:", err);
    return errorResponse(
      err instanceof Error ? err.message : "Internal error",
      500,
    );
  }
});
