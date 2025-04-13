import { OrderView } from "../../../types";

export const prepareOrderItems = (order: OrderView, noNegatives = false) => {
    const noPackagesOrServices = order.items.filter((item) =>
        item.item_type !== "package" && item.item_type !== "service"
    );

    if (noNegatives) {
        return noPackagesOrServices.filter((item) => item.quantity > 0);
    }

    if (order.order_type === "sale") {
        return noPackagesOrServices.map((item) => ({
            ...item,
            quantity: Math.abs(item.quantity),
        }));
    }
    if (order.order_type === "purchase") {
        return noNegatives;
    }
    return noPackagesOrServices;
};
