import React from "react";
import { usePriceItems } from "../hooks/usePriceItems";
import { useFormContext } from "react-hook-form";
import { formatCurrency } from "../../../../../constants/currencies";

const PriceSummary = () => {
    const form = useFormContext();
    const { grandTotal } = usePriceItems();
    return (
        <div className="text-right">
            <p>
                Carriage: {formatCurrency(
                    form.watch("carriage"),
                    form.watch("currency"),
                )}
            </p>
            <b>
                Total: {formatCurrency(
                    Number(grandTotal()) +
                        Number(form.watch("carriage")),
                    form.watch("currency"),
                )}
            </b>
        </div>
    );
};

export default PriceSummary;
