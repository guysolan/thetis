import React from "react";
import { Button } from "@/components/ui/button";
import { useStockValidation } from "../hooks/useStockValidation";
import { useFormContext } from "react-hook-form";

const OrderFormButton = () => {
    const { formState } = useFormContext();
    const { hasNegativeStock } = useStockValidation();

    return (
        <Button
            onClick={() => console.log(formState.errors)}
            disabled={hasNegativeStock}
            type="submit"
        >
            Create Order
        </Button>
    );
};

export default OrderFormButton;
