export interface WebResult {
  title: string;
  url: string;
  content: string;
}

export function webSearchEnabled(): boolean {
  return !!Deno.env.get("TAVILY_API_KEY")?.trim();
}

export async function searchWeb(query: string): Promise<WebResult[]> {
  const apiKey = Deno.env.get("TAVILY_API_KEY")?.trim();
  if (!apiKey) return [];

  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query: query.slice(0, 400),
      search_depth: "basic",
      max_results: 5,
      include_answer: false,
    }),
  });

  if (!res.ok) {
    console.warn("Tavily search failed:", res.status, await res.text());
    return [];
  }

  const json = await res.json();
  return ((json.results ?? []) as Array<
    { title?: string; url?: string; content?: string }
  >).map((r) => ({
    title: r.title ?? "Untitled",
    url: r.url ?? "",
    content: r.content ?? "",
  })).filter((r) => r.url);
}

export function formatWebSources(results: WebResult[]): string {
  if (!results.length) return "";
  return results
    .map(
      (r, i) => `[WEB ${i + 1}] ${r.title} (${r.url})\n${r.content}`,
    )
    .join("\n\n---\n\n");
}

export function webSourceList(results: WebResult[]) {
  return results.map((r) => ({
    title: r.title,
    url: r.url,
  }));
}
