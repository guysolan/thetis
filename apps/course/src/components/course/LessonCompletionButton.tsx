import { Button } from "@thetis/ui/button";
import { CheckCircle2 } from "lucide-react";

interface LessonCompletionButtonProps {
    isComplete: boolean;
    onToggle: () => void;
    size?: "sm" | "default" | "lg" | "icon";
}

export function LessonCompletionButton({
    isComplete,
    onToggle,
    size = "sm",
}: LessonCompletionButtonProps) {
    return (
        <Button
            variant="secondary"
            size={size}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
            }}
        >
            {isComplete
                ? (
                    <>
                        <CheckCircle2 className="mr-1 w-4 h-4" />
                        Unmark as Done
                    </>
                )
                : (
                    "Mark as Done"
                )}
        </Button>
    );
}
