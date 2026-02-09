import { Button } from "@thetis/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface OrderFormNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  isLoading?: boolean;
}

export function OrderFormNavigation({
  onPrevious,
  onNext,
  nextLabel = "Save & Continue",
  previousLabel = "Back",
  isLoading = false,
}: OrderFormNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
      <div>
        {onPrevious && (
          <Button
            type="button"
            variant="ghost"
            onClick={onPrevious}
            size="sm"
            className="gap-2 text-muted-foreground"
            disabled={isLoading}
          >
            <ArrowLeft size={16} />
            {previousLabel}
          </Button>
        )}
      </div>
      <div>
        {onNext && (
          <Button
            type="button"
            onClick={onNext}
            size="sm"
            disabled={isLoading}
            className="gap-2"
          >
            {nextLabel}
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
