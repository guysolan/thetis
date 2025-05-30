import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const useSellForm = () => {
    const { watch, setValue } = useFormContext();
    const mode = watch("mode");

    useEffect(() => {
        // Only update form values when mode changes
        if (mode === "package") {
            setValue("order_items", []);
        }
    }, [mode, setValue]);
};
