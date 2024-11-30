import React from "react";
import { Button } from "@thetis/ui/button";
import {
    StockValidationConfig,
    useStockValidation,
} from "../hooks/useStockValidation";

const OrderFormButton = ({
    onClick,
    config,
}: {
    onClick: () => Promise<void> | void; // Updated type to allow both async and sync functions
    config?: StockValidationConfig;
}) => {
    const { hasNegativeStock } = useStockValidation(config);

    return (
        <Button
            disabled={hasNegativeStock}
            type="button" // Changed to "submit" if this is meant to submit a form
            onClick={onClick}
        >
            Save
        </Button>
    );
};

export default OrderFormButton;
