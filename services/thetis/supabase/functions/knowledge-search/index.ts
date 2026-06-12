import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  corsHeaders,
  errorResponse,
  jsonResponse,
  requireUser,
  searchKnowledge,
  serviceClient,
} from "../_shared/knowledge.ts";

interface SearchRequest {
  query: string;
  match_count?: number;
  condition?: string;
  content_types?: string[];
  canonical?: boolean;
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
    const body = (await req.json()) as SearchRequest;
    if (!body.query?.trim()) {
      return errorResponse("query is required");
    }

    const chunks = await searchKnowledge(
      serviceClient(),
      body.query,
      Math.min(body.match_count ?? 12, 50),
      {
        condition: body.condition,
        content_types: body.content_types,
        canonical: body.canonical,
      },
    );

    return jsonResponse({ chunks });
  } catch (err) {
    console.error("knowledge-search error:", err);
    return errorResponse(
      err instanceof Error ? err.message : "Internal error",
      500,
    );
  }
});
