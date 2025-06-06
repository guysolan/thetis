import { OrderView } from "../../../types";

export const prepareOrderItems = (order: OrderView) => {
    const noPackagesOrServices = order.items?.filter((item) =>
        item.item_type !== "package" && item.item_type !== "service"
    );

    if (order.order_type === "sale") {
        return noPackagesOrServices?.map((item) => ({
            ...item,
            quantity: Math.abs(item.quantity),
        }));
    }
    if (order.order_type === "purchase") {
        return noPackagesOrServices?.filter((item) => item.quantity > 0);
    }
    return noPackagesOrServices;
};
