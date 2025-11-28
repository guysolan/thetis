import { Button } from "@thetis/ui/button";

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
    nextLabel = "Next",
    previousLabel = "Previous",
    isLoading = false,
}: OrderFormNavigationProps) {
    return (
        <div className="flex sm:flex-row flex-col justify-end gap-4 pt-4 border-t">
            {onPrevious && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={onPrevious}
                    size="lg"
                    className="w-full sm:w-auto sm:max-w-[300px]"
                    disabled={isLoading}
                >
                    {previousLabel}
                </Button>
            )}
            {onNext && (
                <Button
                    type="button"
                    onClick={onNext}
                    size="lg"
                    className="w-full sm:w-auto sm:max-w-[300px]"
                    disabled={isLoading}
                >
                    {nextLabel}
                </Button>
            )}
        </div>
    );
}
