import React from "react";
import { usePriceItems } from "../hooks/usePriceItems";
import { useFormContext } from "react-hook-form";
import { Currency } from '../../../../../components/Currency';
import { useOrderItemsTotal } from '../hooks/useOrderItemsTotal';

const PriceSummary = () => {
    const form = useFormContext();
    const total = useOrderItemsTotal();
    return (
        <div className="text-right">
            <p>
                Carriage: <Currency
                    amount={form.watch("carriage")}
                    currency={form.watch("currency")}
                />
            </p>
            <b>
                Total: <Currency
                    amount={total + Number(form.watch("carriage"))}
                    currency={form.watch("currency")}
                />
            </b>
        </div>
    );
};

export default PriceSummary;
