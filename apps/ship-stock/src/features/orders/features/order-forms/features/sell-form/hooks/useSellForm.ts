import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

export const useSellForm = () => {
    const { watch, setValue } = useFormContext();
    const mode = watch("mode");

    const previousModeRef = useRef<string | null>(null);

    useEffect(() => {
        // Only update form values when mode actually changes
        const previousMode = previousModeRef.current;
        if (mode === "package" && mode !== previousMode) {
            setValue("order_items", []);
            previousModeRef.current = mode;
        }
    }, [mode, setValue]);
};
