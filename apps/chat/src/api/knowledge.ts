import { supabase } from "@/lib/supabase";
import { normalizeResult, postText } from "@/lib/post-text";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export type Platform =
  | "linkedin"
  | "instagram"
  | "facebook"
  | "website";

export type ChatStepId =
  | "loading"
  | "knowledge"
  | "web"
  | "draft"
  | "check"
  | "revise";

export type StepStatus = "pending" | "active" | "done" | "skipped";

export interface ProgressUpdate {
  step: ChatStepId;
  message: string;
  status: "active" | "done" | "skipped";
}

export interface AssistResult {
  task?: "check" | "generate";
  post?: string;
  platform?: Platform;
  sources_used?: string[];
  notes?: string;
  caveat?: string;
  revised?: boolean;
}

export interface RetrievedSource {
  source_path: string;
  content_type: string;
  similarity: number;
  title: string;
}

export interface WebSource {
  title: string;
  url: string;
}

export interface ChatResponse {
  result: AssistResult;
  retrieved_sources: RetrievedSource[];
  web_sources?: WebSource[];
}

export interface ChatImagePayload {
  mime_type: string;
  data: string;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface AssistOptions {
  platforms?: Platform[];
  post_type?: string;
  custom_instructions?: string;
  instruction_set_id?: string;
  images?: ChatImagePayload[];
  history?: ChatTurn[];
  onProgress?: (update: ProgressUpdate) => void;
}

async function readNdjsonStream(
  res: Response,
  onProgress?: (update: ProgressUpdate) => void,
): Promise<ChatResponse> {
  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";
  let result: ChatResponse | undefined;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.trim()) continue;
      const event = JSON.parse(line) as Record<string, unknown>;
      if (event.type === "progress") {
        onProgress?.({
          step: event.step as ChatStepId,
          message: String(event.message ?? ""),
          status: (event.status as ProgressUpdate["status"]) ?? "active",
        });
      } else if (event.type === "result") {
        const raw = event.result as AssistResult;
        result = {
          result: normalizeResult(raw),
          retrieved_sources: (event.retrieved_sources as RetrievedSource[]) ??
            [],
          web_sources: event.web_sources as WebSource[] | undefined,
        };
      } else if (event.type === "error") {
        throw new Error(String(event.message ?? "Request failed"));
      }
    }
  }

  if (!result) throw new Error("No result received");
  return result;
}

export async function sendMessage(
  input: string,
  options: AssistOptions = {},
): Promise<ChatResponse> {
  const { onProgress, ...payload } = options;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("Not signed in");

  const res = await fetch(`${supabaseUrl}/functions/v1/knowledge-chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: supabaseAnonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mode: "assist",
      stream: true,
      input,
      ...payload,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const json = JSON.parse(text) as { error?: string };
      throw new Error(json.error ?? text);
    } catch {
      throw new Error(text || `Request failed (${res.status})`);
    }
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("ndjson")) {
    return readNdjsonStream(res, onProgress);
  }

  const data = await res.json() as ChatResponse & { error?: string };
  if (data.error) throw new Error(data.error);
  return { ...data, result: normalizeResult(data.result) };
}

export function hasPost(result: AssistResult): boolean {
  return !!postText(result.post);
}
