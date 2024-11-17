import React from "react";
import { Button } from "@/components/ui/button";
import { useStockValidation } from "../hooks/useStockValidation";

const OrderFormButton = ({ onClick }: { onClick: () => void }) => {
    const { hasNegativeStock } = useStockValidation();

    return (
        <Button
            disabled={hasNegativeStock}
            type="button"
            onClick={onClick}
        >
            Submit
        </Button>
    );
};

export default OrderFormButton;
