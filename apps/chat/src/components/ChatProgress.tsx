import { cn } from "@/lib/utils";
import { Check, Circle, Loader2, Minus } from "lucide-react";
import type { ChatStepId, ProgressUpdate, StepStatus } from "@/api/knowledge";

const STEPS: { id: ChatStepId; label: string }[] = [
  { id: "loading", label: "Guidelines" },
  { id: "knowledge", label: "Knowledge base" },
  { id: "web", label: "Web search" },
  { id: "draft", label: "Draft" },
  { id: "check", label: "Fact-check" },
  { id: "revise", label: "Revision" },
];

function stepStatus(
  stepId: ChatStepId,
  updates: ProgressUpdate[],
): StepStatus {
  const update = updates.find((u) => u.step === stepId);
  if (!update) return "pending";
  if (update.status === "skipped") return "skipped";
  if (update.status === "done") return "done";
  return "active";
}

function stepMessage(stepId: ChatStepId, updates: ProgressUpdate[]): string {
  return updates.find((u) => u.step === stepId)?.message ?? "";
}

function StepIcon({ status }: { status: StepStatus }) {
  if (status === "active") {
    return <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />;
  }
  if (status === "done") {
    return <Check className="w-3.5 h-3.5 text-primary" />;
  }
  if (status === "skipped") {
    return <Minus className="w-3.5 h-3.5 text-muted-foreground/60" />;
  }
  return <Circle className="w-3.5 h-3.5 text-muted-foreground/40" />;
}

interface Props {
  updates: ProgressUpdate[];
}

export function ChatProgress({ updates }: Props) {
  return (
    <ul className="space-y-2">
      {STEPS.map(({ id, label }) => {
        let status = stepStatus(id, updates);
        if (updates.length === 0 && id === "loading") status = "active";

        const message = stepMessage(id, updates);
        const isActive = status === "active";

        return (
          <li
            key={id}
            className={cn(
              "flex items-start gap-2.5 text-sm transition-opacity",
              status === "pending" && "opacity-40",
              status === "skipped" && "opacity-60",
            )}
          >
            <span className="mt-0.5 shrink-0">
              <StepIcon status={status} />
            </span>
            <div className="min-w-0">
              <p
                className={cn(
                  "font-medium leading-none",
                  isActive && "text-foreground",
                  status === "done" && "text-foreground/80",
                  status === "skipped" && "text-muted-foreground",
                )}
              >
                {label}
              </p>
              {message && (
                <p className="mt-1 text-muted-foreground text-xs leading-snug">
                  {message}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
