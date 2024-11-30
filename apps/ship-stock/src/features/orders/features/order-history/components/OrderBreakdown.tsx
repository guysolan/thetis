import type { OrderView } from "../../../types";
import FinancialTransactions from "./FinancialTransactions";
import StockMovements from "./StockMovements";

interface OrderBreakdownProps {
    order: OrderView;
}

const OrderBreakdown = ({ order }: OrderBreakdownProps) => {
    return (
        <section className="flex flex-col gap-4">
            {["purchase", "sale"].includes(order.order_type) && (
                <FinancialTransactions
                    currency={order.currency}
                    orderType={order.order_type}
                    orderItems={order.items}
                />
            )}
            <StockMovements from={order.from_shipping_address?.name} to={order.to_shipping_address?.name} orderItems={order.items} />
        </section>
    );
};

export default OrderBreakdown;
