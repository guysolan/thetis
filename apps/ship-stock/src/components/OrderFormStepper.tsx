import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  number: number;
  label: string;
  key: string;
}

interface OrderFormStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepNumber: number) => void;
}

export type StageT = "future" | "current" | "past";

export function OrderFormStepper({
  steps,
  currentStep,
  onStepClick,
}: OrderFormStepperProps) {
  const currentIndex = steps.findIndex((s) => s.number === currentStep);

  return (
    <nav aria-label="Order form progress">
      <ol className="flex items-center gap-1">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isFuture = index > currentIndex;
          const isClickable = isCompleted && onStepClick;

          return (
            <li key={step.key} className="flex items-center gap-1">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.number)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isCurrent &&
                    "bg-primary/10 text-primary",
                  isCompleted &&
                    "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isFuture &&
                    "text-muted-foreground/50 cursor-default",
                  isClickable && "cursor-pointer",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                    isCurrent &&
                      "bg-primary text-primary-foreground",
                    isCompleted &&
                      "bg-muted-foreground/20 text-muted-foreground",
                    isFuture &&
                      "bg-muted text-muted-foreground/50",
                  )}
                >
                  {isCompleted ? (
                    <Check strokeWidth={3} size={12} />
                  ) : (
                    step.number
                  )}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>

              {index < steps.length - 1 && (
                <ChevronRight
                  size={14}
                  className="shrink-0 text-muted-foreground/30"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
