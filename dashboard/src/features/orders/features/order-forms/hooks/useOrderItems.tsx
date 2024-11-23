import { useFormContext } from "react-hook-form";
import { FormOrderItem, PackageOrderItems } from '../features/sell-form/sellFormSchema';
import { OrderItem, OrderItemChange } from "../schema";

type OrderItemWithTotal = OrderItem & { total: number }
export const useOrderItems = (): OrderItemWithTotal[] => {
    const form = useFormContext();

    const mode = form.watch('mode')


    const orderItems = form.watch("order_items").map((oi) => ({ ...oi, total: oi.quantity_change * oi.item_price * (1 + oi.item_tax) }));

    return extractOrderItems(orderItems, mode)
};

export function extractOrderItems(orderItems: FormOrderItem[], mode: 'package' | 'direct'): OrderItemWithTotal[] {
    if (mode === 'package') {
        const packageOrder = orderItems as PackageOrderItems[];
        return packageOrder?.flatMap((pkg: PackageOrderItems) =>
            pkg?.package_items?.map((pkg_i) => ({ ...pkg_i, quantity_change: pkg_i.item_quantity * pkg.package_quantity, total: pkg_i.item_quantity * pkg.package_quantity * pkg_i.item_price })) ?? []
        );
    } else {
        return orderItems.map((oi) => ({ ...oi, quantity_change: oi.item_quantity, total: oi.item_quantity * oi.item_price * (1 + oi.item_tax) }));
    }
}
