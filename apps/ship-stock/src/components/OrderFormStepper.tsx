import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@thetis/ui/button";

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

export const stageBorderColors = (stage: StageT) => {
    return cn(
        stage === "current" && "border-neutral-900 dark:border-neutral-100",
        stage === "future" && "border-neutral-300 dark:border-neutral-700",
        stage === "past" && "border-neutral-600 dark:border-neutral-400",
    );
};

export const stageTextColors = (stage: StageT) => {
    return cn(
        stage === "current" && "text-neutral-900 dark:text-neutral-100",
        stage === "future" && "text-neutral-300 dark:text-neutral-700",
        stage === "past" && "text-neutral-600 dark:text-neutral-400",
    );
};

export function OrderFormStepper({
    steps,
    currentStep,
    onStepClick,
}: OrderFormStepperProps) {
    const currentIndex = steps.findIndex((s) => s.number === currentStep);

    return (
        <ul
            className={cn(
                "flex-col flex-wrap justify-start items-start mx-auto my-4 md:px-0 w-full",
                steps?.length > 1 ? "flex" : "hidden",
            )}
        >
            {steps.map((step, index) => {
                const isCompleted = index < currentIndex;
                const isCurrent = index === currentIndex;
                const isUpcoming = index > currentIndex;

                const stage: StageT = isCompleted
                    ? "past"
                    : isCurrent
                    ? "current"
                    : "future";

                return (
                    <li className="flex flex-col w-full" key={step.key}>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-nowrap justify-center items-center mb-2 text-md">
                                <div className="flex justify-center items-center gap-x-2 h-full">
                                    <span
                                        className={cn(
                                            stageBorderColors(stage),
                                            stageTextColors(stage),
                                            "text-md flex h-7 w-7 flex-nowrap items-center justify-center rounded-full border-2",
                                        )}
                                    >
                                        {stage === "future" && `${step.number}`}
                                        {stage === "current" &&
                                            `${step.number}`}
                                        {stage === "past" && (
                                            <Check strokeWidth={3} size={16} />
                                        )}
                                    </span>
                                    <p
                                        className={cn(
                                            "text-wrap",
                                            stageTextColors(stage),
                                        )}
                                    >
                                        {step.label}
                                    </p>
                                </div>
                            </div>
                            {onStepClick && (
                                <Button
                                    disabled={stage === "future"}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onStepClick(step.number)}
                                    className={cn(
                                        stage === "current"
                                            ? "pointer-events-none"
                                            : "",
                                    )}
                                >
                                    {stage === "current" ? "Current" : "Change"}
                                </Button>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
