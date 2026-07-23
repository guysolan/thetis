import { Button } from "@thetis/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { type AssistResult } from "@/api/knowledge";
import type { RetrievedSource, WebSource } from "@/api/knowledge";
import { postText } from "@/lib/post-text";

interface Props {
  result: AssistResult;
  sources?: RetrievedSource[];
  webSources?: WebSource[];
}

export function ChatResult({ result, sources = [], webSources = [] }: Props) {
  const post = postText(result.post);
  if (!post) {
    return (
      <p className="text-muted-foreground text-sm">
        Response received but could not be displayed.
      </p>
    );
  }

  return (
    <div className="space-y-3 w-full">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-muted-foreground"
          onClick={() => {
            navigator.clipboard.writeText(post);
            toast.success("Copied");
          }}
        >
          <Copy className="mr-1 w-3.5 h-3.5" />
          Copy
        </Button>
      </div>

      <div className="text-sm leading-relaxed whitespace-pre-wrap">
        {post}
      </div>

      {result.caveat && (
        <p className="pl-3 border-border border-l-2 text-muted-foreground text-sm leading-relaxed">
          {result.caveat}
        </p>
      )}

      {!result.caveat && result.task === "check" && !result.revised && (
        <p className="text-muted-foreground text-sm">No changes suggested.</p>
      )}

      {result.notes && (
        <p className="text-muted-foreground text-sm">{result.notes}</p>
      )}

      {(result.sources_used?.length ?? 0) > 0 && (
        <p className="text-muted-foreground text-xs">
          Sources: {result.sources_used!.join(", ")}
        </p>
      )}

      {sources.length > 0 && (
        <details className="text-muted-foreground text-xs">
          <summary className="hover:text-foreground cursor-pointer">
            {sources.length} knowledge sources
          </summary>
          <ul className="space-y-0.5 mt-1.5 ml-3">
            {sources.map((s) => (
              <li key={s.source_path + s.title} className="font-mono">
                {s.source_path}
              </li>
            ))}
          </ul>
        </details>
      )}

      {webSources.length > 0 && (
        <details className="text-muted-foreground text-xs">
          <summary className="hover:text-foreground cursor-pointer">
            {webSources.length} web sources
          </summary>
          <ul className="space-y-1 mt-1.5 ml-3">
            {webSources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline underline-offset-2"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
