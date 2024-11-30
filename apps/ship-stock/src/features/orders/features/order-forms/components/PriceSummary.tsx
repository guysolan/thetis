import React from "react";
import { useFormContext } from "react-hook-form";
import { useOrderItemsTotal } from '../hooks/useOrderItemsTotal';
import NumberFlow from '@number-flow/react';
import { defaultCurrency } from '../../../../../constants/currencies';

const PriceSummary = () => {
    const form = useFormContext();
    const total = useOrderItemsTotal();
    return (
        <div className="text-right">
            <p>
                Carriage:
                <NumberFlow
                    value={form.watch("carriage") ?? 0}
                    format={{ style: "currency", currency: form.watch("currency") ?? defaultCurrency }}
                />
            </p>
            <b>
                Total:
                <NumberFlow
                    value={total + Number(form.watch("carriage"))}
                    format={{ style: "currency", currency: form.watch("currency") ?? defaultCurrency }}
                />
            </b>
        </div>
    );
};

export default PriceSummary;
