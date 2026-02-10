import type { OrderView } from "../../../types";
import Financials from "../../order-documents/components/Financials";
import ItemsManifest from "../../order-documents/components/ItemsManifest";
import PackageSummary from "../../order-documents/components/PackageSummary";
import { prepareOrderItems } from "../../order-documents/utils/utils";
import type { Currency } from "../../../../../constants/currencies";

interface OrderBreakdownProps {
  order: OrderView;
}

const OrderBreakdown = ({ order }: OrderBreakdownProps) => {
  const showFinancials = ["build", "buy", "sell"].includes(order.order_type);
  const showStockMovements = !["count"].includes(order.order_type);

  // Use prepareOrderItems for manifest (filters to relevant quantities)
  const preparedItems = prepareOrderItems(order);

  return (
    <section className="flex flex-col gap-6">
      {showFinancials && (
        <Financials
          order={order}
          currency={order.currency as Currency}
        />
      )}

      {showStockMovements && <ItemsManifest orderItems={preparedItems} />}

      <PackageSummary items={order.items} />
    </section>
  );
};

export default OrderBreakdown;
