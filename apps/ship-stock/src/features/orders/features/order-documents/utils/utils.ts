import { OrderView } from "../../../types";

export const prepareOrderItems = (order: OrderView) => {
    const noPackages = order.items.filter((item) =>
        item.item_type !== "package"
    );
    const noNegatives = noPackages.filter((item) => item.quantity > 0);
    if (order.order_type === "sale") {
        return noPackages.map((item) => ({
            ...item,
            quantity: Math.abs(item.quantity),
        }));
    }
    if (order.order_type === "purchase") {
        return noNegatives;
    }
    return noPackages;
};
