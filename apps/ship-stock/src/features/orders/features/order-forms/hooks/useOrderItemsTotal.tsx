import { useOrderItems } from './useOrderItems';

export const useOrderItemsTotal = (): number => {
    const orderItems = useOrderItems();
    let total = 0;

    orderItems.forEach((oi) => {
        total += oi.total;
    })

    return total
};
