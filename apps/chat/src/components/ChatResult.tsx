import { Button } from "@thetis/ui/button";
import { Textarea } from "@thetis/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import {
  type AssistResult,
  isCheckResult,
  isGenerateResult,
  toCheckResult,
} from "@/api/knowledge";
import { ReviewResult } from "@/components/ReviewResult";
import type { RetrievedSource } from "@/api/knowledge";

interface Props {
  result: AssistResult;
  sources?: RetrievedSource[];
}

export function ChatResult({ result, sources = [] }: Props) {
  if (isGenerateResult(result) && result.post) {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center gap-2">
          <p className="font-medium text-sm">
            Generated {result.platform ?? "social"} post · {result.post.length}
            {" "}
            chars
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(result.post!);
              toast.success("Copied to clipboard");
            }}
          >
            <Copy className="mr-1 w-3.5 h-3.5" />
            Copy
          </Button>
        </div>
        <Textarea readOnly className="max-h-96 font-sans" value={result.post} />
        {result.notes && (
          <p className="text-muted-foreground text-sm">
            <span className="font-medium text-foreground">Notes:</span>{" "}
            {result.notes}
          </p>
        )}
        {result.sources_used && result.sources_used.length > 0 && (
          <p className="font-mono text-muted-foreground text-xs">
            Based on: {result.sources_used.join(", ")}
          </p>
        )}
        {result.review && (
          <div className="pt-2 border-border border-t">
            <p className="mb-2 font-medium text-sm">Automatic fact-check</p>
            <ReviewResult result={result.review} />
          </div>
        )}
      </div>
    );
  }

  if (isCheckResult(result)) {
    return (
      <div className="space-y-3">
        <ReviewResult result={toCheckResult(result)} />
        {sources.length > 0 && (
          <details className="text-muted-foreground text-sm">
            <summary className="cursor-pointer">
              Retrieved {sources.length} knowledge base sources
            </summary>
            <ul className="space-y-1 mt-2 ml-4">
              {sources.map((s) => (
                <li key={s.source_path + s.title} className="font-mono text-xs">
                  {s.source_path} ({s.content_type}, {s.similarity})
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    );
  }

  return (
    <p className="text-muted-foreground text-sm">
      Response received but could not be displayed.
    </p>
  );
}
