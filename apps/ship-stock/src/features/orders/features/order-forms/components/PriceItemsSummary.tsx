import { useFormContext } from "react-hook-form";
import PriceSummary from "./PriceSummary";
import { useOrderItems } from "../hooks/useOrderItems";
import { useSelectItemsView } from "../../../../items/api/selectItemsView";
import { Currency } from "../../../../../components/Currency";
import NumberFlow from "@number-flow/react";

interface PriceItemsSummaryProps {
  showPrice?: boolean;
}

const PriceItemsSummary = ({ showPrice = false }: PriceItemsSummaryProps) => {
  const form = useFormContext();
  const currency = form.watch("currency");
  const { data: itemsView } = useSelectItemsView();
  const orderItems = useOrderItems();

  return (
    <div className="space-y-2">
      {orderItems.map((item, index) => (
        <div key={item.item_id} className="flex justify-between items-center">
          <span>
            {
              itemsView?.find((i) => String(i.item_id) === String(item.item_id))
                ?.item_name
            }
            {" x "}
            {Math.abs(item.quantity_change)}
          </span>
          {showPrice && (
            <span className="font-medium">
              <NumberFlow
                value={item.total}
                format={{ style: "currency", currency: currency }}
              />
            </span>
          )}
        </div>
      ))}
      {showPrice && orderItems.length > 0 && (
        <div className="flex justify-between items-start pt-2 border-t">
          <b>Total</b>
          <PriceSummary />
        </div>
      )}
    </div>
  );
};

export default PriceItemsSummary;
