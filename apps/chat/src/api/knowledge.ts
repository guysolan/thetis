import { supabase } from "@/lib/supabase";

export type Platform =
  | "linkedin"
  | "instagram"
  | "facebook"
  | "website";

export interface CheckIssue {
  severity: "high" | "medium" | "low";
  claim: string;
  problem: string;
  fix: string;
  sources: string[];
}

export interface CheckResult {
  verdict: "PASS" | "REVISE" | "BLOCK";
  summary: string;
  issues: CheckIssue[];
  missing_safety_info: string[];
  supporting_sources: string[];
}

export interface AssistResult {
  task?: "check" | "generate";
  verdict?: CheckResult["verdict"];
  summary?: string;
  issues?: CheckIssue[];
  missing_safety_info?: string[];
  supporting_sources?: string[];
  post?: string;
  platform?: Platform;
  sources_used?: string[];
  notes?: string;
  review?: CheckResult;
}

export interface RetrievedSource {
  source_path: string;
  content_type: string;
  similarity: number;
  title: string;
}

interface ChatResponse<T> {
  result: T;
  retrieved_sources: RetrievedSource[];
}

async function invokeChat<T>(
  body: Record<string, unknown>,
): Promise<ChatResponse<T>> {
  const { data, error } = await supabase.functions.invoke("knowledge-chat", {
    body,
  });
  if (error) {
    throw new Error(error.message ?? "Request failed");
  }
  if (data?.error) {
    throw new Error(data.error);
  }
  return data as ChatResponse<T>;
}

export interface ChatImagePayload {
  mime_type: string;
  data: string;
}

export interface AssistOptions {
  platforms?: Platform[];
  post_type?: string;
  custom_instructions?: string;
  instruction_set_id?: string;
  images?: ChatImagePayload[];
}

export function sendMessage(
  input: string,
  options: AssistOptions = {},
): Promise<ChatResponse<AssistResult>> {
  return invokeChat<AssistResult>({
    mode: "assist",
    input,
    ...options,
  });
}

export function isCheckResult(result: AssistResult): boolean {
  return result.task === "check" || !!result.verdict;
}

export function isGenerateResult(result: AssistResult): boolean {
  return result.task === "generate" || !!result.post;
}

export function toCheckResult(result: AssistResult): CheckResult {
  return {
    verdict: result.verdict ?? "REVISE",
    summary: result.summary ?? "",
    issues: result.issues ?? [],
    missing_safety_info: result.missing_safety_info ?? [],
    supporting_sources: result.supporting_sources ?? [],
  };
}
