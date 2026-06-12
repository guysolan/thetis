import { Badge } from "@thetis/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { cn } from "@thetis/ui/cn";
import { AlertTriangle, CheckCircle2, FileText, XCircle } from "lucide-react";
import type { CheckResult } from "@/api/knowledge";

const VERDICT_CONFIG: Record<
  CheckResult["verdict"],
  { variant: "default" | "warning" | "destructive"; Icon: typeof CheckCircle2 }
> = {
  PASS: { variant: "default", Icon: CheckCircle2 },
  REVISE: { variant: "warning", Icon: AlertTriangle },
  BLOCK: { variant: "destructive", Icon: XCircle },
};

const SEVERITY_STYLES: Record<string, string> = {
  high: "border-destructive/50 bg-destructive/5",
  medium: "border-amber-500/50 bg-amber-500/5",
  low: "border-border bg-muted/30",
};

export function ReviewResult({ result }: { result: CheckResult }) {
  const config = VERDICT_CONFIG[result.verdict] ?? VERDICT_CONFIG.REVISE;
  const { Icon, variant } = config;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge variant={variant} className="px-3 py-1 text-sm">
          <Icon className="mr-1.5 w-4 h-4" />
          {result.verdict}
        </Badge>
        <p className="text-muted-foreground text-sm">{result.summary}</p>
      </div>

      {result.issues?.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Issues ({result.issues.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.issues.map((issue, i) => (
              <div
                key={i}
                className={cn(
                  "space-y-1.5 p-3 border rounded-md text-sm",
                  SEVERITY_STYLES[issue.severity],
                )}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {issue.severity}
                  </Badge>
                  <span className="font-medium">"{issue.claim}"</span>
                </div>
                <p className="text-foreground/80">{issue.problem}</p>
                {issue.fix && (
                  <p>
                    <span className="font-medium">Fix:</span> {issue.fix}
                  </p>
                )}
                {issue.sources?.length > 0 && (
                  <p className="text-muted-foreground text-xs">
                    Sources: {issue.sources.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {result.missing_safety_info?.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Missing safety information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm list-disc list-inside">
              {result.missing_safety_info.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {result.supporting_sources?.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Supporting sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {result.supporting_sources.map((src, i) => (
                <li
                  key={i}
                  className="flex items-center gap-1.5 font-mono text-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  {src}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
